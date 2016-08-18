<?php include 'header.php'; ?>
<script src="../js/lobby.js"></script>
<!-- Lobby Area -->
<div id="lobby">
    <div id="lobby-menu">
        <h1>Lobby - <span class="username">username</span></h1>
        <button class="update-username">Update Username</button>
        <button class="create-room">Create Room</button>
        <button class="logout">Logout</button>
    </div>
    <div class="user-list" id="user-list"></div>

    <div id="lobby_form_username" class="form update-username">
        <form>
            <h4>Update Username</h4>
            <input name="username" placeholder="Input user name" />
            <input type="submit" value="Update">
        </form>
    </div>

    <div id="lobby_form_roomname" class="form create-room">
        <form>
            <h4>Create Room</h4>
            <input name="roomname" placeholder="Input room name to join" />
            <input type="submit" value="Create">
        </form>
    </div>





    <div class="chat">
        <h4>Lobby</h4>
        <div class="display" id='lobbyDisplay'></div>
        <form>
            <input name="message">
        </form>
    </div>


    <h4>Room List</h4>
    <div class="room-list" id="room-list"></div>

</div>
<?php include 'footer.php'; ?>