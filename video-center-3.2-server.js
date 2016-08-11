/**
 * @file video-center-3.2.js
 *
 * @type {{}}
 *
 */
var vc = {};
var rooms = { 'Lobby': {room_id: 'Lobby', name: 'Lobby'} };
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


vc.listen = function(socket, io) {

    
    /*----------New Implementation-----------*/
    // New Connection
    trace(socket.id + ' has been Connected');
    /*vc.addUser(socket);*/ //




    //disconnection
    socket.on('disconnect', function(){
        forceDisconnect(io, socket);
    });
    socket.on('force-disconnect', function(callback) {
        forceDisconnect(io, socket, callback);
    });
    //New User
    socket.on('update-username', function(username, callback){
        try {
            var oldUsername;
            if ( typeof socket.info == 'undefined' ) {
                oldUsername = socket.id;
                vc.addUser( socket, username );                
            }
            else {
                oldUsername = socket.info.username;
                socket.info.username = username;
            }
            trace(oldUsername + " has changed his name to : " + username);
            callback(username);
            io.sockets.emit('update-username', socket.info );
        }
        catch ( e ) {
            socket.emit('error', 'socket.on("update-username")'+e);
        }
    });



    // join lobby
    socket.on('join-lobby', function(callback) {
        socket.join('Lobby');
        callback();
    });


    //Create Room
    socket.on('create-room', function(roomname, callback){
        vc.createRoom(io, socket, roomname, callback);
    });
    socket.on('join-room', function(room_id, callback){
        vc.joinRoom(io, socket, room_id, callback);
    });
    socket.on('leave-room', function(room_id, callback){
        vc.joinRoom(io, socket, room_id, callback);
    });
    socket.on('log-out', function(){
        forceLogout(io, socket/*, function(){
            socket.emit('log-out',socket)
        }*/);            
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
            users[i] = vc.user[i].info;
        }
        // socket.emit('user_information', users);
        callback( users );
    });

    socket.on('room-list', function( callback ){
        trace("room-list message received from client.");
        callback( rooms );
    });

    socket.on('send message', function(message){
        try {
            var user = vc.getUser(socket);
            io.sockets["in"]( user.room ).emit('get message', { message: message, username: user.username, room_id: user.room_id } );
        }
        catch ( e ) {
            socket.emit('error', 'socket.on("send message")');
        }
    });




}; // eo vc.listen()


/**
 *
 * Add an incoming socket to vc.chat
 *
 * @param socket
 * @param username
 */
vc.addUser = function (socket, username) {
    var info = {};
    info.username = username || 'Anonymous';
    info.connectedOn = Math.floor( new Date() / 1000 );
    info.socket_id = socket.id;
    info.room_id = 'Lobby';
    socket.info = info;
    // socket.join('Lobby');
    vc.user[ socket.id ] = socket;
};


/**
 *
 * @param socket
 * @returns {*}
 */
vc.getUser = function (socket) {
    try {
        if ( typeof socket == 'undefined' ) socket.emit('error', 'vc.getUser: socket is undefined');
        if ( typeof socket.id == 'undefined' ) socket.emit('error', 'vc.getUser: socket.id is undefined');
        if ( typeof vc.user[ socket.id ] == 'undefined' ) socket.emit('error', 'vc.getUser: vc.user[socket.id] is undefined');
        if ( typeof vc.user[ socket.id ].info == 'undefined' ) socket.emit('error', 'vc.getUser: vc.user[socket.id].info is undefined');
        return vc.user[ socket.id ].info;
    }
    catch ( e ) {
        socket.emit('error', 'getUser()');
    }
};


vc.updateUsername = function( socket, username ) {
    vc.user[ socket.id ].info.username = username;
};

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
vc.createRoom = function (io, socket, roomname, callback) {
    socket.leave(socket.info.room_id);
    trace( socket.info.username + ' left :' + socket.info.room_id);

    var room_id = socket.id; // @attention room_id is room creator's socket.id


    socket.join( room_id );
    socket.info.room_id = room_id;


    /// Saving room info
    rooms[ room_id ] = { room_id: room_id, name: roomname };

    trace( socket.info.username + ' created and joined :' + rooms[ room_id ].name);

    if ( typeof callback == 'function' ) callback( rooms[room_id] );
    io.sockets.emit('create-room', rooms[room_id] );
};

vc.joinRoom = function( io, socket, room_id, callback ) {


    socket.leave( socket.info.room_id );
    socket.join( room_id );
    socket.info.room_id = room_id;
    if ( typeof rooms[room_id].name == 'undefined' ) {
        trace( socket.info.username + ' joined : undefined room');
    }
    else trace( socket.info.username + ' joined :' + rooms[ room_id ].name);
    if ( typeof callback == 'function' ) callback( rooms[room_id] );
    io.sockets.emit('join-room', {user: socket.info, room: rooms[room_id]} );

};



var forceDisconnect = function( io, socket, callback ) {
    vc.removeUser( socket.id );
    socket.leave(socket.room);
    socket.disconnect();
    if ( typeof callback == 'function' ) callback();
    io.sockets.emit('disconnect', socket.id);
    if ( typeof socket.info == 'undefined' ) {
        trace('Notice: socket.info is undefined. The user who has no name may refreshed the page.');
    }
    else {
        var info = socket.info;
        if ( typeof info.username == 'undefined' ) {
            trace('Error: info.username is undefined on disconnected');
        }
        else {
            trace(info.username + ' has disconnected');
        }
    }
};
var forceLogout = function( io, socket ) {
    vc.removeUser( socket.id );
    socket.leave(socket.room);
    io.sockets.emit('log-out', socket.id);
    if ( typeof socket.info == 'undefined' ) {
        trace('Notice: socket.info is undefined. The user who has no name may refreshed the page.');
    }
    else {
        var info = socket.info;
        if ( typeof info.username == 'undefined' ) {
            trace('Error: info.username is undefined on disconnected');
        }
        else {
            trace(info.username + ' has disconnected');
        }
    }
};
