
///////////////////////////////////////////////////////////
//
//
// Socket Event Emitting 'from Client to Server'
//
//
///////////////////////////////////////////////////////////



function server_enter_lobby(callback) {
    console.log('server_enter_lobby');
    socket.emit( 'join-lobby', function() {
        console.log('callback after server_enter_lobby: successfully joined lobby.');
        callback();
    });
}

function sever_room_list(callback, $this) {
    socket.emit('room-list', function(rooms) {
        callback(rooms, $this);
    });
    return $this;
}


function server_user_list(callback, $this) {
    socket.emit('user-list', function(users) {
        callback(users, $this);
    });
    return $this;
}


function server_join_room(room_id, callback) {
    socket.emit('join-room',room_id, callback);
}


function server_create_room(roomname, callback) {
    socket.emit( 'create-room', roomname, function( room ) {
        callback( room );
    });
}

function server_leave_room(callback) {
     socket.emit('leave-room','Lobby', function(room) {
        /*$('.roomname').remove();*/
        i_left_room();
    });
}

/**
 * Sends a message to server that the user want to update his name.
 * @attention don't be confused with 'all_client_username()'
 * @param o
 */
var server_login = server_update_username = function (username, callback) {
    console.log('server_update_username '+ username);
    socket.emit('update-username',username, callback);
};
//

var server_logout = function () {    
    socket.emit('log-out');
};




function server_send_message(message) {
    console.log(message);
    socket.emit('send message', message);
}

//
// Socket Event Emitting 'from Client to Server'
//


///////////////////////////////////////////////////////////
//
//
// Socket Event Listeners.
//
//
///////////////////////////////////////////////////////////

/**
 * A user updated his name.
 *      That is why we got 'update-username' message from server.
 * All user must update new name of the user.
 */
socket.on('update-username', function( user ) {
    console.log('socket.on : update-username : ', user);
    all_client_update_username(user);
});

/**
 * A user disconnected.
 */
socket.on('disconnect', function( socket ) {
    all_client_remove_user(socket);
});
socket.on('log-out', function( socket ) {
    console.log('I log out:'+socket);
    all_client_remove_user(socket);
});
/* 
* New implementation for updating the roomlist
*/
socket.on('create-room', function( room ) {
    roomid = room.roomname;
    console.log( 'Room Name:'+roomid );
    all_client_update_roomlist( room );
});
/**
 * A user created a room ( his room )
 * All user must add room in his lobby.
 */
// socket.on('create-room', function( room ) {
//     console.log( room );
//     all_client_add_room(room);
//     //lobby().addRoom( room ); // add room on lobby no matter where you are.

//     /**
//      * to display the roomlist only once
//      *
//      if ( lobby().isActive() ) { // Add new room only if the user is in lobby.
//      lobby().addRoom( room );
//      }
//      */
// });

/**
 * You got a message.
 *
 *
 */
socket.on('get message', function(data){
    i_got_message( data );
});



socket.on('error', function( message ) {
    var msg = 'Server error\nPlease notify this error message to administrator\n\n[ ERROR MESSAGE ] ' + message;
    alert(msg);
});