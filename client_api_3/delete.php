<?php 
    $id = $_REQUEST['id'];
    $con = mysqli_connect("localhost","root","","balaji_sir");
    $str = "DELETE FROM users WHERE id=$id";
    $result = mysqli_query($con,$str) or die(json_encode(["msg"=>"Not Delete","error"=>mysqli_error($con),"class"=>"danger"]));
    echo json_encode(["msg"=>"Deleted","error"=>"","class"=>"success"]);
?>