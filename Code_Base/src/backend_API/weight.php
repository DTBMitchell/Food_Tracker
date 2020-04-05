<?php 

    require 'PavDatabase.php';
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
        http_response_code(403);
        error_reporting(E_ALL ^ E_NOTICE);  
        echo 'Page Forbidden';
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
            
        $sql = "INSERT INTO `weight_goals` (`goal_id`, `tracker_id`, `goal_weight`, `date_set`) VALUES (NULL, '{$trackerID}', '{$request->goal_weight}', CURRENT_TIMESTAMP); ";
        
        if($result = mysqli_query(connect(), $sql)){
            $row = queryLatestUserGoal($trackerID);
            echo json_encode([
                'goal_id' => $row['goal_id'],
                'goal_weight' => $row['goal_weight'],
                'date_set' => $row['date_set']
            ]);
        }else{
            echo json_encode([
                'Results:' => 'Failure',
                'tracker_id' => $trackerID,
                'goal_weight' => $request->goal_weight
            ]);
        }
    }

    function getUserGoals($request){
        $trackerID = getTrackerID($request);
        $goals = [];
        $sql = "SELECT `goal_id`, `goal_weight`, `date_set` FROM `weight_goals` WHERE `tracker_id` = '{$trackerID}' ORDER BY `date_set` DESC";

        if($result = mysqli_query(connect(), $sql)){
            $i=0;
            while($row = mysqli_fetch_assoc($result)){
                $goals[$i]['goal_id'] = $row['goal_id'];
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

        $row = queryLatestUserGoal($trackerID);

        echo json_encode(array(
            'goal_id' => $row['goal_id'],
            'goal_weight' => $row['goal_weight'],
            'date_set' => $row['date_set']
        ));
        
    }

    function queryLatestUserGoal($trackerID){
        $sql = "SELECT * FROM `weight_goals` WHERE `tracker_id` = '{$trackerID}' ORDER BY `date_set` DESC LIMIT 1";

        if($result = mysqli_query(connect(), $sql)){
            return mysqli_fetch_assoc($result);
            

        }else{
            echo json_encode([
                'Results:' => 'Failure'
            ]);
        }
    }

    /*************************************************************************************/


    function insertNewWeight($request){
        $trackerID = getTrackerID($request);
            
        $sql = "INSERT INTO `weight_diary` (`diary_id`, `tracker_id`, `weight`, `date`) VALUES (NULL, '{$trackerID}', '{$request->weight_entry->weight}', '{$request->weight_entry->date}');";
        
        if($result = mysqli_query(connect(), $sql)){
            $row = queryLatestUserWeight($trackerID);

            echo json_encode(array(
                'diary_id' => $row['diary_id'],
                'weight' => $row['weight'],
                'date' => $row['date']
            ));
        }else{
            echo json_encode([
                'Results:' => 'Failure'
            ]);
        }
    }

    function getUserWeights($request){
        $trackerID = getTrackerID($request);
        $weights = [];
        $sql = "SELECT * FROM `weight_diary` WHERE `tracker_id` = '{$trackerID}' ORDER BY `date` DESC";

        if($result = mysqli_query(connect(), $sql)){
            $i=0;
            while($row = mysqli_fetch_assoc($result)){
                $weights[$i]['diary_id'] = $row['diary_id'];
                $weights[$i]['weight'] = $row['weight'];
                $weights[$i]['date'] = $row['date'];              

                $i++;
            }

            echo json_encode($weights);
        }else{
            http_response_code(404);
        }
    }

    function getLatestUserWeight($request){
        $trackerID = getTrackerID($request);

        $row = queryLatestUserGoal($trackerID);

        echo json_encode(array(
            'weight' => $row['weight'],
            'date' => $row['date']
        ));
        
    }

    function queryLatestUserWeight($trackerID){
        $sql = "SELECT * FROM `weight_diary` WHERE `tracker_id` = '{$trackerID}' ORDER BY `date` DESC LIMIT 1";

        if($result = mysqli_query(connect(), $sql)){
            return mysqli_fetch_assoc($result);
            

        }else{
            echo json_encode([
                'Results:' => 'Failure'
            ]);
        }
    }

?>