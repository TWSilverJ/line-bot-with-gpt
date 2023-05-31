# 基底 Images
FROM node:lts-slim

# 設定目的資料夾
WORKDIR /app

# 複製 package.json
COPY package*.json ./

# 安裝套件
RUN npm install && npm cache clean --force

# 複製專案資料與轉譯為 JavaScript
COPY . .

# 運行應用程式
CMD ["node", "app.js"]