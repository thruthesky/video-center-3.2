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
var username = db.get('username');
/**
 *
 */


 //Entrance 
$(function(){
    $('body').on('submit', entrance().find('form'), on_username_submit);
});

/*Lobby Area*/
$(function(){   
        var $lobby_menu = $('#lobby-menu');
        var $menuFormUsername = $('#menuFormUsername');
        var $menuFormRoom = $('#menuFormRoom');
        $lobby_menu.on('click', '#btnUpdateUsername',function(){
                $('.menu-room').hide();
                $('.menu-username').show();
        });
        $lobby_menu.on('click', '#btnCreateRoom',function(){
                $('.menu-username').hide();
                $('.menu-room').show();
        });  
        $lobby_menu.on('click', '#btnLogout',function(){
            socket.emit('logout',function(confirm){
                if(confirm){
                    $('#menu-username').hide();
                    $('#menu-room').hide();
                    lobby().hide();
                    $('#entrance').show();
                }
            });
        }); 
       $menuFormUsername.submit(function(e){
            e.preventDefault();
               socket.emit('update username', $('#updateUsername').val(), function(callback){
                if(callback){
                    $('#menu-username').hide(); 
                }
            });     
        }); 
       $menuFormRoom.submit(function(e){
            e.preventDefault();
            if($('#createRoom').val()==null||$('#createRoom').val()==""){
                $('#createRoom').val("Room");
            }
            socket.emit('create room', $('#createRoom').val(), function(callback){
                if(callback){
                    lobby().hide();
                    $('#messageArea').show(); 
                }           
                                   
            });
            $('#createRoom').val('');
        });
    
        
        socket.on('get username', function(data){
                $('#updateUsername').val(data);
        });  
        socket.on('updaterooms', function (rooms,current_room) {
            $('#rooms').empty();
            $.each(rooms, function(key, value) {                  
            $('#rooms').append('<div><p class="fa fa-comments roomsnames" id="roomsnames">' + value + '</p></div>');  
            });
        });       
         $('#rooms').on('click', '#roomsnames', function(e) {    
           if($(this).html()=="Lobby"){
               alert("You cannot join Lobby");
           }
           else{            
                 socket.emit('switchRoom', $(this).html(), function(data){
                    lobby().hide();
                    $('#messageArea').show(); 
               });
           }
         });
});

 //Chat Room
 $(function(){ 
    var $chat = $('#chat');
    $('#messageForm').submit(function(e){
         e.preventDefault();
         socket.emit('send message', $('#message').val());
         $('#message').val('');
     });

     socket.on('new message', function(data){
         $chat.append('<div class="mzstyle"><strong>'+data.user+': </strong>'+data.msg+'</div>');                
         $chat.animate({scrollTop: $chat.prop('scrollHeight')});
         
     });

    socket.on('updateroomname', function(data){
        $('#roomname').empty();
        if(data==null||data==""){
            data="Room";
        }
        $('#roomname').append('<h4>'+data+'</h4>');
    });
});


// Functions
function on_username_submit(event) {
    event.preventDefault();
    var $username = $('#username');
    if ( $username.val() == "" ) {
        $username.val(db.get('username', getRandomString()));
        db.set('username', $username.val());
    }
    else {
        db.set('username', $username.val());
    }
    username = $username.val();
      
    socket.emit('new user', username, function(data){
        if ( data ) {
            $entrance.hide();
            $lobby
                .show()
                .find('.username').text( username );
        }
    });   
    $username.val('');
}






// element
var entrance = function() {
    return $('#entrance');
};
var lobby = function() {
    return $('#lobby');
};