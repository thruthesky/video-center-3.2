
var markup = {};
markup.userName = function( user ) {	
    return '<div socket="'+user.socket_id+'">' + user.username + '</div>';
};
markup.roomName = function( room ) {
    return '<div class="roomname" id="'+room.room_id+'">'+room.name+'</div>';
};


markup.chatMessage = function ( data ) {
    return '<div><strong>'+data.username+': </strong>'+data.message+'</div>';
};