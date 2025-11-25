# Base image Node.js
FROM node:18-alpine

# Tạo thư mục làm việc
WORKDIR /app

# Copy package.json và cài dependencies
COPY package*.json ./
RUN npm install --production

# Copy toàn bộ source code
COPY . .

# Expose port
EXPOSE 8080

# Lệnh chạy server
CMD ["npm", "start"]
