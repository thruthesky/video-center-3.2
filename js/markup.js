
var markup = {};
markup.userName = function( user ) {
    return '<div socket="'+user.socket+'">' + user.username + '</div>';
};
markup.roomName = function( room ) {
    return '<div class="roomname" id="'+room.id+'">'+room.name+'</div>';
};


markup.chatMessage = function ( data ) {
    return '<div><strong>'+data.user+': </strong>'+data.msg+'</div>';
};