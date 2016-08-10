# video-center-3.2
Video Center Version 3.2 is the next version of video-center-3.
Video Center inherits the idea and the structure of Video Center 3 and it adds lacking functions of it.


# TODO

* delete user from server and update to all if a users logs out or close the borwser.
* delete room if the last user leaves from the room.


* Update room names pumping.

    * before it pulls out room information every 4 seconds.
    
    * Now, update it in real time, right after anything changes from the server.
    

* Use SQLite3 database for settings and customisation


* Domain Management.

    * Customize header & footer of the chat by domain manager.
    
    * Set maximum user per each domain.
    
* Improve chat function.

    * Managers can send message to any one. whether they are in lobby or in room.
    

* Adding room moderator & management function

    * Kick out a member of the room.
    * Set password of the room.

* Adding superuser function.

    * Observing a room without opening camera and without leaving any clue that he is on the room.

* Options

    * Camera change and remember.
        https://github.com/muaz-khan/RTCMultiConnection/wiki/Switch-between-cameras
    
    * headset(speaker/mic) change and remember.
    
    * Video resolution options and remember.
    
* Whiteboard improvement

    * fix the size of the whiteboard.
    
        max-width: 800px
        
        min-width: is the min width of the smallest device among the room members.
        





# INSTALLATION

## RUN server.js

* chat server (  Signaling server ) from rmc.

* 


