<?php
	require_once 'core/init.php';
?>
<div class="into">
<?php


	$user = new User();

	if (!$user->isLoggedIn()) {
		Redirect::to('index.php');
	} else {
		if (Session::exists('home')) {
			echo '<h2>' . Session::flash('home') . '</h2>';
		}

		$emriTabeles = $user->data()->emri;
		echo "<a href='logout.php'>Dilni <span>{$emriTabeles}</span></a>";
?>

<div>
	<form action="insert.php" method="post">
		<textarea name="tregimi" required></textarea>
		<button>Fut tregimin për diten</button>
	</form>
	<form action="delete.php" method="post">
		<p>Fshije ndonjë ditë</p>
		<input type="number" name="fshij">
		<button>Fshije</button>
	</form>
</div>
<div class="results">
<?php

	$conn = mysqli_connect(Config::get('mysql/host'), Config::get('mysql/username'), Config::get('mysql/password'), Config::get('mysql/db'));

	// Check connection
	if (!$conn) {
		die("Connection failed: " . mysqli_connect_error());
	}
	
	$sql = "SELECT * FROM $emriTabeles ORDER BY id DESC";
	$result = $conn->query($sql);

	if ($result->num_rows > 0) {
	    // output data of each row
	    while($row = $result->fetch_assoc()) {
			echo '<div><p>' . $row['id'] . '</p><p>' . $row['tregimi'] . '</p><p>' . $row['data'] . '</p></div>';
		}
	}
	if ($result->num_rows > 6) echo '<button>Më shumë</button>';
	mysqli_close($conn);
}
?>
	</div>
</div>