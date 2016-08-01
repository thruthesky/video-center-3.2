/**
 * Created by thruthesky on 2016-08-01.
 */





/**
 * =======================================================================
 *
 * VARIABLES
 *
 *
 */

var db = Lockr;
var connection = new RTCMultiConnection();
connection.socketURL = socket_server_url;
var socket = connection.getSocket(); // socket.

var user = {};
user.name = db.get('username');
if ( typeof user.name == 'undefined' ) {
    user.name = getRandomString();
}
console.log(user.name);


/**
 *
 */
$(function(){
    var $body = $('body');
    $body.on('click', '.user-information', on_user_information_click);
});


function on_user_information_click(event) {
    console.log("on_user_information_click");
    var $this = $(this);
    socket.emit( 'user_information', function( user ) {
        console.log( user );
    } );
}
