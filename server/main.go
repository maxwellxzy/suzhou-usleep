package main

import (
	"fmt"
	"log"

	"usleep-server/config"
	"usleep-server/database"
	"usleep-server/routes"

	"github.com/gin-gonic/gin"
)

func main() {
	// 加载配置
	config.LoadConfig()

	// 初始化数据库
	database.InitDB()

	// 设置 Gin 模式
	gin.SetMode(config.AppConfig.Server.Mode)

	// 创建 Gin 引擎
	r := gin.Default()

	// 注册路由
	routes.SetupRoutes(r)

	// 启动服务
	addr := fmt.Sprintf(":%d", config.AppConfig.Server.Port)
	log.Printf("服务启动中... 监听地址 %s", addr)
	if err := r.Run(addr); err != nil {
		log.Fatalf("服务启动失败: %v", err)
	}
}
