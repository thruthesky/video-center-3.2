
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

var const_username = 'username_key'; // + (new Date).getTime();
var username = get_username(); // if user has name, no entrance.
var roomname = ''; // if user has name & room, no entrance and no lobby.

