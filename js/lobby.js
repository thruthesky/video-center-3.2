$(function(){
    formUserName();
    formRoomName();
    lobby()
        .getUserList()
        .getRoomList()
        .updateUsername( username );
});

