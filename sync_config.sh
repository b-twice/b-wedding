#!/bin/bash
set -x #echo on

echo "Syncing configuration"
rsync --copy-links ./src/config.ts jenkins@159.203.127.52:/var/lib/jenkins/workspace/wedding-pipeline/src/config.ts 

