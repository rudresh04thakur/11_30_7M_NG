<?php 
    $data = file_get_contents('php://input');
    session_id($data);
    session_start();
     if(isset($_SESSION['user']) && $_SESSION['user']!=null){
         $timeout = $_SESSION['timeout'];
         $duration = time() - $_SESSION['timeout'];
            echo $duration;
         $_SESSION['timeout'] = time();
         if($duration > $timeout) {
            // Destroy the session and restart it.
             session_destroy();
             session_start();
         }
         echo "true";
     }else{
        echo "false";

     }
    ?>
