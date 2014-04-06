# ScreenTrack
## Track your time with screenshots

Components

 - capture.sh -- shell script for caturing screenshots periodically
 	- currently just a basic sleep loop
 	- ideas for improvements
 		- start & stop commands
 		- set a limit, either # of files, # of bytes, or # of days to keep
 - server 
 	- not implemented yet
 	- simple server for viewing captures in a web page
 	- mostly static -- only dynamic bit is list of available files
 	- php for now, I'd like to switch to node
 - capture viewer
 	- not implemented yet
 	- single page web app for viewing images
 	- future feature ideas include a way to associate groups of images with a description & integrating that with time tracking s/w
