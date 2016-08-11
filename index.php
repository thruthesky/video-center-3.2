<?php
/**
 * @file index.php
 */

/**
 * Configuration
 */
$socket_server_url = 'http://localhost:9001/';

?>
<!doctype html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    <link href="etc/bootstrap-v4-alpha3/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css">
    <link href="css/index.css" rel="stylesheet">
    <style>
    .display {
        overflow: hidden;
        overflow-y: scroll;
        height: 100px;
        background-color: #efefef;        
    }
    </style>
    <script>
        var socket_server_url = '<?php echo $socket_server_url?>';
    </script>

    <script src="js/jquery-3.1.0.min.js"></script>
    <script src="js/underscore-min.js"></script>
    <script src="js/underscore.string.min.js"></script>
    <script src="etc/bootstrap-v4-alpha3/js/tether.min.js"></script>
    <script src="etc/bootstrap-v4-alpha3/js/bootstrap.min.js"></script>

    <script src="<?php echo $socket_server_url?>socket.io/socket.io.js"></script>


    <script>
        if ( typeof io == 'undefined' ) alert("Socket.IO is not loaded. Please check the socket io server.");
    </script>



    <script src="js/function.js"></script>
    <script src="js/lockr.js"></script>
    <script src="RTCMultiConnection/dist/rmc3.min.js"></script>



    <script src="js/init.js"></script>
    <script src="js/dom-navigator.js"></script>
    <script src="js/dom-event-handler.js"></script>
    <script src="js/markup.js"></script>
    <script src="js/lobby.js"></script>
    <script src="js/action.js"></script>
    <script src="js/element.js"></script>
    <script src="js/video-center-3.2-client.js"></script>
    <script src="js/socket-event.js"></script>
    <script src="js/callback.js"></script>

</head>
<body>


<!-- Header -->
<nav class="navbar navbar-light bg-faded nav-header">
   <span class="logo">Video English</span>
</nav>



<div id="entrance">
    <form id="usernameform">
        <input name="username" placeholder="Input Username"/>
        <input type="submit" value="Update Name" />
    </form>
    <div class="user-list"></div>
</div>



<!-- Lobby Area -->
<div id="lobby">
    <div id="lobby-menu">
        <h1>Lobby - <span class="username">username</span></h1>
        <button class="update-username">Update Username</button>
        <button class="create-room">Create Room</button>
        <button class="logout">Logout</button>
    </div>
    <div class="user-list"></div>

    <div class="form update-username">
        <form>
            <h4>Update Username</h4>
            <input name="username" placeholder="Input user name" />
            <input type="submit" value="Update">
        </form>
    </div>

    <div class="form create-room">
        <form>
            <h4>Create Room</h4>
            <input name="roomname" placeholder="Input room name to join" />
            <input type="submit" value="Create">
        </form>
    </div>





    <div class="chat">
        <div class="display" id='lobbyDisplay'></div>
        <form>
            <input name="message">
        </form>
    </div>


    <h4>Room List</h4>
    <div id="room-list"></div>

</div>


<div id="room">
    <h2 class="roomname">Room Name</h2>
    <div class="chat">
        <div class="display" id="display"></div>
        <form>
            <input name="message">
        </form>
    </div>
    <button type="button" class="room-leave">Leave</button>
</div>

<!-- Footer -->
<nav class="navbar navbar-fixed-bottom navbar-light nav-footer ">
    <h4>Copyright</h4>
</nav>

</body>
</html>
