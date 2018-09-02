#!/bin/bash
set -x #echo on

echo "Syncing package"
rsync -a ./package.json /var/www/wedding/
rsync -a ./dist/ /var/www/wedding/dist/
rsync -a ./server.js /var/www/wedding/
rsync -a ./db/ /var/www/wedding/db/

cd /var/www/wedding
rm -rf /var/www/wedding/node_modules
npm install --only=production

sudo systemctl restart wedding.service
