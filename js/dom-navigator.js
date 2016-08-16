/**
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
} ( jQuery ) );


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
    if ( lobby().css('display') != 'none' ) return lobby();
    if ( room().css('display') != 'none' ) return room();
};


var activeUserList = function() {
    return activePanel().find('.user-list');
};

