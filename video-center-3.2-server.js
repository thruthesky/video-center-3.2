/**
 * @file video-center-3.2.js
 *
 * @type {{}}
 *
 * @todo deleve socket thru vc.socket.
 *
 *
 */

var extend = require('./RTCMultiConnection/node_modules/extend');
var util = require('./RTCMultiConnection/node_modules/util');
var vc = {};
exports = module.exports = vc;
/**
 *
 * 'vc.chat' has all the sockets.
 * @note 'vc.chat' is key/value array whose key is socket.id
 *
 * @type {Array}
 */
vc.user = {};
/**
 * Whiteboard drawing history.
 * @type {Array}
 */
vc.whiteboard_line_history = [];



var count_trace = 0;
var trace = function( msg ) {
    count_trace ++;
    console.log('[' + count_trace + '] ' + msg);
};


vc.listen = function(socket, _io) {

    vc.io = _io;

    
    /*----------New Implementation-----------*/
    // New Connection
    trace( socket.id + ' has been Connected' );

    vc.addUser( socket );




    //disconnection
    socket.on('disconnect', function(){
        forceDisconnect( socket );
    });
    /**
    socket.on('force-disconnect', function(callback) {
        forceDisconnect(callback);
    });
     */
    //New User
    /**
     *
     * @todo pass socket.info to callback()
     */
    socket.on('update-username', function(username, callback) {
        try {
            var user = me( socket ); // vc.user[ socket.id ];
            var oldUsername;
            if ( typeof user == 'undefined' ) {
                oldUsername = socket.id;
                vc.addUser( socket, username );
            }
            else {
                oldUsername = user.username;
                user.username = username;
            }
            trace(oldUsername + " has changed his name to : " + username);
            callback(username);
            vc.io.sockets.emit('update-username', user );
        }
        catch ( e ) {
            socket.emit( 'error', 'socket.on("update-username") Cause: ' + getErrorMessage( e ) );
        }
    });



    // join lobby
    socket.on('join-lobby', function(callback) {
        socket.join('Lobby');
        callback();
    });


    //Create Room
    socket.on('create-room', function(roomname, callback){
        vc.createRoom(socket, roomname, callback);
    });
    socket.on('join-room', function(roomname, callback){
        vc.joinRoom(socket, roomname, callback);
    });
    socket.on('leave-room', function(roomname, callback){
        vc.joinRoom(socket, roomname, callback);
    });

    socket.on('log-out', function(callback){
        forceLogout( socket, callback );
    });
    //Logout
    /*socket.on('logout', function(callback){
        trace(socket.username + " leave the Lobby");
        vc.removeUser( socket.id );
        callback(true);
    });*/
    /*socket.on('switchRoom', function(newroom, callback){
        callback(true);
        vc.updateRoom(newroom,socket,io);
    });*/


    socket.on('user-list', function( callback ){
        trace("user-list message received from client.");
        var users = {};
        for( var i in vc.user ) {
            if ( ! vc.user.hasOwnProperty(i) ) continue;
            users[i] = vc.user[i];
        }
        // socket.emit('user_information', users);
        callback( users );
    });

    socket.on('room-list', function( callback ){
        trace("room-list message received from client.");
        callback( vc.getRoomList() );
    });

    socket.on('send message', function(message){
        try {
            var user = me( socket );
            console.log('Server Room:'+user.roomname);
            vc.io.sockets["in"]( user.roomname ).emit('get message', { message: message, username: user.username, roomname: user.roomname } );
        }
        catch ( e ) {
            socket.emit('error', 'socket.on("send message") CAUSE: ' + getErrorMessage(e));
        }
    });

}; // eo vc.listen()


/**
 *
 * Add an incoming socket to vc.chat
 *
 *
 * @param socket
 * @param username
 */
vc.addUser = function (socket, username) {
    var user = {};
    user.username = username || 'Anonymous'; // user.name
    user.connectedOn = Math.floor( new Date() / 1000 );
    user.socket = socket.id;
    user.roomname = 'Lobby'; // user.room.name, user.room.id, user.room.password, user.room.owner..
    // socket.info = info;
    // socket.join('Lobby');
    vc.user[ socket.id ] = user;
};




/**
 *
 *
 * Returns user information from a socket.
 *
 *
 * @todo error handling
 *
 * @type {me}
 */
var my = me = function(socket) {
    try {
        if ( typeof socket == 'undefined' ) socket.emit('error', 'vc.getUser: socket is undefined');
        if ( typeof socket.id == 'undefined' ) socket.emit('error', 'vc.getUser: socket.id is undefined');
        return vc.user[ socket.id ];
    }
    catch ( e ) {
        socket.emit('error', 'getUser() CAUSE : ' + getErrorMessage(e));
    }
};



/*
vc.updateUsername = function( socket, username ) {
    vc.user[ socket.id ].username = username;
};
*/

/**
 *
 * @param socket
 */
/**
vc.updateUsernames = function(socket){
    socket.emit('get username', socket.username);
};
 */





vc.removeUser = function (id) {

    // var s = vc.user[ id ]; // socket
    delete vc.user[ id ];

};
vc.logoutUser = function (id) {

    // var s = vc.user[ id ]; // socket
    //delete vc.user[ id ].info.username;
    // delete vc.user[ id ];
    vc.removeUser( id );

};
vc.createRoom = function ( socket, roomname, callback ) {
    var user = me( socket );
    socket.leave(user.roomname);
    trace( user.username + ' left :' + user.roomname);

    user.roomname = roomname;
    socket.join( user.roomname );

    trace( user.username + ' created and joined :' + user.roomname);

    if ( typeof callback == 'function' ) callback( user );
    vc.io.sockets.emit('create-room', user );
};

vc.joinRoom = function( socket, roomname, callback ) {
    var user = me( socket );
    socket.leave( user.roomname );
    socket.join( roomname );
    user.roomname = roomname;
    trace( user.username + ' joined :' + roomname);
    if ( typeof callback == 'function' ) callback( user );
    vc.io.sockets.emit('join-room', {user: user } );
};



var forceDisconnect = function( socket, callback ) {
    var user = me( socket );
    socket.leave( user.roomname );
    vc.removeUser( socket.id );

    //socket.leave(socket.room);
    // socket.disconnect();


    if ( typeof callback == 'function' ) callback();
    vc.io.sockets.emit('disconnect', socket.id);
};

var forceLogout = function( socket, callback ) {

    var user = me( socket );

    socket.leave( user.roomname );
    vc.io.sockets.emit('log-out', socket.id);

    console.log( user.username + ' has logged out');
    if ( typeof callback == 'function' ) callback( user );
};

//noinspection JSUndefinedPropertyAssignment
/**
 *
 * @returns {string}
 */
vc.getRoomList = function ( o ) {

    var defaults = {
        room: false,
        user: false
    };
    o = extend( defaults, o );
    var rooms = vc.io.sockets.manager.rooms;

    var roomList = [];
    for ( var roomname in rooms ) {
        if ( ! rooms.hasOwnProperty( roomname ) ) continue;
        if ( roomname == '' ) continue;
        roomname = roomname.replace( /^\//, '' );
        roomList.push( roomname );
    }
    return roomList;
};

//noinspection JSUndefinedPropertyAssignment
vc.isRoomExist = function( name ) {
    var re = vc.getRoomList ( {room: name} );
    return re.length;
};



function getErrorMessage(e) {
    var message = 'Unknown';
    if ( typeof e.message != 'undefined' ) message = e.message;
    return message;
}