<?php
	ini_set('display_errors', 1);
	ini_set('display_startup_errors', 1);
	error_reporting(E_ALL);

	require_once 'core/init.php';


	if (Input::exists()) {

		$user = new User();

		$login = $user->login(Input::get('emr'), Input::get('password'), false);

		if ($login) {
			Session::flash('home', 'Tani keni hyrë.');
			Redirect::to('into.php');
		} else {
			Session::flash('home', 'Gabim emri ose passwordi');
			Redirect::to('index.php');
		}

	}
?>