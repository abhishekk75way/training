package middleware

import (
	"context"
	"encoding/json"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/redis/go-redis/v9"
)

const (
	MaxRequests = 5
	Window      = time.Minute
	BlockTTL    = 2 * time.Hour
)

func isAdmin(c *gin.Context) bool {
	role, exists := c.Get("role")
	return exists && role == "admin"
}

func RateLimit(rdb *redis.Client) gin.HandlerFunc {
	return func(c *gin.Context) {

		// ADMIN BYPASS
		if isAdmin(c) {
			c.Next()
			return
		}

		ip := c.ClientIP()

		if blocked, _ := rdb.Exists(c, "blocked_ip:"+ip).Result(); blocked == 1 {
			c.AbortWithStatusJSON(http.StatusForbidden, gin.H{
				"error": "Your IP is blocked",
			})
			return
		}

		key := "ratelimit:" + ip
		count, _ := rdb.Incr(c, key).Result()

		if count == 1 {
			rdb.Expire(c, key, Window)
		}

		if count > MaxRequests {
			blockIP(c, rdb, ip)
			c.AbortWithStatusJSON(429, gin.H{
				"error": "too many requests, try again later",
			})
			return
		}

		c.Next()
	}
}

func blockIP(ctx context.Context, rdb *redis.Client, ip string) {
	data := map[string]string{
		"reason":     "Rate limit exceeded",
		"blocked_at": time.Now().UTC().Format(time.RFC3339),
	}
	jsonData, _ := json.Marshal(data)
	rdb.Set(ctx, "blocked_ip:"+ip, jsonData, BlockTTL)
}
