<?php
    $data = json_decode(file_get_contents("php://input"));
    $arr=[];
    $con = mysqli_connect("localhost","root","","gbl_10_30");
        $str = "SELECT city_name from cities GROUP BY city_name";
        $result = mysqli_query($con,$str) or
         die(json_encode(["msg"=>"Fetch Not Done","error"=>mysqli_error($con),"class"=>"danger"]));
         while($row=mysqli_fetch_array($result)){
            array_push($arr,$row);
        }
         echo json_encode($arr);
   

?>