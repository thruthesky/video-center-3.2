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



<nav class="navbar navbar-light bg-faded">
    <a class="navbar-brand" href="#">Video Center</a>
    <ul class="nav navbar-nav">
        <li class="nav-item active">
            <a class="nav-link" href="#">Lobby <span class="sr-only">(current)</span></a>
        </li>
        <li class="nav-item">
            <a class="nav-link" href="#">Login</a>
        </li>
        <li class="nav-item">
            <a class="nav-link" href="#">Settings</a>
        </li>
        <li class="nav-item">
            <a class="nav-link" href="#">About</a>
        </li>
    </ul>
</nav>


<section id="command">
    <button class="user-information btn btn-secondary" type="button">User Information</button>
    <button type="button">Create a Room</button>
</section>

<form>
    Set Username: <input name="username"><button class="set-username" type="button">Update</button>
</form>



<section class="user-list">

</section>

<nav class="navbar navbar-fixed-bottom navbar-light bg-faded">
    <a class="navbar-brand" href="#">Copyright</a>
</nav>

</body>
</html>
