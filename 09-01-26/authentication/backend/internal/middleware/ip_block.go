package middleware

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/redis/go-redis/v9"
)

func IPBlock(rdb *redis.Client) gin.HandlerFunc {
	return func(c *gin.Context) {
		ip := c.ClientIP()

		exists, _ := rdb.Exists(c, "blocked_ip:"+ip).Result()
		if exists == 1 {
			c.AbortWithStatusJSON(http.StatusForbidden, gin.H{
				"error": "Your IP is blocked",
			})
			return
		}

		c.Next()
	}
}
