<?php
	
	$conn = mysqli_connect("sql210.ezyro.com", "ezyro_19769330", "robocop1", "ezyro_19769330_ardi");

	// Check connection
	if (!$conn) {
		die("Connection failed: " . mysqli_connect_error());
	}
	
	$sql = "SELECT * FROM images ORDER BY id DESC";
	$result = $conn->query($sql);


	$to_encode = array();
	while($row = mysqli_fetch_assoc($result)) {
	  $to_encode[] = $row;
	}
	echo json_encode($to_encode);
	mysqli_close($conn);
?>