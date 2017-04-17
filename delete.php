<?php
	require_once 'core/init.php';
	
	if (Input::exists()) {

		$user = new User();
		$emriTabeles = $user->data()->emri;

		date_default_timezone_set('Europe/Zagreb');
		$tt = DB::getInstance()->get($emriTabeles, array('id', '=', Input::get('fshij')));
		
		if ($tt->count()) {
			DB::getInstance()->delete($emriTabeles, array(
				'id', '=', Input::get('fshij')
			));
			Session::flash('home', 'Ne rregull.');
		} else {
			Session::flash('home', 'Nuk është në rregull.');

		}
		Redirect::to('into.php');

	}