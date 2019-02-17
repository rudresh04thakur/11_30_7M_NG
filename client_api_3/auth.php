<?php
session_start();

$rawBody = file_get_contents("php://input"); // Read body


if($rawBody != "") { //if post data is present
require("users.php");
if(sizeof($users) > 0) {
	$user_list = json_decode($users);
}

	$data = json_decode($rawBody);
	$user = $data->user; //
	$pass = $data->pass;
	$auth = false;
	foreach($user_list as $u) {
		if($u->user == $user && $u->pass == $pass) {
			echo '{"user":"'.$user.'", "auth":"1"}';
			$_SESSION['auth'] = 1;
			$_SESSION['user'] = $user;
			$auth = true;
			break;
		}
	}
	if(!$auth) {
		echo '{"user":"'.$user.'", "auth":"1"}';
		$_SESSION['auth'] = 0;
		$_SESSION['user'] = 'none';
	}
} else {
	if($_SESSION['auth'] == 0) {
		echo '{"user":"none", "auth":"0"}';
	} else {
		echo '{"user":"'.$_SESSION['user'].'", "auth":"'.$_SESSION['auth'].'"}';
	}
}
?>