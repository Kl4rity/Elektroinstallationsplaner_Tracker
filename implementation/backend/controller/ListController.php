<?php
/**
 * @author helmuth
 */

class ListController {
   
    private $jsonView;
    private $validTables = 
    [
        "PROJECTS"
        ,"FLOORS"
        ,"ROOMS"
        ,"DEVICES"
        ,"SENSORS"
        ,"FUSES"
        ,"CIRCUIT_BREAKERS"
    ];

    private $validTableActions =
    [
        "GETLIST"
        , "CREATE"
        , "UPDATE"
        , "DELETE"
    ];

    private $validComplexActions = 
    [
        "GET-SHOPPINGLIST"
        , "GET-CIRCUITPLAN"
    ];
   
    public function __construct() {
        $this->jsonView = new JsonView();
    }
    
    public function route(){          
        $postData = $this->validatePostData(json_decode(filter_input(INPUT_POST, 'data')));

        if (in_array(strtoupper($postData->action), $this->validTableActions)){
            $responsibleModelInstance = $this->fetchResponsibleTableModelInstance($postData->listtype);
        } else if (in_array(strtoupper($postData->action), $this->validComplexActions)) {
            $responsibleModelInstance = $this->fetchResponsibleComplexActionInstance($postData->action);
        }

        $dbResponseData = $responsibleModelInstance->executeRequest($postData);
        $this->jsonView->streamOutput($dbResponseData);
    }
    
    private function validatePostData($postData){
        
       $actionIsValid = (in_array(strtoupper($postData->action), $this->validTableActions) || in_array(strtoupper($postData->action), $this->validComplexActions));
       
       if (in_array(strtoupper($postData->action), $this->validTableActions)){
           $listTypeIsValid = in_array(strtoupper($postData->listtype), $this->validTables);
       } else if (in_array(strtoupper($postData->action), $this->validComplexActions)) {
           $listTypeIsValid = true;
       } 

       if(!$actionIsValid || !$listTypeIsValid){
           $postData->listtype = "ERROR";
       }
       
       return $postData;
    }
    
    private function fetchResponsibleTableModelInstance($listtype){
        switch(strtoupper($listtype)):
            case "PROJECTS":
                return new Project("projects", "NONE","floors");
            case "FLOORS":
                return new Floor("floors","projects_id", "rooms");
            case "ROOMS":
                return new Room("rooms", "floors_id", "devices");
            case "DEVICES":
                return new Device("devices", "rooms_id", "sensors");
            case "SENSORS":
                return new Sensor("sensors","devices_id", "NONE");
            case "FUSES":
                return new Fuse("fuses", "circuit_breakers_id" ,"NONE");
            case "CIRCUIT_BREAKERS":
                return new CircuitBreaker("circuit_breakers", "projects_id", "fuses");
            case "ERROR":
                echo("Uh-oh, what happened? We encountered an error with the operation you are trying to execute or the table you are trying to execute it on.");
                break;
            default:
                echo("No known listtype was provided!");
                break;
        endswitch;
    }    

    private function fetchResponsibleComplexActionInstance($action) {
        switch(strtoupper($action)):
            case "GET-SHOPPINGLIST":
                return new ShoppingList();
            case "GET-CIRCUITPLAN":
                return new CircuitPlan();
        endswitch;
    }
}
