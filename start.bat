@echo off
echo 啟動 R21B 前後端服務

echo 啟動後端服務...
start cmd /k "cd backend && npm run dev"

echo 等待後端服務啟動...
timeout /t 5

echo 啟動前端服務...
start cmd /k "cd frontend && npm run serve"

echo 服務啟動完成！
echo 前端地址: http://localhost:8080
echo 後端地址: http://localhost:3000
echo API 文檔: http://localhost:3000/documentation 