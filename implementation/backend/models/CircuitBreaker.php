<?php
/**
 * Description of CircuitBreaker
 *
 * @author cstift
 */
class CircuitBreaker extends ElectricModelItem {
    //put your code here

    public function create($parentId, $specification) {
        $sql = " INSERT INTO " . $this->tableNameString . "(".$this->parentIdTypeString.",name) VALUES (". $parentId . " ,'" . $specification->name . "')";
        return $this->database->query($sql);
    }

    public function update($itemId, $specification) {
        $sql = " UPDATE ". $this->tableNameString . " SET name = '" . $specification->name . "' WHERE id = " . $itemId . "";
        return $this->database->query($sql);
    }

}
