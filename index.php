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
    <link href="css/index.css" rel="stylesheet">
    <link href="css/style.css" rel="stylesheet">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css">
    <script>
        var socket_server_url = '<?php echo $socket_server_url?>';
    </script>

    <script src="js/jquery-2.2.3.min.js"></script>
    <script src="js/underscore-min.js"></script>
    <script src="js/underscore.string.min.js"></script>
    <script src="etc/bootstrap-v4-alpha3/js/tether.min.js"></script>
    <script src="etc/bootstrap-v4-alpha3/js/bootstrap.min.js"></script>
    <script src="<?php echo $socket_server_url?>socket.io/socket.io.js"></script>
    <script src="js/function.js"></script>
    <script src="js/lockr.js"></script>
    <script src="RTCMultiConnection/dist/rmc3.min.js"></script>
    <script src="js/video-center-3.2-client.js"></script>
</head>
<body>


<!-- Header -->
<nav class="navbar navbar-light bg-faded nav-header">
   <span class="logo">Video English</span>
</nav>

<!-- Content -->
<div class="container">
        <!-- Entrance -->
        <div class="row" id="entrance">
            <div class="col-md-6">
                <form id="usersForm">
                    <input name="username" class="form-control" placeholder="Input Username" id="username"/>
                    <input id="username-submit"type="submit" class="btn btn-success mzbutton" value="Enter Vide Center" />
                </form>
            </div>
            <div class="col-md-6">

                <div class="title">
                    Video Center Guidelines
                </div>
                <div class="center">
                    <div>-Vivamus bibendum elit non mollis egestas.</div>
                    <div>-Nam molestie, purus a malesuada</div>
                    <div>-hendrerit, nulla odio congue magna, at</div>
                    <div>-volutpat justo urna vel velit. Duis nunc</div>
                    <div>-velit, commodo at risus nec, commodo</div>
                    <div>-tincidunt diam. Nulla quis felis justo. Etiam</div>
                    <div>-eleifend gravida orci, nec faucibus mauris</div>
                    <div>-eget. Sed laoreet augue erat, vel volutpat</div>
                    <div>-massa euismod et. Fusce eu sapien iaculis, s</div>
                    <div>-celerisque tortor et, fermentum quam.</div>
                </div>
            </div>
        </div>
        <!-- Lobby Area -->
        <div id="lobbyArea">            
            <div class="row text-xs-center" id="lobby-menu">
                    <h1>Lobby</h1>
                    <button class="btn btn-info" id="btnUpdateUsername">Update Username</button>
                    <button class="btn btn-info" id="btnCreateRoom">Create Room</button>
                    <button class="btn btn-info" id="btnLogout">Logout</button>
            </div>
            <div class="row" id="lobby-menu-content">
                <div class="menu-username " id="menu-username">
                <div class="col-md-4"></div>
                <div class="col-md-4">
                    <form id="menuFormUsername" class="panel panel-info menu-content">
                    <h4>Update Username</h4>
                        <input class="form-control " name="updateUsername" id="updateUsername" size="10" placeholder="Input user name" />
                        <input id="btnUpdateName" class="btn btn-success" type="submit" value="Update">    
                    </form>
                </div>
                <div class="col-md-4"></div>                    
                </div>
                <div class="menu-room" id="menu-room">
                <div class="col-md-4"></div>
                <div class="col-md-4">
                    <form id="menuFormRoom" class="panel panel-info menu-content">
                    <h4>Create Room</h4>
                        <input class="form-control " name="createRoom" id="createRoom" size="10" placeholder="Input room name to join" />
                        <input class="btn btn-success" type="submit" value="Update">    
                    </form>
                </div>
                <div class="col-md-4"></div>
                </div>
            </div>
            <div class="row text-xs-center">
                <h4>Room List</h4>              
            </div>
            <div class="row">
                <div class="col-md-4"></div>
                <div class="col-md-4">
                    <!-- <div class="card card-outline-info text-xs-center " id="rooms">   -->
                    <!-- List of room -->                     
                    <!-- </div> -->
                    <div class="rooms" id="rooms">  
                    <!-- List of room -->                     
                    </div>
                </div>
                <div class="col-md-4"></div>
            </div>
        </div>
        <!-- Chat Area -->
        <div id="messageArea" class="row">
            
            <div class="col-md-8">
                <div class="panel panel-info fiftypercent">
                    <div class="panel-body" ><h3 id="roomname" class="roomnamechat">Room</h3></div>
                </div>
                
                <div class="messages mzstyle" id="chat">You have entered a room</div>

                <form id="messageForm">
                    <div class="form-group">
                        <label>Enter Messages</label>
                        <input class="form-control" id="message">
                        <br />

                        <input type="submit" class="btn btn-info" value="Send Message" />
                    </div>
                </form>
            </div>
        </div>
</div><!-- Content -->

<!-- Footer -->
<nav class="navbar navbar-fixed-bottom navbar-light nav-footer ">
    <h4>Copyright</h4>
</nav>

</body>
</html>
