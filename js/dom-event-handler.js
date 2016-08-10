///////////////////////////////////////////////////
//
// Event Handlers
//
///////////////////////////////////////////////////


function register_event_handler() {
    entrance().find('form').submit(on_form_submit_username);
    lobby().find('.form.update-username form').submit(on_form_submit_username);
    lobby().find('.form.create-room form').submit(on_form_submit_create_room);
    lobby().find('.chat form').submit(on_form_submit_chat);
    lobby().logout().click(doLogout);
    $('.room-leave').click( on_click_leave_room );
    $('body').on('click', '.roomname', on_click_join_room );
    room().find('.chat form').submit(on_form_submit_chat);
}






/**
 *
 * @param event
 */
function on_form_submit_username(event) {
    console.log('on_username_form_submit');
    event.preventDefault();
    var $form = $(this);
    username = save_username( $form.find('[name="username"]').val() );
    server_update_username({
        'username' : username,
        'callback' : function(username) {
            console.log('name updated');
            if ( entrance().isActive() ) enterLobby();
        }
    });
    $form.find('[name="username"]').val('');
}

function on_form_submit_create_room(event) {
    event.preventDefault();
    roomname = $(this).find('[name="roomname"]').val();
    console.log('on_form_submit_create_room');
    server_create_room(roomname, enterRoom);
    $(this).find('[name="roomname"]').val('');
}


function on_form_submit_chat(event) {
    event.preventDefault();
    $message=$(this).find('[name="message"]');    
    server_send_message($message.val());
    /*socket.emit('send message', $message.val());*/
    $message.val('');
}


function on_click_join_room() {
    var room_id = $(this).attr('id');
    console.log(room_id);
    if(room_id=="Lobby") {
        alert('You cannot join Lobby.')
    }
    else {
    server_join_room( room_id, showRoom );
    }
}



function on_click_leave_room() {
    server_leave_room( i_left_room );   
}



