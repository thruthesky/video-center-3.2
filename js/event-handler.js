///////////////////////////////////////////////////
//
// Event Handlers
//
///////////////////////////////////////////////////

/**
 *
 * @deprecated
 * @param event
 */
function on_form_submit_username(event) {
    console.log('on_username_form_submit');
    event.preventDefault();
    var $form = $(this);
    username = save_username( $form.find('[name="username"]').val() );
    server_update_username( username, function(username) {
            console.log('name updated');
            if ( entrance().isActive() ) enterLobby();
    });
    $form.find('[name="username"]').val('');
    formUserName().hide();//hide form
}

function on_form_submit_create_room(event) {
    event.preventDefault();
    roomnameform = $(this).find('[name="roomname"]').val();    
    console.log('on_form_submit_create_room');
    server_create_room(roomnameform, enterRoom);
    $(this).find('[name="roomname"]').val('');
    formRoomName().hide();//hide form
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



