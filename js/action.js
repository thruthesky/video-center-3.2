
/////////////////////////////////////////////////////////////
//
// actions
//
/////////////////////////////////////////////////////////////


/**
 * @todo user must be logged out from the server and update to all client.
 */
var doLogout = function() {

    server_logout(function() {
        delete_username(); // for lockr
        display().emptyLobbyMessage();
        showEntrance();
    } );//for the server

};


/**
 * @todo user cannot enter a room if he/she has no room information to enter.
 *      * but to make it clear, 'do unit test' or 'add error handling'
 * @param o - is room information.
 *      - o.name - room name is mandatory.
 */
var enterRoom = showRoom = function(o) {
    console.log("Enter Roomname: "+o.roomname);
    roomname=o.roomname;
    save_roomname(roomname);
    entrance().hide();
    lobby()
        .hide()
        .emptyRoomList()
        .emptyUserList();//Added to avoid duplication of userlist
        
    room().show();
    room().find('.roomname').text(o.roomname);
    //every time you join a room change the roomname 
};

var showEntrance = function() {
    lobby()        
        .hide()
        .emptyUserList()//Added to avoid duplication of userlist
        .emptyRoomList();//Added to avoid duplication of roomlist
    room().hide();
    entrance()
        .show()
        .getUserList();
};


/**
 * enters the lobby.
 *
 * The difference between 'enterLobby' and 'showLobby' is that
 *
 *  - 'enterLobby' joins 'lobby chatting room and shows lobby', while
 *  - 'showLobby' does not joins 'lobby chatting room.' it just show 'lobby'.
 *
 * @param callback
 */
var enterLobby = function(callback) {
    console.log('Fresh enter');
    roomname = 'Lobby';
    save_roomname( roomname );
    server_enter_lobby( i_entered_lobby );
};

var i_entered_lobby = showLobby = function(callback) {
    console.log('I enter with username:'+username);
    show_lobby();
    lobby()
        .getUserList()
        .getRoomList()
        .updateUsername( username );
    if ( typeof callback == 'function' ) callback();
};


/*
var i_return_session = function(username) {
    //To fix the find undefined
    lobby().show();
    server_update_username({
        'username' : username,
        'callback' : function(username) {
            console.log('name updated');
            if ( entrance().isActive() ) enterLobby();
        }
    });
};
*/


var i_left_room = function(callback) {
    roomname='Lobby';
    save_roomname(roomname);
    console.log('Roomname: '+roomname);
    display().emptyRoomMessage();
    entrance().hide();
    room().hide();

    lobby()
        .getRoomList()
        .getUserList()
        .show();
    lobby()
        .find('.username').text( username );
    if ( typeof callback == 'function' ) callback();
};

var i_got_message = function( data ) {
    
    var msg=data.message; 
    var usrname = data.username; 
    var room = data.roomname;
    console.log("Message: "+msg+" Name: "+usrname+" Room: "+ data.roomname);
    console.log("Roomname: "+roomname);
    if(roomname=="Lobby"&&data.roomname==roomname) {
        lobbyDisplay().append( markup.chatMessage( data ) );
        lobbyDisplay().animate({scrollTop: lobbyDisplay().prop('scrollHeight')});
    }
    else if (data.roomname==roomname){
        display().append( markup.chatMessage( data ) );
        display().animate({scrollTop: display().prop('scrollHeight')});
    }
};




function i_got_user_list(users, $this) {
    for( var i in users ) {        
        if ( ! users.hasOwnProperty(i) ) continue;
        var user = users[i];
        $this.appendUser( user );
    }
}



function i_got_room_list(rooms, $this) {
    for( var i in rooms ) {
        if ( ! rooms.hasOwnProperty(i) ) continue;
        var roomname = rooms[i];
        if ( _.isEmpty(roomname) ) continue;
        $this.addRoom( roomname );
    }
}





var all_client_remove_user = function(socket) {
    activePanel().find('.user-list [socket="'+socket+'"]').remove();   
};
var all_client_remove_room = function(roomid) {
    activePanel().find('.room-list [id="'+roomid+'"]').remove();   
};


function update_room_on_room_list( room ) {
    console.log('update_room_on_room_list', room);
    if ( activeRoomList().length ) {
        var $room = activeRoomList().find('[id="'+room.roomname+'"]');
        if ( $room.length ) $room.text(room.roomname);
        else activeRoomList().appendRoom( room );
    }

}

// function updateUserOnUserList(user) {
function update_user_on_user_list( user ) {
    console.log('update_user_on_user_list', user);
    if ( activeUserList().length ) {
        var $user = activeUserList().find('[socket="'+user.socket+'"]');
        if ( $user.length ) $user.text(user.username);
        else activeUserList().appendUser( user );
    }

}






///////////////////////////////////////////////////////////
//
//
// Callbacks of "from server to client"
//
//
///////////////////////////////////////////////////////////



/* 
* New implementation for updating the roomlist
*/
function all_client_update_roomlist(room) {    
    update_room_on_room_list(room);    
}

function all_client_update_username(user) {
    //For updating the username in lobby
    update_user_on_user_list(user);
}

/*
 var callback_from_server__create_room = function(room) {
 console.log(room);
 showRoom(room);
 };
 */


// function all_client_add_room(room) {
//     lobby().addRoom( room ); // add room on lobby no matter where you are.
// }
