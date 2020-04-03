<?php 

    require 'AuthDatabase.php';
    require 'JWT.php';

    if($_GET != null){
        $operation = $_GET['op'];
    }else{
        http_response_code(404);
        error_reporting(E_ALL ^ E_NOTICE);  
        echo 'Page Not Found';
    }
    //Get Posted Data
    $postdata = file_get_contents("php://input");
    
    if(isset($postdata) && !empty($postdata)){
        //Extract el post data
        $request = json_decode($postdata);
    }else if($operation='all'){}
    else{
        http_response_code(404);
        error_reporting(E_ALL ^ E_NOTICE);  
        echo 'Page Not Found';
    }

    switch($operation){
    /*******  GOALS  *********/
        case 'post-goal':
            insertNewGoal($request);
        break;
        
        case 'get-goals':
            getUserGoals($request);
        break;

        case 'get-last-goal':
            getLatestUserGoal($request);
        break;
    /*******  WEIGHTS  ********/
        case 'post-weight':
            insertNewWeight($request);
        break;

        case 'get-weights':
            getUserWeights($request);
        break;

        case 'get-last-weight':
            getLatestUserWeight($request);
        break;

        default:
        return http_response_code(404);
    }


    function insertNewGoal($request){
        $trackerID = getTrackerID($request);
            
        $sql = "INSERT INTO `weight_goals` (`goal_id`, `tracker_id`, `goal_weight`, `date_set`) VALUES (NULL, {$trackerID}, '167.5', CURRENT_TIMESTAMP); ";
        
        if($result = mysqli_query(connect(), $sql)){
            echo json_encode([
                'Results:' => 'Success'
            ]);
        }else{
            echo json_encode([
                'Results:' => 'Failure'
            ]);
        }
    }

    function getUserGoals($request){
        $trackerID = getTrackerID($request);
        $goals = [];
        $sql = "SELECT `goal_weight`, `date_set` FROM `weight_goals` WHERE `tracker_id` = {$trackerID}";

        if($result = mysqli_query(connectAuth(), $sql)){
            $i=0;
            while($row = mysqli_fetch_assoc($result)){
                $goals[$i]['goal_weight'] = $row['goal_weight'];
                $goals[$i]['date_set'] = $row['date_set'];              

                $i++;
            }

            echo json_encode($goals);
        }else{
            http_response_code(404);
        }
    }

    function getLatestUserGoal($request){
        $trackerID = getTrackerID($request);
        $sql = "SELECT `goal_weight`, `date_set` FROM `weight_goals` WHERE `tracker_id` = {$trackerID} ORDER BY `date_set` DESC LIMIT 1";

        if($result = mysqli_query(connectAuth(), $sql)){
            $row = mysqli_fetch_assoc($result);
            echo json_encode(array(
                'goal_weight' => $row['goal_weight'],
                'date_set' => $row['date_set']
            ));

        }else{
            echo json_encode([
                'Results:' => 'Failure'
            ]);
        }
    }

    /*************************************************************************************/


    function insertNewWeight($request){
        $trackerID = getTrackerID($request);
            
        $sql = "INSERT INTO `weight_diary` (`diary_id`, `tracker_id`, `weight`, `date`) VALUES (NULL, {$trackerID}, '167.9', CURRENT_TIMESTAMP);";
        
        if($result = mysqli_query(connect(), $sql)){
            echo json_encode([
                'Results:' => 'Success'
            ]);
        }else{
            echo json_encode([
                'Results:' => 'Failure'
            ]);
        }
    }

    function getUserWeights($request){
        $trackerID = getTrackerID($request);
        $goals = [];
        $sql = "SELECT `weight`, `date` FROM `weight_diary` WHERE `tracker_id` = {$trackerID}";

        if($result = mysqli_query(connectAuth(), $sql)){
            $i=0;
            while($row = mysqli_fetch_assoc($result)){
                $goals[$i]['weight'] = $row['weight'];
                $goals[$i]['date'] = $row['date'];              

                $i++;
            }

            echo json_encode($goals);
        }else{
            http_response_code(404);
        }
    }

    function getLatestUserWeight($request){
        $trackerID = getTrackerID($request);
        $sql = "SELECT `weight`, `date` FROM `weight_diary` WHERE `tracker_id` = {$trackerID} ORDER BY `date` DESC LIMIT 1";

        if($result = mysqli_query(connectAuth(), $sql)){
            $row = mysqli_fetch_assoc($result);
            echo json_encode(array(
                'weight' => $row['weight'],
                'date' => $row['date']
            ));

        }else{
            echo json_encode([
                'Results:' => 'Failure'
            ]);
        }
    }

?>