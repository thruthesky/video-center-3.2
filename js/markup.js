
var markup = {};
markup.userName = function( user ) {	
    return '<div socket="'+user.socket.id+'">' + user.username + '</div>';
};
markup.roomName = function( roomname ) {
    return '' +
        '<div class="room">' +
        '   <div class="roomname" id="'+roomname+'">'+roomname+'</div>' +
        '   <div class="users"></div>' +
        '</div>';
};


markup.chatMessage = function ( data ) {
    return '<div><strong>'+data.username+': </strong>'+data.message+'</div>';
};