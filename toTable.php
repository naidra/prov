<?php
/* Attempt MySQL server connection. Assuming you are running MySQL
server with default setting (user 'root' with no password) */
$link = mysqli_connect("sql210.ezyro.com", "ezyro_19769330", "robocop1", "ezyro_19769330_ardi");
 
// Check connection
if($link === false){
    die("ERROR: Could not connect. " . mysqli_connect_error());
}
 
// Escape user inputs for security
$gjinia = $_POST['gjinia'];
$komenti = $_POST['komenti'];

 
// attempt insert query execution
$sql = "INSERT INTO komentet VALUES (null, '$gjinia', '$komenti')";
if(mysqli_query($link, $sql)){
    echo "Komenti u dergua";
} else{
    echo "Diqka Gabim";
}
 
// close connection
mysqli_close($link);
?>