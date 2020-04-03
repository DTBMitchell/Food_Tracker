<?php 
    /**
     * Simple User manipulation
    */

require 'PavDatabase.php';
require 'JWT.php';

$operation = $_GET['op'];
//Get Posted Data
$postdata = file_get_contents("php://input");

if(isset($postdata) && !empty($postdata)){
    //Extract el post data
    $request = json_decode($postdata);
}

switch($operation){
    case 'new':
        linkNewLemonUser($request);
    break;
}


function linkNewLemonUser($request){
    $id = decodeID($request);

    $sql = "INSERT INTO `auth_connector` (`auth_id`, `auth_service`) VALUES ('{$id}', 'LemonAuth');";

    if($result = mysqli_query(connect(), $sql)){

        echo json_encode([
            'Results:' => 'Success'
        ]);

    }else{
        echo json_encode([
            'Results:' => 'Failed'
        ]);
    }
}





?>