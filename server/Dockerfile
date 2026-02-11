# 构建阶段
FROM golang:1.24-alpine AS builder

# 设置工作目录
WORKDIR /app

# 设置环境变量，确保构建出的二进制适用于 Linux amd64（即使是在 Mac 上构建）
ENV GOOS=linux \
    GOARCH=amd64 \
    CGO_ENABLED=1

# 安装构建依赖 (如果需要CGO，这里需要安装 gcc musl-dev)
RUN apk add --no-cache gcc musl-dev

# 复制依赖文件并下载
COPY go.mod go.sum ./
RUN go mod download

# 复制源码
COPY . .

# 构建应用
RUN go build -o usleep-server main.go

# 运行阶段
FROM alpine:latest

WORKDIR /app

# 安装必要的运行时依赖 (如 sqlite 需要的库)
# 如果是纯Go且CGO_ENABLED=0，可以不需要这些，但SQLite通常依赖libc或者用pure go sqlite driver
# 这里假设使用了 cgo-sqlite，因此需要 libc 兼容层
RUN apk add --no-cache ca-certificates tzdata

# 从构建阶段复制二进制文件
COPY --from=builder /app/usleep-server .

# 创建数据和配置目录
RUN mkdir -p /app/data /app/config

# 暴露端口
EXPOSE 8080

# 启动命令
CMD ["./usleep-server"]
