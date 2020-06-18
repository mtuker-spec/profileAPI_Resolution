#!/bin/bash

# wait script for run unit tests against api-gradle(profileAPI)
# first waits for the service to respond 200/http and then run the tests (from) the
# docker container previously provisioned and deployed.

# use it ./wait_for_api_gradle.sh http(s)://api-gradle:port/url
# by Marcos Vicente <m.vicentef@yahoo.com.ar> for the Ubisoft devops exercise

URL_ARG="$1"
counter=0
while [ "$( curl --connect-timeout 2 -s -o /dev/null -w ''%{http_code}'' $URL_ARG )" != "200" ]
 	do 
 		echo "Waiting for $URL_ARG to respond..."
 		sleep 10
 		counter=$((counter+1))
 		if [ "$counter" -ge "10" ]
 		then
 			echo "Timeout counter reached, please review previous logs"
 			exit 1
 		fi
 	done
echo "$URL_ARG is up!"
npm test;
if [ $? -eq 0 ]
then
	echo "Unit test stage passed, you can move forward!"
	exit 0
else
	echo "Unit test stage error, stay right where you are!"
	exit 1
fi