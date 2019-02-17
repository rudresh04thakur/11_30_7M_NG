<?php
    $data = json_decode(file_get_contents("php://input"));
    $con = mysqli_connect("localhost","root","","balaji_sir");
    
   
    if($data->email!="" && $data->password!=""){
        $str = "UPDATE users SET name='$data->name',
                                 mobile='$data->mobile',
                                 email='$data->email',
                                 password='$data->password',
                                 city='$data->city',
                                 state='$data->state',
                                 status='$data->status'
                                 WHERE id='$data->id'";
        $result = mysqli_query($con,$str) or
         die(json_encode(["msg"=>"Update not Done","error"=>mysqli_error($con),"class"=>"danger"]));

        echo json_encode(["msg"=>"Update Done","error"=>"","class"=>"success"]);
    }else{
        echo json_encode(["msg"=>"Update Not Done","error"=>"Empty Request","class"=>"danger"]);
    }

?>