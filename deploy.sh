#!/usr/bin/env sh

# 發生錯誤時終止腳本
set -e

# 進入前端目錄
cd frontend

# 構建
npm run build

# 進入構建後的資料夾
cd dist

# 將 gh-pages-readme.md 複製為 README.md
cp ../public/gh-pages-readme.md README.md

# 如果你是部署到自定義域名
# echo 'www.example.com' > CNAME

# 初始化 git 並提交
git init
git add -A
git commit -m 'deploy'

# 如果你想部署到 https://<USERNAME>.github.io/<REPO>
git push -f https://github.com/kamiiliu/r21b-destop.git master:gh-pages

cd -
cd ..
