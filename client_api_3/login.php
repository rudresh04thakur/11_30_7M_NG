<?php 
    session_start();
    $timeout = 60; // Number of seconds until it times out.
    
    $data = json_decode(file_get_contents('php://input'));
    $con = mysqli_connect("localhost","root","","balaji_sir");
    $str = "SELECT * FROM users WHERE email = '$data->email' and password='$data->password' and status='0'";
    $result = mysqli_query($con,$str) or die(json_encode(["life"=>"false","user"=>$_SESSION['user']]));
   
    
    if(mysqli_num_rows($result)){
        $_SESSION['user'] = mysqli_fetch_assoc($result);
        $_SESSION['timeout'] = $timeout;
        echo json_encode(["life"=>"true","user"=>$_SESSION['user'],"session_id"=>session_id()]);
    }else{
        $_SESSION['user'] = null;
        echo json_encode(["life"=>"false","user"=>$_SESSION['user']]);
    }
?>