var en = {};
$(function() {

    en.input_username( get_username() );
    entrance().find('form').submit(user_login);

});


en.input_username = function( username ) {
    entrance()
        .find('[name="username"]')
        .val( username );
};


/**
 *
 * @param event
 */
function user_login(event) {
    console.log('user_login');
    event.preventDefault();
    var $form = $(this);
    username = save_username( $form.find('[name="username"]').val() );
    server_update_username( username, function(username) {
        // console.log('name updated');
        // if ( entrance().isActive() ) enterLobby();
        location.href="lobby.php";
    });
    //$form.find('[name="username"]').val('');
    //formUserName().hide();//hide form
}