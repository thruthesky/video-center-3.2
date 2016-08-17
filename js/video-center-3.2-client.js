/**
* Created by thruthesky on 2016-08-01.
*/
/**
 *
 */
/// Script begins.
$(function(){
    /*save_roomname('Lobby'); testing only*/
    register_event_handler();

    if ( username ) {
        /*Added need to fix*/
        console.log("Username:"+username);  
        console.log("Roomname:"+roomname);

        //i_return_session(username);

        // async
        server_login( username, function() {

            // @todo remember room name and enter.
            // @attention it has bug now.
            if ( roomname && roomname!='Lobby') {
                showRoom({username: username, name: roomname});
            }
            else {
                enterLobby();
            }

        } );



    }
    else {
        showEntrance();
    }

});


