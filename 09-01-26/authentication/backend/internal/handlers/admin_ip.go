package handlers

import (
	"encoding/json"
	"strings"

	"github.com/gin-gonic/gin"
	"github.com/redis/go-redis/v9"
)

func ListBlockedIPs(rdb *redis.Client) gin.HandlerFunc {
	return func(c *gin.Context) {
		keys, err := rdb.Keys(c, "blocked_ip:*").Result()
		if err != nil {
			c.JSON(500, gin.H{"error": "internal error"})
			return
		}

		var result []gin.H

		for _, key := range keys {
			val, _ := rdb.Get(c, key).Result()
			var data map[string]string
			json.Unmarshal([]byte(val), &data)

			result = append(result, gin.H{
				"ip":         strings.TrimPrefix(key, "blocked_ip:"),
				"reason":     data["reason"],
				"blocked_at": data["blocked_at"],
			})
		}

		c.JSON(200, result)
	}
}

func UnblockIP(rdb *redis.Client) gin.HandlerFunc {
	return func(c *gin.Context) {
		ip := c.Param("ip")
		rdb.Del(c, "blocked_ip:"+ip)
		c.JSON(200, gin.H{"message": "IP unblocked"})
	}
}
