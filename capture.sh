#!/bin/sh
sleep 5 # wait a few seconds so the terminal isn't always the first capture
while (true) do
	DATE=$(date +"%Y-%m-%d")
	TIME=$(date +"%H-%M-%S")
	screencapture -x "./screens/full/$DATE--$TIME.png" > /dev/null 2>&1
	cp "./screens/full/$DATE--$TIME.png" "./screens/thumbs"
	sips -Z 200 "./screens/thumbs/$DATE--$TIME.png" > /dev/null 2>&1
	printf "." # a little feedback in the shell so you can see that this is running
	sleep 300
done
