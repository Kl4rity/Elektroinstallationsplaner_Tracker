<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of CircuitPlan
 *
 * @author cstift
 */
class CircuitPlan implements iPostRequestExecutor {
    
    private $database;
    
    public function __construct(){
        $this->database = new Database(DBHost, DBName, DBUser, DBPass);
    }
    
    public function executeRequest($requestData) {
        //Execute the separate SQL queries to gather data needed for further steps.
        $circuitBreakers = $this->getCircuitBreakers($requestData->parentid);
        $fuses = $this->getFuses($requestData->parentid);
        $devices = $this->getDevices($requestData->parentid);
        $projectName = $this->getProjectName($requestData->parentid);

        // echo("circuitBreakers\n\n");
        // var_dump($circuitBreakers);

        // echo("Fuses\n\n");
        // var_dump($fuses);

        // echo("Devices\n\n");
        // var_dump($devices);

        // echo("Projectname\n\n");
        // var_dump($projectName);

        return $this->buildResponseArray($circuitBreakers, $fuses, $devices, $projectName);
    }
    
    private function getCircuitBreakers($projectId) {
        $sql = "SELECT * FROM circuit_breakers WHERE projects_id = ". $projectId .";";
        return $this->database->query($sql);
    }

    private function getFuses($projectId){
        $sql = "SELECT * FROM fuses WHERE circuit_breakers_id IN (SELECT id FROM circuit_breakers WHERE projects_id = ". $projectId .");";
        return $this->database->query($sql);
    }

    private function getDevices($projectId) {
        $sql = "SELECT * FROM `devices` WHERE rooms_id IN (SELECT id FROM rooms WHERE floors_id IN (SELECT id FROM floors WHERE projects_id = ". $projectId ."));";
        return $this->database->query($sql);
    }
    
    private function getProjectName($projectId){
        $sql = "SELECT name FROM projects WHERE id = ". $projectId .";";
        return $this->database->query($sql);
    }
    
    private function buildResponseArray($circuitBreakers, $fuses, $devices, $projectName){
        
        //Start building the response - setting the highest level - the project name.
        $response = array("project" => $projectName[0]["name"]);
        
        //Build the plan
        $fusesWithDevices = $this->assignDevicesToFuses($fuses, $devices);
        $circuitplan = $this->assignFusesToCircuitBreakers($circuitBreakers, $fusesWithDevices);        
        
        //Add it to the response
        $response["circuitplan"] = $circuitplan;
        
        return $response;
    }

    private function assignDevicesToFuses($fuses, $devices){
        $fusesWithDevicesAssigned = array();
        
        foreach($fuses as $key => $fuse){
            $fusesWithDevicesAssigned[$key] = $fuse;
            $fusesWithDevicesAssigned[$key]["devices"] = $this->generateDeviceListForFuseId($devices, $fuse["id"]);
        }
        
        return $fusesWithDevicesAssigned;
    }

    private function generateDeviceListForFuseId($devices, $id){
        $listOfMatchedDevices = array();
        foreach($devices as $device){
            if($device["fuses_id"] == $id){
                $listOfMatchedDevices[] = $device;
            }
        }
        return $listOfMatchedDevices;
    }
    

    private function assignFusesToCircuitBreakers($circuitBreakers, $fusesWithDevices){
        $circuitBreakersMatchedWithFuses = array();
        foreach($circuitBreakers as $key => $circuitBreaker){
            $circuitBreakersMatchedWithFuses[$key] = $circuitBreaker;
            $circuitBreakersMatchedWithFuses[$key]["fuses"] = $this->generateFuseListForCircuitBreaker($fusesWithDevices, $circuitBreaker["id"]);
        }
        return $circuitBreakersMatchedWithFuses;
    }

    private function generateFuseListForCircuitBreaker($fuses, $id){
        $listOfMatchedFuses = array();
        foreach($fuses as $fuse){
            if ($fuse["circuit_breakers_id"] == $id){
                $listOfMatchedFuses[] = $fuse;
            }
        }
        return $listOfMatchedFuses;
    }
}