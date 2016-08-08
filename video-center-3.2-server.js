/**
 * @file video-center-3.2.js
 *
 * @type {{}}
 *
 */
var vc = {};
var rooms = ['Lobby'];
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



vc.listen = function(socket, io) {

    
    /*----------New Implementation-----------*/
    //New Connection
    console.log('Someone Connected');
    //disconnection
    socket.on('disconnect', function(){
        var info = socket.info;
            vc.removeUser( socket.id );
            socket.leave(socket.room);
            console.log('Someone Disconnected');            
        
    });
    //New User    
    socket.on('new user', function(username, callback){
      
        socket.username = username;
        vc.addUser(socket, username);
        vc.updateUsernames(socket); //???
        socket.room = 'Lobby';
        socket.join('Lobby');
        console.log("%s join the Lobby", username);
        socket.emit('updaterooms', rooms, "Lobby");
        callback(true);
    });
    /*Lobby Area*/
    //Update Username
    socket.on('update username', function(username,callback){        
        socket.username = username;
        vc.updateUsername( socket, username );
        vc.updateUsernames(socket);
        callback(true);
    });
    //Create Room
    socket.on('create room', function(newroom, callback){
        rooms.push(newroom);         
        vc.updateRoom(newroom,socket,io);   
        callback(true);         
    
    });
    //Logout
    socket.on('logout', function(callback){
        console.log("%s leave the Lobby", socket.username);
        vc.removeUser( socket.id );
        callback(true);             
    });
    socket.on('switchRoom', function(newroom, callback){
        callback(true);  
        vc.updateRoom(newroom,socket,io);          
    });
    /*Chat Room*/
    socket.on('send message', function(data){
        // io.sockets.emit('new message', {msg:data,user:socket.username});
        console.log("Room ",socket.room);
        io.sockets["in"](socket.room).emit('new message', {msg:data,user:socket.username});
    });

}; // eo vc.listen()


/**
 *
 * Add an incoming socket to vc.chat
 *
 * @param socket
 */
vc.addUser = function (socket,username) {
    var info = {};
    info.username = username;
    info.connectedOn = Math.floor( new Date() / 1000 );
    info.socket = socket.id;
    socket.info = info;
    vc.user[ socket.id ] = socket;
};

vc.getUser = function (socket) {
    return vc.user[ socket.id ].info;
};

vc.updateUsername = function( socket, username ) {
    vc.user[ socket.id ].info.username = username;
};
vc.updateUsernames = function(socket){        
    socket.emit('get username', socket.username);
};
vc.removeUser = function (id) {

    // var s = vc.user[ id ]; // socket
    delete vc.user[ id ];

};
vc.updateRoom = function (newroom,socket,io) {
    var oldroom;
    oldroom = socket.room;
    socket.leave(socket.room);
    socket.join(newroom);
    console.log('%s leave the %s',socket.username,oldroom);
    socket.room = newroom;
    console.log('%s connect to %s',socket.username,newroom);
    io.sockets.emit('updaterooms', rooms);
    socket.emit('updateroomname',newroom);      
};


