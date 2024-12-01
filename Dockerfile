# 使用 Nginx 作为 Web 服务器
FROM nginx:stable-alpine

# 将 Vue 项目文件复制到 Nginx 的默认 HTML 目录
COPY . /usr/share/nginx/html/

# 暴露端口
EXPOSE 80

# 启动 Nginx 服务
CMD ["nginx", "-g", "daemon off;"]

