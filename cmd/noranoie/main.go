package main

import (
	"context"
	"log"
	"net/http"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
	ginadapter "github.com/awslabs/aws-lambda-go-api-proxy/gin"
	"github.com/gin-gonic/gin"
)

var ginLambda *ginadapter.GinLambda

func init() {
	log.Printf("Gin cold start")

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

	ginLambda = ginadapter.New(router)
}

func handler(ctx context.Context, req events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {
	// If no name is provided in the HTTP request body, throw an error
	return ginLambda.ProxyWithContext(ctx, req)
}

func main() {
	lambda.Start(handler)
}
