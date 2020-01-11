#!/bin/sh
set -e
APP_PATH=/usr/src/app
cd $APP_PATH
ls -al $APP_PATH
#
node -v
npm -v
# npm ci --only=production
#
exec node server.js
