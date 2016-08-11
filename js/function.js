
function getRandomString() {
    if (window.crypto && window.crypto.getRandomValues && navigator.userAgent.indexOf('Safari') === -1) {
        var a = window.crypto.getRandomValues(new Uint32Array(3)),
            token = '';
        for (var i = 0, l = a.length; i < l; i++) {
            token += a[i].toString(36);
        }
        return token;
    } else {
        return (Math.random() * new Date().getTime()).toString(36).replace(/\./g, '');
    }
}
function save_username( username ) {
    if ( username == "" ) {
        alert('username is empty');
    }
    else {
        db.set(const_username, username);
    }
    return username;
}

function delete_username( ) {
    db.set(const_username, '');
}
function get_username() {
    return db.get( const_username );
}

function save_roomname( roomname ) {
    if ( roomname == "" ) {
        alert('roomname is empty');
    }
    else {
        db.set(const_roomname, roomname);
    }
    return roomname;
}

function delete_roomname( ) {
    db.set(const_roomname, '');
}
function get_roomname() {
    return db.get( const_roomname );
}
