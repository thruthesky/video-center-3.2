
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
var username = get_username(); //  if user has name & room, no entrance and no lobby.
var const_roomname = 'roomname_key'; // + (new Date).getTime();
var roomname = get_roomname();//

var dom_handler = {};
var lobbyRoomname = 'Lobby';

var socket_server_url = 'http://localhost:9001/';
