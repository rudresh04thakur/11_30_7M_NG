<?php
    $data = json_decode(file_get_contents("php://input"));
    if($data->email!=""){
        $str = "insert into users(name,email,mobile,city,state,password)values('$data->name','$data->email','$data->mobile','$data->city','$data->state','$data->password')";
        $con = mysqli_connect("localhost","root","","balaji_sir");
        $result = mysqli_query($con,$str) or die("Register Unsuccessful");
        echo json_encode(["msg"=>"Register Successful"]);
    }
?>