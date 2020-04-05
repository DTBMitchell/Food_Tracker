<?php
    // Allow from any origin
    if (isset($_SERVER['HTTP_ORIGIN'])) {
        header("Access-Control-Allow-Origin: *");
        header('Access-Control-Allow-Credentials: true');
        header('Access-Control-Max-Age: 86400');    // cache for 1 day
    }

    // Access-Control headers are received during OPTIONS requests
    if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {

        if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
            header("Access-Control-Allow-Methods: GET, POST, OPTIONS");         

        if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
            header("Access-Control-Allow-Headers:        GET, POST, OPTIONS");

        exit(0);
    }


    define('DB_HOST', 'localhost');
    define('DB_USER', 'root');
    define('DB_PASS', '');
    define('DB_NAME', 'food_tracker');

    function connect(){
        $connect = mysqli_connect(DB_HOST, DB_USER, DB_PASS, DB_NAME);

        if(mysqli_connect_errno($connect)){
            die("Failed to connect: " . mysqli_connect_error());
        }

        mysqli_set_charset($connect, "utf8");

        return $connect;
    }

    function connectAuth(){
        $connect = mysqli_connect('localhost', DB_USER, DB_PASS, 'lemon_auth');

        if(mysqli_connect_errno($connect)){
            die("Failed to connect: " . mysqli_connect_error());
        }

        mysqli_set_charset($connect, "utf8");

        return $connect;
    }

    function fetchServerKey(){
        $sql = "SELECT `server_key`, `expiration`, CURRENT_TIMESTAMP() AS `timestamp` FROM `server_keys` WHERE `start` < NOW() && `expiration` > NOW()";
            if($result = mysqli_query(connectAuth(), $sql)){
                //Fetch Results
                $row = mysqli_fetch_assoc($result);
                return $row['server_key'];
              }else{
                return null;
            }
    }

    function decodeID($req){
        return (JWT::decode($req->id_token, fetchServerKey())->id);
    }

    function getTrackerID($request){
        $id = decodeID($request);
        $sql = "SELECT `tracker_id` FROM `auth_connector` WHERE `auth_connector`.`auth_id` = '{$id}'";

        if($result = mysqli_query(connect(), $sql)){
            return mysqli_fetch_assoc($result)['tracker_id'];
        }else{
            return null;
        }
    }

?>