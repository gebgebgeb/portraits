#!/bin/bash
rm -r www
cp -r ../build/www/ www/
cordova emulate ios --buildFlag='-UseModernBuildSystem=0' 