<?php

/**
 * Description of Fuse
 *
 * @author cstift
 */
class Fuse extends ElectricModelItem {

    public function create($parentId, $specification) {
        $sql = " INSERT INTO " . $this->tableNameString . " (".$this->parentIdTypeString.", name) VALUES (". $parentId . " , '" . $specification->name . "')";
        return $this->database->query($sql);
    }

    public function update($itemId, $specification) {
        $sql = " UPDATE ". $this->tableNameString . " SET name = '" . $specification->name . "' WHERE id = " . $itemId . "";
        return $this->database->query($sql);
    }
}
