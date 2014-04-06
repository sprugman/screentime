#!/bin/sh
while (true) do
	DATE=$(date +"%Y-%m-%d")
	TIME=$(date +"%H-%M-%S")
	screencapture -x "./screens/$DATE--$TIME.png" > /dev/null 2>&1
	sleep 300
done
