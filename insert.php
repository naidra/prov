<?php
	require_once 'core/init.php';
	
	if (Input::exists()) {

		$user = new User();
		$emriTabeles = $user->data()->emri;

		date_default_timezone_set('Europe/Zagreb');
		$tt = DB::getInstance()->get($emriTabeles, array('tregimi', '=', Input::get('tregimi')));
		
		if (!$tt->count()) {
			$insert = DB::getInstance()->insert($emriTabeles, array(
				"tregimi" => Input::get('tregimi'),
				"data" => date('Y-m-d H:i:s')
			));
			Session::flash('home', 'Ne rregull.');
		} else {
			Session::flash('home', 'Nuk është në rregull.');

		}
		Redirect::to('into.php');

	}