/**
 *
 *
 * @file dom-handler.js
 *
 * @description
 *
 *      This library provides everything about DOM handling.
 *
 *      - finding DOM node,
 *      - manipulating DOM node
 *      - listening for DOM event and calls corresponding callback functions.
 *
 * @attention This library must be the only library that uses and handles everything that related in jQuery.
 *
 *      in short, put everything related of jQuery in this file.
 *
 *
 *
 */
( function( $ ) {
    $.fn.logout = function()  {
        return this.find('.logout');
    };
    $.fn.updateusername = function()  {
        return this.find('.update-username');
    };
    $.fn.createroom = function()  {
        return this.find('.create-room');
    };

    $.fn.getUserList = function () {
        return server_user_list(i_got_user_list, this);
    };
    $.fn.getRoomList = function () {
        return sever_room_list( i_got_room_list, this );
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
        var $user = $userList.find('[socket="'+user.socket_id+'"]');
        if ( $user.length ) $user.remove();
        $userList.append( markup.userName(user) );
    };
    $.fn.appendRoom = function(room) {
        var $roomList;
        if ( this.hasClass('room-list') ) $roomList = this;
        else $roomList = this.find('.room-list');
        var $room = $roomList.find('[id="'+room.roomname+'"]');
        if ( $room.length ) $room.remove();
        $roomList.append( markup.roomName(room.roomname) );
    };
    $.fn.emptyRoomList = function () {
        return $('#room-list').empty();
    };
    //emptying the user-list on logout
    $.fn.emptyUserList = function () {
        return $('#user-list').empty();
    };
    //emptying the chat room message
    $.fn.emptyRoomMessage = function () {
        return $('#display').empty();
    };
    $.fn.emptyLobbyMessage = function () {
        return $('#lobbyDisplay').empty();
    };

    $.fn.updateUsername= function(username) {
        this.find('.username').text( username );
        return this;
    };


}(jQuery));



var lobby = function() {
    return $('#lobby');
};

var lobbyDisplay = function() {
    return $('#lobbyDisplay');
};


var display = function() {
    return $('#display');
};

var formUserName = function() {
    return $('#lobby_form_username');
};

var formRoomName = function() {
    return $('#lobby_form_roomname');
};




var entrance = function() {
    return $('#entrance');
};
var room = function() {
    return $('#room');
};


var activePanel = function() {
    if ( entrance().css('display') != 'none' ) return entrance();
    else if ( lobby().css('display') != 'none' ) return lobby();
    else if ( room().css('display') != 'none' ) return room();
    else  return false;
};


var activeUserList = function() {
    if ( activePanel() ) return activePanel().find('.user-list');
    return {};
};

var activeRoomList = function() {
    if ( activePanel() ) return activePanel().find('.room-list');
    return {};
};



function register_event_handler() {
    entrance().find('form').submit(on_form_submit_username);
    lobby().find('.form.update-username form').submit(on_form_submit_username);
    lobby().find('.form.create-room form').submit(on_form_submit_create_room);
    lobby().find('.chat form').submit(on_form_submit_chat);
    lobby().updateusername().click(show_input_username);
    lobby().createroom().click(show_input_roomname);
    lobby().logout().click(doLogout);
    $('.room-leave').click( on_click_leave_room );
    $('body').on('click', '.roomname', on_click_join_room );
    room().find('.chat form').submit(on_form_submit_chat);
}


/**
 *
 * @param obj
 */
dom_handler.hide = function( obj ) {
    obj.hide();
};


dom_handler.hides = function( obj_arr ) {
    for ( var i in obj_arr ) {
        if ( obj_arr.hasOwnProperty(i) ) {
            this.hide( obj_arr[i] );
        }
    }
};

dom_handler.show = function( obj ) {
    obj.show();
};


dom_handler.shows = function( obj_arr ) {
    for ( var i in obj_arr ) {
        if ( obj_arr.hasOwnProperty(i) ) {
            this.show( obj_arr[i] );
        }
    }
};


function show_lobby() {
    dom_handler.hides( [
        entrance(),
        room(),
        formUserName(),
        formRoomName()
    ] );
    dom_handler.shows( [ lobby() ] );
}


var show_input_username = function() {
    formRoomName().hide();
    formUserName().show();
};

var show_input_roomname = function() {
    formUserName().hide();
    formRoomName().show();
};
