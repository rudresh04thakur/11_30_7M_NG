<?php
$root = "{$_SERVER['DOCUMENT_ROOT']}/client";

$pathLen = strlen($root);
myScanDir($root, 0, strlen($root)); 

function myScanDir($dir, $level, $rootLen, $parentArr = '', $workspaceKey = '')
{ 
	global $pathLen; 
	// if($level == 0){
	// 	$parentArr = create_space($dir);
	// 	$workspaceKey = $parentArr;
	// }
	// if($level == 1){
	// 	$parentArr = create_page($dir, $parentArr);
	// 	//$_SESSION['child_key'] = $parentArr;
   
	// }
	// if($level >= 2){
	// 	$parentArr = create_page_child($dir, $parentArr, $workspaceKey);
	// //	$_SESSION['child_key'] = $parentArr;		
	// }

	if ($handle = opendir($dir)) {
		$dirIdArray = array();
		$allFiles = array();
	    while (false !== ($entry = readdir($handle))) {
	      if ($entry != "." && $entry != "..") {
	        if (is_dir($dir . "/" . $entry))
	        {
	          $allFiles[] = "" . $dir . "/" . $entry;
	        }
	        else
	        {
	          $allFiles[] = "" . $dir . "/" . $entry;
	        }
	      }
		}
		echo "<pre>";
		print_r($allFiles);
	    closedir($handle);

	    //natsort($allFiles);
	    foreach($allFiles as $value)
	    {
	     	$displayName = substr($value, $rootLen + 4);
	       	$fileName    = substr($value, 3);
	       	$linkName    = str_replace(" ", "%20", substr($value, $pathLen + 3));
	     
	       	// echo file_get_contents("http://localhost/car/carinventory".$linkName);
	       
	        if (is_dir($fileName)) { 
	      		preg_match("/[^\/]+$/", $fileName, $matches);
				$match_key = $matches[0]; 
				myScanDir($fileName, $level + 1, strlen($fileName), $parentArr, $workspaceKey); 

		    } else {
	      		create_attachment( $linkName , $displayName  , $level , $fileName , $parentArr );
      		}
	    }
	}
}
function create_space($dir)
{
	preg_match("/[^\/]+$/", $dir, $matches);
	$space_key = $matches[0]; 
	
	// create request to add space in confluence 
	$request = array (
		"key"=> $space_key, 
	    "name"=>$space_key,
	    "type"=>"global", 
	    "description"=>array(
	                    "plain"=>array
	                        (
	                            "value"=> "Neosoft Space for neo",
	                            "representation"=>"plain"
	                        )
	                    )
	);
	$qbody = json_encode($request);
	//$qbody = file_get_contents("php://input");
    $ch = curl_init();

    curl_setopt($ch, CURLOPT_URL, "http://localhost:8090/rest/api/space/");
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $qbody);
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_USERPWD, "admin" . ":" . "Abc@1234");

    $headers = array();
    $headers[] = "Content-Type: application/json";
    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

    $result = curl_exec($ch);
    if (curl_errno($ch)) {
        echo 'Error:' . curl_error($ch);die;
    }
    curl_close ($ch);
    $resultSpace = json_decode($result);
    return $resultSpace->key;
}

function create_page($fileName, $parentArr)
{
	preg_match("/[^\/]+$/", $fileName, $matches);
	$match_key = $matches[0]; 
 	$page = array(
        "type"=>"page",
        "title"=>$match_key,
        "space"=>array("key"=>$parentArr),
        "body"=>array(
                "storage"=>array(
                "value"=>"<p>This is a new page</p>",
                "representation"=>"storage"
             )
        )
    );
    $qbody = json_encode($page);	
    $ch = curl_init();

    curl_setopt($ch, CURLOPT_URL, "http://localhost:8090/rest/api/content/");
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $qbody);
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_USERPWD, "admin" . ":" . "Abc@1234");

    $headers = array();
    $headers[] = "Content-Type: application/json";
    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

    $result = curl_exec($ch);
    if (curl_errno($ch)) {
        echo 'Error:' . curl_error($ch);
    }
    curl_close ($ch);
    $result = json_decode($result);
    	//echo "</br>"."fileName ".$match_key."</br>ID : ".$result->id."</br>Parent key :".$parentArr;
 
    return $result->id;
}
function create_page_child($fileName, $parentArr, $workspaceKey)
{
	$flag = 0;
	preg_match("/[^\/]+$/", $fileName, $matches);
	$match_key = $matches[0]; 
	$requestChild = array (
        "type"=>"page",
        "title"=>$match_key,
        "ancestors"=>
            [
                array("id"=>$parentArr)
            ],
            "space"=>
            array(
                "key"=>$workspaceKey
            ),
            "body"=>
            array(
                "storage"=>
                array(
                    "value"=>"<p>This is a new child page</p>","representation"=>"storage"
                )
            )           
    );
    $qbodyChild = json_encode($requestChild);
	$ch = curl_init();

	curl_setopt($ch, CURLOPT_URL, "http://localhost:8090/rest/api/content/");
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
	curl_setopt($ch, CURLOPT_POSTFIELDS, $qbodyChild);
	curl_setopt($ch, CURLOPT_POST, 1);
	curl_setopt($ch, CURLOPT_USERPWD, "admin" . ":" . "Abc@1234");

	$headers = array();
	$headers[] = "Content-Type: application/json";
	curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

	$result = curl_exec($ch);
	if (curl_errno($ch)) {
	echo 'Error:' . curl_error($ch);
	}
	curl_close ($ch);
	$result = json_decode($result);
	
	return $result->id;
}
function create_attachment($linkName , $displayName  , $level , $fileName , $parentArr  ){
	echo "filename: " .$fileName."</br>key : ".$_SESSION['child_key']."</br>";
	//create_page($fileName,$_SESSION['child_key'],$_SESSION['workspaceKey']);
	/*echo  
        "linkname: 			".$linkName ."<br>\n".
        "Display name: 		".$displayName ."<br>\n".
        "level: 			".$level ."<br>\n".
        "fileName: 			".$fileName."<br>\n".
        "child_key: 		".$_SESSION['child_key']."<br>\n";*/
}
?>