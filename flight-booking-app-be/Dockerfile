# Sử dụng Node.js image làm base image
FROM node:18-alpine

# Đặt working directory
WORKDIR /app

# Sao chép package.json và package-lock.json (nếu có)
COPY package*.json ./

# Cài đặt dependencies
RUN npm ci

# Sao chép toàn bộ mã nguồn
COPY . .

# Cài đặt environment variables
ENV NODE_ENV=production
ENV PORT=5000
# ENV MONGO_URI=mongodb://mongodb:27017/flightbooking
ENV MONGO_URI=mongodb://host.docker.internal:27017/flightbooking



# Chạy ứng dụng
CMD ["node", "server.js"]