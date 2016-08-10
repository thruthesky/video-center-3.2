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
        /*Added need to fix*/
        console.log("Username:"+username);        
        i_return_session(username);    
        /*Added*/
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


