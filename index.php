<?php
	ini_set('display_errors', 1);
	ini_set('display_startup_errors', 1);
	error_reporting(E_ALL);
	
	require_once 'core/init.php';

//$user = DB::getInstance()->get('sallauka', array('emri', '>=', '0'));
//$user = DB::getInstance()->query("SELECT * FROM sallauka");
//$user = DB::getInstance()->delete('sallauka', array('id', '>', '20'));
//$user = DB::getInstance()->insert('sallauka', array(
//	"emri" => "Neko",
//	"email" => "nino@live.ml"
//));
//$user = DB::getInstance()->update('sallauka', 20, array(
//	"emri" => "Ali"
//));

//if (!$user->count()) {
//if (!$user) {
//	echo 'no-user';
//} else {
	//echo $user->first()->emri;
//	echo 'ok';
//}
//if (Session::exists('home')) {
//	echo Session::flash('home');
//}

//$user = new User();
//if ($user->isLoggedIn()) {

?>
<div class="index">
<?php
	if (Session::exists('home')) {
		echo '<h2>' . Session::flash('home') . '</h2>';
	}
?>
	<div class="format">
		<form action="register.php" method="post">
			<h3>Regjistrohu</h3>
			<div><input type="text" name="emri" placeholder="Emri" required><label></label></div>
			<div><input type="password" name="passwordi" placeholder="Passwordi" required><label></label></div>
			<div><input type="text" name="hint" placeholder="Hint - nese e harron passwordin" required><label></label></div>
			<button>Regjistrohu</button>
		</form>
		<form action="login.php" method="post">
			<h3>Hyr</h3>
			<div><input type="text" name="emr" placeholder="Emri" required><label></label></div>
			<div><input type="password" name="password" placeholder="Passwordi" required><label></label></div>
			<button>Hyr</button>
		</form>
	</div>
</div>