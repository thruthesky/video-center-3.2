/**
 * @file video-center-3.2.js
 *
 * @type {{}}
 *
 */
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



vc.listen = function(socket) {

    vc.addUser( socket );
    console.log("New connection on vc");

    //console.log('New connection on chat. No. of clients : ' + vc.getNumberChatClients());



    socket.on('disconnect', function(){

        var info = socket.info;


        if ( typeof vc.user[socket.id] == 'undefined' ) {
            console.log("ERROR : chat[" + socket.id + "] does not exist on chat array.");
        }
        else {
            vc.removeUser( socket.id );
        }


    });



    socket.on('user_information', function( callback ){
        console.log("user-information message received from client.");

        var users = {};
        for( var i in vc.user ) {
            if ( ! vc.user.hasOwnProperty(i) ) continue;
            users[i] = vc.user[i].info;
        }
        // socket.emit('user_information', users);
        callback( users );
    });


}; // eo vc.listen()


/**
 *
 * Add an incoming socket to vc.chat
 *
 * @param socket
 */
vc.addUser = function (socket) {
    var info = {};
    info.username = 'Anonymous';
    info.connectedOn = Math.floor( new Date() / 1000 );
    info.socket_id = socket.id;
    socket.info = info;
    vc.user[ socket.id ] = socket;
};




vc.removeUser = function (id) {

    // var s = vc.user[ id ]; // socket
    delete vc.user[ id ];

};


