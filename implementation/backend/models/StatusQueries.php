<?php

class ProjectStatus implements iPostRequestExecutor {
    
    private $database;
    
    public function __construct(){
        $this->database = new Database(DBHost, DBName, DBUser, DBPass);
    }

    public function executeRequest($requestData) {
        //Execute the separate SQL queries to gather data needed for further steps.
        $devices = $this->getDevices($requestData->parentid);
        $fuses = $this->getFuses($requestData->parentid);

        // echo("Devices: \n\n");
        // var_dump($devices);
        // echo("Fuses: \n\n");
        // var_dump($fuses);

        if(empty($devices[0]["name"]) || empty($fuses[0]["name"])){
            return array("hasDevicesAndFuses" => false);
        }

        return array("hasDevicesAndFuses" => true);
    }

    private function getDevices($projectId) {
        $sql = "SELECT * FROM `devices` WHERE rooms_id IN (SELECT id FROM rooms WHERE floors_id IN (SELECT id FROM floors WHERE projects_id = ". $projectId ."));";
        return $this->database->query($sql);
    }

    private function getFuses($projectId){
        $sql = "SELECT * FROM fuses WHERE circuit_breakers_id IN (SELECT id FROM circuit_breakers WHERE projects_id = ". $projectId .");";
        return $this->database->query($sql);
    }
    
}