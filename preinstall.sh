#!/usr/bin/env bash
file="./node_modules/keystone"

if [ -d "$file" ]
then
	echo "pre-install validations run"
	npm install semver && node -e "require('./node_modules/keystone/lib/archjs/utils/startup-check.js').nodeVersion(require('path').resolve('./package.json'))"
else
	echo "First install. Doesn't execute validations"
fi
