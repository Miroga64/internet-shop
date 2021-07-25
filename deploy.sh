#!/usr/bin/env sh

set -e

npm run build


cd dist

sudo git init
sudo git add -A
sudo git commit -m 'deploy'

sudo git push -f https://github.com/Miroga64/skillbox_vue_app.git master:gh-pages

cd -