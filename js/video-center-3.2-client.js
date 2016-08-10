/**
* Created by thruthesky on 2016-08-01.
*/
/**
 *
 */
/// Script begins.
$(function(){

    register_event_handler();

    if ( username ) {
        if ( roomname ) {
            showRoom({username: username, name: roomname});
        }
        else {
            enterLobby();
        }
    }
    else {
        showEntrance();
    }

});


