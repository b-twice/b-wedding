#!/bin/bash
set -x #echo on

echo "Building package"
npm build
echo "Syncing package"
rsync -a /var/lib/jenkins/workspace/wedding-pipeline/node_modules/ /var/www/wedding/
rsync -a /var/lib/jenkins/workspace/wedding-pipeline/dist/ /var/www/wedding/
rsync -a /var/lib/jenkins/workspace/wedding-pipeline/server.js /var/www/wedding/

# sudo systemctl restart wedding.service

