cd $(pwd)
npm config set registry http://npm.huobiapps.com/
# rm -rf node_modules/
npm i fed-crowdin
npm config set registry https://registry.npmmirror.com/
npm i opencc