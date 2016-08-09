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

var const_username = 'username3' + (new Date).getTime();
var username = db.get( const_username ); // if user has name, no entrance.
var roomname = ''; // if user has name & room, no entrance and no lobby.
/**
 *
 */
/// Script begins.
$(function(){

    initEventHandlers();

    if ( username ) {
        if ( roomname ) {
            room().show();
        }
        else {
            lobby().show();
        }
    }
    else {
        entrance()
            .show()
            .getUserList();
    }

    // update name.
    /*
    socket.emit('update-username', 'my-name', function(){
        showLobby( function() {
            // create a  room
            socket.emit('create-room', 'my-room', function(user){
                console.log('message from server: crate-room');
                console.log(user);
                createRoom(user);
            });
        });

        // leave to lobby
        //setTimeout(function(){
          //  $('.room-leave').click();
        //}, 100);

    });
*/


    //alert( activePanel().prop('id') );

});


function callback_message_from_server___update_username() {
    //For updating the username in lobby
    lobby().find('.username').text( username );
}

function createRoom(room) {
    ///
    console.log('createRoom');
    console.log(room);
    showRoom(room);
}
function joinRoom() {
    var $room = $(this);
    socket.emit('join-room', $room.attr('id'), function(room) {
        showRoom( room );
    });
}
function leaveRoom() {    
    socket.emit('leave-room','Lobby', function(room) {       
        /*$('.roomname').remove();*/        
        backLobby();        
    });
}


function initEventHandlers() {
    entrance().find('form').submit(on_username_form_submit);
    lobby().find('.form.update-username form').submit(on_username_form_submit);
    lobby().find('.form.create-room form').submit(on_create_room_form_submit);
    lobby().find('.chat form').submit(on_chat_submit);
    $('.room-leave').click( leaveRoom );
    $('body').on('click', '.roomname', joinRoom );
    function on_chat_submit(event) {
        event.preventDefault();
         $message=$(this).find('[name="message"]');
         // console.log($message.val());
         socket.emit('send message', $message.val());
         $message.val('');
    }
    
    room().find('.chat form').submit(on_chat_submit);
}




 /**
  *
  * jQuery Extensions
  *
  */
(function($){
    $.fn.getUserList = function () {
        var $this = this;
        socket.emit('user-list', function(users) {
            for( var i in users ) {
                if ( ! users.hasOwnProperty(i) ) continue;
                var user = users[i];
                $this.appendUser( user );
            }
        });
        return this;
    };
    $.fn.getRoomList = function () {
        var $this = this;
        socket.emit('room-list', function(rooms) {
            for( var i in rooms ) {
                if ( ! rooms.hasOwnProperty(i) ) continue;
                var user = rooms[i];
                if ( typeof user == 'undefined' || user == '' || user == 'null' || user == null || ! user ) continue;
                $this.addRoom( user ); // markup.roomName( user );
            }
        });
        return this;
    };

    $.fn.isActive = function () {
        return this.css('display') != 'none';
    };
    $.fn.addRoom = function (user) {
        $('#room-list').append( markup.roomName(user) );
    };
    $.fn.appendUser = function(user) {
        var $userList;
        if ( this.hasClass('user-list') ) $userList = this;
        else $userList = this.find('.user-list');
        var $user = $userList.find('[socket="'+user.socket+'"]');
        if ( $user.length ) $user.remove();
        $userList.append( markup.userName(user) );
    };
}(jQuery));


///////////////////////////////////////////////////
//
// Event Handlers
//
///////////////////////////////////////////////////
/**
 *
 * @param event
 */
function on_username_form_submit(event) {
    event.preventDefault();
    var $form = $(this);
    send_update_username({
        'username' : $form.find('[name="username"]').val(),
        'callback' : function() {
            console.log('name updated');
            
        }
    });
    $form.find('[name="username"]').val('');
}

