<?php
require_once 'core/init.php';

Session::delete(Config::get('session/session_name'));
Session::flash('home', 'Tani keni dalë.');

Redirect::to('index.php');