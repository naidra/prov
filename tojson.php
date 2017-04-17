<?php

	require_once 'core/init.php';

	$user = new User();

	if (!$user->isLoggedIn()) {
		Redirect::to('index.php');
	} else {

		$emriTabeles = $user->data()->emri;
		$get = DB::getInstance()->get($emriTabeles,  array('id', '>=', '0'));
		$to_encode = array();

		foreach ($get->results() as $row) {
			$to_encode[] = $row;
		}
		echo json_encode($to_encode);

	}
?>