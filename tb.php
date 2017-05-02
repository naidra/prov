<?php
/* Attempt MySQL server connection. Assuming you are running MySQL
server with default setting (user 'root' with no password) */
$link = mysqli_connect("sql210.ezyro.com", "ezyro_19769330", "robocop1", "ezyro_19769330_ardi");
 
// Check connection
if($link === false){
    die("ERROR: Could not connect. " . mysqli_connect_error());
}
 
$sql = "SELECT id, gjinia, komenti FROM komentet";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // output data of each row
    while($row = $result->fetch_assoc()) {
        echo "id: " . $row["id"]. " - Name: " . $row["komenti"]. "<br>";
    }
} else {
    echo "0 results";
}
 
// close connection
mysqli_close($link);
?>