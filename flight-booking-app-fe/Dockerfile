# Sử dụng Node.js để build FE
FROM node:18-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Stage chạy FE bằng Nginx
FROM nginx:alpine

# Copy build ra nginx
COPY --from=build /app/build /usr/share/nginx/html

# Copy cấu hình nginx custom
COPY nginx.conf /etc/nginx/conf.d/default.conf

# FE chỉ chạy bên trong container, không cần expose port
# Nếu muốn debug cục bộ thì bạn mới thêm EXPOSE 80
# EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
