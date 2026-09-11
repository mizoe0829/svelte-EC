FROM node:22-slim

WORKDIR /app

# 依存関係定義をコピーしてキャッシュを活用
COPY package*.json ./

RUN npm install

# ソースコードをコピー
COPY . .

# Vite 開発サーバーのポートを公開
EXPOSE 5173

# 開発サーバーを起動 (コンテナ外からアクセス可能にするため --host 0.0.0.0 を付与)
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
