<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of devices
 *
 * @author cstift
 */
class Device extends ElectricModelItem {
    //put your code here
    public function create($parentId, $specification) {
        // If fuse_id is not set, execute query without it.
        if (empty($specification->fuse_id)) {
            $sql = " INSERT INTO " . $this->tableNameString . "(".$this->parentIdTypeString.", name) VALUES (". $parentId . " , '" . $specification->name . "')";
            return $this->database->query($sql);
        }

        $sql = " INSERT INTO " . $this->tableNameString . "(".$this->parentIdTypeString.", name, fuses_id) VALUES (". $parentId . " , '" . $specification->name . "' " . $specification->fuses_id . ")";
        return $this->database->query($sql);
    }

    public function update($itemId, $specification) {
        if (empty($specification->fuse_id)) {
            $sql = " UPDATE ". $this->tableNameString . " SET name = '" . $specification->name . "' WHERE id = " . $itemId . "";
            return $this->database->query($sql);
        }

        $sql = " UPDATE ". $this->tableNameString . " SET name = '" . $specification->name . "', fuses_id = '" . $specification->fuse_id . "' WHERE id = " . $itemId . "";
        return $this->database->query($sql);
    }
}
