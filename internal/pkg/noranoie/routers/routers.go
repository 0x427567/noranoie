package routers

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func GetRouters() *gin.Engine {
	router := gin.Default()

	router.GET("/", func(c *gin.Context) {
		c.String(http.StatusOK, "")
	})

	router.GET("/about", func(c *gin.Context) {
		c.String(http.StatusOK, "")
	})

	router.GET("/animal", func(c *gin.Context) {
		c.String(http.StatusOK, "")
	})

	router.GET("/animal/:id", func(c *gin.Context) {
		c.String(http.StatusOK, "")
	})

	return router
}
