# ScreenTrack
Track time with screenshots

### capture.sh 

shell script for caturing screenshots periodically

 - currently just a basic sleep loop
 - TODO:
	- start & stop commands
	- set a limit, either # of files, # of bytes, or # of days to keep
	- cull older items outside of limit
	- consider scaling images down for better performance & storage

### local server 

simple server to support capture viewer (below)

 - mostly static – only dynamic bit is the list of available files
 - php for now, should be easy to create other kinds of servers – node, python, etc.

### capture viewer

single-page web gallery for viewing images

 - extremely basic at the moment
 - TODO:
 	- UI
	 	- time range slider
	 	- time labels
	 	- proper gallery controls / lightbox effect
	- Technical
	 	- proper architecture (Backbone/Marionette/Templates)
	 	- proper build process w/ linting tests

 ### time tracking integration

 *Not implemented*

  - eventually it would be nice to associate groups of images with a (persistent) description & integrate that with time tracking software
  - a few CLI-style possibilities:
 	- https://github.com/larose/utt
 	- http://wtime.sourceforge.net/
 	- https://github.com/projecthamster/hamster