function send_update_username(o) {
    console.log('send_update_username', o);
    if ( o.username == "" ) {
        return alert('username is empty');
    }
    else {
        db.set(const_username, o.username);
        username = o.username;
    }

    // I change My nickname....
    socket.emit('update-username', o.username, function(username){
        console.log('callback update-username', username);
        if ( entrance().isActive() ) showLobby();
    });

}

function on_create_room_form_submit(event) {
    event.preventDefault();
    console.log('on_create_room_form_submit');
    socket.emit( 'create-room', $(this).find('[name="roomname"]').val(), createRoom);
    $(this).find('[name="roomname"]').val('');
}

///////////////////////////////////////////////////////////
//
//
// Socket Event Listeners.
//
//
///////////////////////////////////////////////////////////

/**
 * 'update-username' receive from server.
 * A user of chat has changed his name.
 */
socket.on('update-username', function( user ) {
    console.log('socket.on : update-username : ', user);
    updateUserOnUserList(user);
    callback_message_from_server___update_username();
});
socket.on('disconnect', function( socket ) {
    socket_disconnect(socket);
});
socket.on('create-room', function( room ) {
    console.log( room );
    lobby().addRoom( room );
    /*to display the roomlist only once
    if ( lobby().isActive() ) {
        lobby().addRoom( room );
    }*/          
});
socket.on('get message', function(data){    
    if(data.roomid=='Lobby') {
        lobbyDisplay().append('<div><strong>'+data.user+': </strong>'+data.msg+'</div>');                
        lobbyDisplay().animate({scrollTop: lobbyDisplay().prop('scrollHeight')});
    }
    else {
        display().append('<div><strong>'+data.user+': </strong>'+data.msg+'</div>');                
        display().animate({scrollTop: display().prop('scrollHeight')});
    }
});

function updateUserOnUserList(user) {
    console.log('updateUserOnUserList', user);
    var $user = activeUserList().find('[socket="'+user.socket+'"]');
    if ( $user.length ) $user.text(user.username);
    else activeUserList().appendUser( user );
}

function socket_disconnect(socket) {
    activePanel().find('.user-list [socket="'+socket+'"]').remove();
}



/////////////////////////////////////////////////////////////
//
// element
//
/////////////////////////////////////////////////////////////

var entrance = function() {
    return $('#entrance');
};
var lobby = function() {
    return $('#lobby');
};
var room = function() {
    return $('#room');
};
var activePanel = function() {
    if ( entrance().css('display') != 'none' ) return entrance();
    if ( lobby().css('display') != 'none' ) return lobby();
    if ( room().css('display') != 'none' ) return room();
};
var activeUserList = function() {
    return activePanel().find('.user-list');
};
var display = function() {
    return $('#display');
};
var lobbyDisplay = function() {
    return $('#lobbyDisplay');
};


/////////////////////////////////////////////////////////////
//
// markup
//
/////////////////////////////////////////////////////////////

var markup = {};
markup.userName = function( user ) {
    return '<div socket="'+user.socket+'">' + user.username + '</div>';
};
markup.roomName = function( room ) {
    return '<div class="roomname" id="'+room.id+'">'+room.name+'</div>';
};


/////////////////////////////////////////////////////////////
//
// actions
//
/////////////////////////////////////////////////////////////
var showLobby = function(callback) {
    entrance().hide();
    room().hide();
    var users = entrance().find('.user-list').html();

    lobby()
        .getUserList()
        .getRoomList()
        .show();
    lobby()
        .find('.username').text( username );
    if ( typeof callback == 'function' ) callback();
};
var backLobby = function(callback) {
    //I add this sir because when leaving the room it will duplicate the roomlist
    entrance().hide();
    room().hide();
    var users = entrance().find('.user-list').html();

    lobby()
        .getUserList()
        .show();
    lobby()
        .find('.username').text( username );
    if ( typeof callback == 'function' ) callback();
};

var showRoom = function(roominfo) {
    entrance().hide();
    lobby().hide();
    room().show();
    room().find('.roomname').text(roominfo.name);
};





