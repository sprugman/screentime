# ScreenTime
Track time with screenshots

### capture.sh 

shell script for caturing screenshots periodically

 - currently just a basic sleep loop
 - TODO:
	- start & stop commands
	- set a limit, either # of files, # of bytes, or # of days to keep
	- cull older items outside of limit
	- consider scaling images down for better performance & storage
	- collect more data
		- current application
		- current document / site
	- consider writing out list of files after each capture so server can be even dumber

### local server 

simple server to support capture viewer (below)

 - mostly static – only dynamic bit is the list of available files
 - php for now, should be easy to create other kinds of servers – node, python, etc.
 - replace with python -m SimpleHTTPServer? or http-server for node? http://stackoverflow.com/questions/12905426/faster-alternative-to-pythons-simplehttpserver

### capture viewer

single-page web gallery for viewing images

 - pretty basic at the moment
 - TODO:
 	- UI
 		- auto update latest
 		- sort with latest on top
 		- group by gaps, rather than just by hour
		- open/close groups
		- control panel
			- time range slider / pagination
			- open/close all
			- sorting options
			- grouping options(?)
		- zoom to full screen from modal overlay
		- add ability to annotate events from viewer? will require more sophisticated server
		- allow splitting & joining of groups
	- Technical
		- proper build process w/ linting tests

### time tracking integration

*Not implemented*
 
 - Eventually it would be nice to associate groups of images with a (persistent) description & integrate that with time tracking software
 - There are loads of such tools out there. I'm currently playing with timelyapp.com, but it doesn't have an API.
 - Some CLI time trackers:
	- https://news.ycombinator.com/item?id=7409926
	- http://brettterpstra.com/projects/doing/
	- http://projecthamster.wordpress.com
	- https://github.com/aziz/PlainTasks
	- https://github.com/christiangenco/t_time_tracker
	- now() { echo $(date "+%Y-%m-%d %H:%M:%S") - "$@" >> $HOME/.now }
 	- https://github.com/larose/utt
 	- http://wtime.sourceforge.net/
 	- https://github.com/projecthamster/hamster
