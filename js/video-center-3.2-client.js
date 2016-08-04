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
var username = db.get('username', getRandomString());
/**
 *
 */
$(function(){
    var $body = $('body');
    $body.on('click', '.user-information', on_user_information_click);
    $body.on('click', '.set-username', on_set_username);

    $('input[name="username"]').val( username );
    setTimeout(function() {
        socket.emit('set-username', username);
        socket.emit( 'user-information', function(users) {
            for( var i in users ) {
                add_user( users[i] );
                //$('.user-list').append('<div class="user" socket-id="'+i+'">' + users[i].username + '</div>');
            }
        });
    }, 200);

});


function on_user_information_click(event) {
    console.log("on_user_information_click");
    var $this = $(this);
    socket.emit( 'user-information', function( user ) {
        console.log( user );
    } );
}


function on_set_username() {
    var username = $(this).parent().find('input').val();
    socket.emit('set-username', username, function( re ) {
        console.log(re);
        db.set('username', username);
    });
}


socket.on('set-username', function(re) {
    console.log(re);
    $('.user-list .user[socket-id="'+re.socket+'"]').text(re.username);
});
socket.on('remove-user', function(socket) {
    console.log('remove: ' + socket);
    $('.user-list .user[socket-id="'+socket+'"]').remove();
});
socket.on('add-user', add_user);
function add_user(user) {
    $('.user-list .user[socket-id="'+user.socket+'"]').remove();
    $('.user-list').append('<div class="user" socket-id="'+user.socket+'">' + user.username + '</div>');
}