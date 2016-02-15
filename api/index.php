<?php
$cmd = $_POST["cmd"];

if ($cmd == "login") {
	$username = $_POST["username"];
	$password = $_POST["password"];

	if ($username == "root" && $password == "root") {
		$json = [
				"status" => 200,
				"message" => "Logged in!"
			];
	} else {
		$json = [
				"status" => 404,
				"message" => "Invalid username or password"
			];
	}

	die(json_encode($json));
}

$json = [
	"status" => 404,
	"message" => "Invalid command"
];
die(json_encode($json));
