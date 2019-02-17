<?php 
    $con = mysqli_connect("localhost","root","","balaji_sir");
    $str = "SELECT * FROM users where status='0'";
    $result = mysqli_query($con,$str);
    $ar = [];
    while($row = mysqli_fetch_assoc($result)){
        array_push($ar,$row);
    }
    echo json_encode($ar);
?>