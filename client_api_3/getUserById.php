<?php 
    $id = $_REQUEST['id'];
	$arr=[];
    $con = mysqli_connect("localhost","root","","balaji_sir");
    $str = "SELECT * FROM users WHERE id=$id";
    $result = mysqli_query($con,$str);
	while($row = mysqli_fetch_assoc($result)){
		array_push($arr,$row);
	}
    echo json_encode($arr);
?>