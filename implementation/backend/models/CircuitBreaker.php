<?php
/**
 * Description of CircuitBreaker
 *
 * @author cstift
 */
class CircuitBreaker extends ElectricModelItem {
    //put your code here
    
    protected function getList($parentId) {
        $sql = " SELECT * FROM " . $this->tableNameString;
        return $this->database->query($sql);
    }

    public function create($parentId, $specification) {
        $sql = " INSERT INTO " . $this->tableNameString . "('name') VALUES ('" . $specification->name . "')";
        return $this->database->query($sql);
    }

    public function update($itemId, $specification) {
        $sql = " UPDATE ". $this->tableNameString . " SET name = '" . $specification->name . "' WHERE id = " . $itemId . "";
        return $this->database->query($sql);
    }

}
