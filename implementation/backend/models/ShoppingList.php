<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of ShoppingList
 *
 * @author cstift
 */
class ShoppingList implements iPostRequestExecutor {
    
    private $database;
    
    public function __construct(){
        $this->database = new Database(DBHost, DBName, DBUser, DBPass);
    }
    
    public function executeRequest($requestData) {
        //Execute the separate SQL queries to gather data needed for further steps.
        $devices = $this->getDevices($requestData->parentid);
        $sensors = $this->getSensors($requestData->parentid);
        $projectName = $this->getProjectName($requestData->parentid);
        
        return $this->buildResponseArray($devices, $sensors, $projectName);
    }
    
    private function getDevices($projectId) {
        $sql = "SELECT * FROM `devices` WHERE rooms_id IN (SELECT id FROM rooms WHERE floors_id IN (SELECT id FROM floors WHERE projects_id = ". $projectId ."));";
        return $this->database->query($sql);
    }
    
    private function getSensors($projectId) {
        $sql = "SELECT * FROM `sensors` WHERE devices_id IN (SELECT id FROM `devices` WHERE rooms_id IN (SELECT id FROM rooms WHERE floors_id IN (SELECT id FROM floors WHERE projects_id = ". $projectId .")));";
        return $this->database->query($sql);  
    }
    
    private function getProjectName($projectId){
        $sql = "SELECT name FROM projects WHERE id = ". $projectId .";";
        return $this->database->query($sql);
    }
    
    private function buildResponseArray($devices, $sensors, $projectName){
        
        //Start building the response - setting the highest level - the project name.
        $response = array("project" => $projectName[0]["name"]);
        
        //Build the shopping list
        $devicesWithSensorsUncounted = $this->assignSensorsToDevices($devices, $sensors);
        // var_dump($devicesWithSensorsUncounted);
        $shoppingList = $this->collapseDuplicateShoppingListItems($devicesWithSensorsUncounted);
        
        //Add it to the response
        $response["shoppinglist"] = $shoppingList;
        
        return $response;
    }

    private function assignSensorsToDevices($devices, $sensors){
        $shoppingList = array();
        
        foreach($devices as $device){
            $deviceOnShoppingList = array("devicename" => $device["name"]);
            $deviceOnShoppingList["sensors"] = $this->getSensorListForDevice($device, $sensors);
            //Set default count to 1
            $deviceOnShoppingList["count"] = 1;
            // Append entry to shoppingList
            $shoppingList[] = $deviceOnShoppingList;
        }
        
        return $shoppingList;
    }
    
    private function collapseDuplicateShoppingListItems($shoppingList){
        $i=0;
        $countedList = array();
        while($i < count($shoppingList)){
            $counter = 1;
            $c = $i+1;
            while($c < count($shoppingList)){
                if(empty(array_diff($shoppingList[$i], $shoppingList[$c])) && empty(array_diff($shoppingList[$i]["sensors"], $shoppingList[$c]["sensors"]))){
                    $counter = $counter + 1;
                    $removed_elements = array_splice($shoppingList, $c, 1);
                } else {
                    $c++;
                }
            }
            $shoppingList[$i]["count"] = $counter;
            $countedList[] = $shoppingList[$i];
            $i++;
        }
        return $countedList;
    }
    
    private function getSensorListForDevice($device, $sensors){
       $sensorList = array();
            foreach($sensors as $sensor){
                if($device["id"] == $sensor["devices_id"]){
                    $sensorEntry = array(
                        "name" => $sensor["name"],
                        "unit" => $sensor["unit"]
                    );
                    $sensorList[] = $sensorEntry;
                }
            }
        return $sensorList;
   }
}