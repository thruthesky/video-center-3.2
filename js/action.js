
/////////////////////////////////////////////////////////////
//
// actions
//
/////////////////////////////////////////////////////////////

/**
 *
 * jQuery Extensions
 *
 */
(function($){
    $.fn.getUserList = function () {
        return server_user_list(i_got_user_list, this);
    };
    $.fn.getRoomList = function () {
        return sever_room_list( i_got_room_list, this );
    };
    $.fn.isActive = function () {
        return this.css('display') != 'none';
    };
    $.fn.addRoom = function (user) {
        $('#room-list').append( markup.roomName(user) );
    };
    $.fn.appendUser = function(user) {
        var $userList;
        if ( this.hasClass('user-list') ) $userList = this;
        else $userList = this.find('.user-list');
        var $user = $userList.find('[socket="'+user.socket+'"]');
        if ( $user.length ) $user.remove();
        $userList.append( markup.userName(user) );
    };
    $.fn.emptyRoomList = function () {
        return $('#room-list').empty();        
    };
}(jQuery));




/**
 * @todo user must be logged out from the server and update to all client.
 */
var doLogout = function() {
    delete_username();
    showEntrance();
    /*
     showLobby( function() {
     console.log('after show lobby');
     })
     */
};


/**
 * @todo user cannot enter a room if he/she has no room information to enter.
 *      * but to make it clear, 'do unit test' or 'add error handling'
 * @param o - is room information.
 *      - o.name - room name is mandatory.
 */
var enterRoom = showRoom = function(o) {
    entrance().hide();
    lobby().hide();
    room().show();
    room().find('.roomname').text(o.name);
};

var showEntrance = function() {
    lobby()        
        .hide()
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
    server_enter_lobby( i_entered_lobby );
};

var i_entered_lobby = showLobby = function(callback) {
    entrance().hide();
    room().hide();

    lobby()
        .getUserList()
        .getRoomList()
        .show();
    lobby()
        .find('.username').text( username );
    if ( typeof callback == 'function' ) callback();
};

var i_return_session = function(username) {
    server_update_username({
                'username' : username,
                'callback' : function(username) {
                    console.log('name updated');
                    if ( entrance().isActive() ) enterLobby();
                }
    });
}

var i_left_room = function(callback) {
    entrance().hide();
    room().hide();

    lobby()
        .getUserList()
        .show();
    lobby()
        .find('.username').text( username );
    if ( typeof callback == 'function' ) callback();
};

var i_got_message = function( data ) {
    
    var msg=data.message; 
    var usrname = data.username; 
    var room = data.room_id;
    console.log("Message: "+msg+" Name: "+usrname+" Room: "+room);
    if(data.room_id=='Lobby') {
        lobbyDisplay().append( markup.chatMessage( data ) );
        lobbyDisplay().animate({scrollTop: lobbyDisplay().prop('scrollHeight')});
    }
    else {
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
        var user = rooms[i];
        if ( typeof user == 'undefined' || user == '' || user == 'null' || user == null || ! user ) continue;
        $this.addRoom( user ); // markup.roomName( user );
    }
}





var all_client_remove_user = function(socket) {
    activePanel().find('.user-list [socket="'+socket+'"]').remove();
};



function updateUserOnUserList(user) {
    console.log('updateUserOnUserList', user);
    var $user = activeUserList().find('[socket="'+user.socket+'"]');
    if ( $user.length ) $user.text(user.username);
    else activeUserList().appendUser( user );
}





///////////////////////////////////////////////////////////
//
//
// Callbacks of "from server to client"
//
//
///////////////////////////////////////////////////////////



function all_client_add_room(room) {
    lobby().addRoom( room ); // add room on lobby no matter where you are.
}

function all_client_update_username(user) {
    //For updating the username in lobby
    updateUserOnUserList(user);
    lobby().find('.username').text( username );
}

/*
 var callback_from_server__create_room = function(room) {
 console.log(room);
 showRoom(room);
 };
 */

