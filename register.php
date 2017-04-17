<?php
	ini_set('display_errors', 1);
	ini_set('display_startup_errors', 1);
	error_reporting(E_ALL);

	require_once 'core/init.php';

	if (Input::exists()) {
		//Session::flash('success', 'You registered successfully!');
		//echo date('Y-m-d H:i:s');
		$user = new User();
		$salt = Hash::salt(32);
		$emri = Input::get('emri');
		$db = DB::getInstance()->pdo();
		date_default_timezone_set('Europe/Zagreb');

		try {

			$check = $user->find(Input::get('emri'));

			if (!$check) {
			    $sql = "CREATE TABLE $emri (
				    id INT(8) AUTO_INCREMENT PRIMARY KEY,
				    tregimi VARCHAR(400) NOT NULL,
				    data DATETIME
				    )";
			    // use exec() because no results are returned
			    $db->exec($sql);

				$user->create(array(
					'emri' => Input::get('emri'),
					'password' => Hash::make(Input::get('passwordi'), $salt),
					'hint' => Input::get('hint'),
					'salt' => $salt,
					'data' => date('Y-m-d H:i:s')
				));

				Session::flash('home', 'Jeni regjistruar tani mund te hyni.');
				Redirect::to('index.php');
			} else {
				Session::flash('home', 'Provoni emer tjetër, emri juaj eshte zënë.');
				Redirect::to('index.php');
			}

		} catch (Exception $e) {
			die($e->getMessage());
		}
				
	}

?>