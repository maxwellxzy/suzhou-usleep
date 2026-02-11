package database

import (
	"log"

	"usleep-server/config"
	"usleep-server/models"

	"golang.org/x/crypto/bcrypt"
)

func SeedAdmin() {
	var count int64
	DB.Model(&models.Admin{}).Count(&count)
	if count > 0 {
		log.Println("管理员账号已存在，跳过初始化")
		return
	}

	hashedPassword, err := bcrypt.GenerateFromPassword(
		[]byte(config.AppConfig.Admin.Password), bcrypt.DefaultCost,
	)
	if err != nil {
		log.Fatalf("密码加密失败: %v", err)
	}

	admin := models.Admin{
		Username: config.AppConfig.Admin.Username,
		Password: string(hashedPassword),
	}

	if err := DB.Create(&admin).Error; err != nil {
		log.Fatalf("创建管理员账号失败: %v", err)
	}

	log.Printf("管理员账号已创建: %s", admin.Username)
}
