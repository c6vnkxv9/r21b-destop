set -e
yarn build
cd dist
git init
git add -A
git commit -m 'deploy'
git push -f https://github.com/KamiiLiu/R21B.git master:gh-pages
cd -