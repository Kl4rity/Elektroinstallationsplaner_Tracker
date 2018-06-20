var addDialogueView = {
    dnName : null
    , dnFloorCountFromBasement : null
    , dnParentId : null
    , dnUnit : null
    , dnValue : null

    , dnSubmitButton : null
    , dnAddItem : null
    , dnModalTitle : null

    , currentLevelElectroInstallationsItems : null

    , currentLevel : null

    , configProjects : {
        name : true
    }
    , configFloors : {
        name : true
        , floorCountFromBasement : true
        , parentId : true
    }
    , configRooms : {
        name : true
        , parentId : true
    }
    , configDevices : {
        name : true
        , parentId : true
    }
    , configSensors: {
        name : true
        , parentId : true
        , unit : true
        , value : true
    }
    , configReset:{
        name: true
        , floorCountFromBasement : true
        , parentId : true
        , unit : true
        , value : true
    }
    , initDialogue : function(currentLevel, currentLevelElectroInstallationsItems){
        this.dnName = document.getElementById("AddEdit-ItemName-Container");
        this.dnFloorCountFromBasement = document.getElementById("AddEdit-FloorCountFromBasement-Container");
        this.dnParentId = document.getElementById("AddEdit-ParentId-Container");
        this.dnUnit = document.getElementById("AddEdit-Unit-Container");
        this.dnValue = document.getElementById("AddEdit-Value-Container");
        this.dnSubmitButton = document.getElementById("AddEdit-Submit");
        this.dnAddItem = document.getElementById("addItem");
        this.dnModalTitle = document.getElementById("ElectroModalTitle");

        this.dnAddItem.addEventListener("click", this.createNewEntryDialogue);

        this.currentLevel = currentLevel;
        this.currentLevelElectroInstallationsItems = currentLevelElectroInstallationsItems;

        this.setFieldVisibility();
    }
    , setFieldVisibility : function(){

        console.log(addDialogueView.currentLevel);
        console.log(addDialogueView.getConfig(addDialogueView.currentLevel));
        console.log((addDialogueView.dnFloorCountFromBasement.classList.contains("invisible")));

        config = addDialogueView.getConfig(addDialogueView.currentLevel);

        if(addDialogueView.dnName.classList.contains("invisible")){
            addDialogueView.dnName.classList.remove("invisible");
        }
        if(addDialogueView.dnFloorCountFromBasement.classList.contains("invisible")){
            addDialogueView.dnFloorCountFromBasement.classList.remove("invisible");
        }
        if(addDialogueView.dnParentId.classList.contains("invisible")){
            addDialogueView.dnParentId.classList.remove("invisible");
        }
        if(addDialogueView.dnUnit.classList.contains("invisible")){
            addDialogueView.dnUnit.classList.remove("invisible");
        }
        if(addDialogueView.dnValue.classList.contains("invisible")){
            addDialogueView.dnValue.classList.remove("invisible");
        }

        if (!config.name){
            addDialogueView.dnName.classList.add("invisible");
        }
        if (!config.floorCountFromBasement){
            addDialogueView.dnFloorCountFromBasement.classList.add("invisible");
        }
        if (!config.parentId){
            addDialogueView.dnParentId.classList.add("invisible");
        }
        if (!config.unit) {
            addDialogueView.dnUnit.classList.add("invisible");
        }
        if (!config.value){
            addDialogueView.dnValue.classList.add("invisible");
        }
        console.log((addDialogueView.dnFloorCountFromBasement.classList.contains("invisible")));
    }
    , resetFieldVisibility : function (){
        addDialogueView.setFieldVisibility(addDialogueView.configReset);
    }
    , clearFormFields : function(){
        $("#AddEdit-ItemName").val("");
        $("#AddEdit-FloorCountFromBasement").val("");
        $("#AddEdit-ParentId").val("");
        $("#AddEdit-Unit").val("");
        $("#AddEdit-Value").val("");
    }
    , fetchSpecificationData : function(){
        config = this.getConfig(addDialogueView.currentLevel);

        returnObject = {
            parentid : null
            ,specification : {

            }
        };

        fieldsAreValid = [];

        if (config.name){
            returnObject.specification.name = $("#AddEdit-ItemName").val();

            if (!name) {
                fieldsAreValid.push(false);
            } else {
                fieldsAreValid.push(true);
            }

        };
        if (config.floorCountFromBasement){
            returnObject.specification.floor_count_from_basement = $("#AddEdit-FloorCountFromBasement").val();

            if (!floorCountFromBasement) {
                fieldsAreValid.push(false);
            } else {
                fieldsAreValid.push(true);
            }
        };
        if (config.parentId){
            returnObject.parentid = $("#AddEdit-ParentId").val();

            if (!parentId) {
                fieldsAreValid.push(false);
            } else {
                fieldsAreValid.push(true);
            }
        };
        if (config.unit) {
            returnObject.specification.unit = $("#AddEdit-Unit").val();

            if (!unit) {
                fieldsAreValid.push(false);
            } else {
                fieldsAreValid.push(true);
            }
        };
        if (config.value){
            returnObject.specification.value = $("#AddEdit-Value").val();

            if (!value) {
                fieldsAreValid.push(false);
            } else {
                fieldsAreValid.push(true);
            }
        };

        fieldsAreValid.map(function(isValid){
            if(!isValid){
                alert("Data entered is not valid. Please fill in the missing fields.");
                return;
            }
        });
        return returnObject;
    }
    , getConfig : function(){
        switch(addDialogueView.currentLevel){
            case "projects":
                return addDialogueView.configProjects;
            case "floors":
                return addDialogueView.configFloors;
            case "rooms":
                return addDialogueView.configRooms;
            case "devices":
                return addDialogueView.configDevices;
            case "sensors":
                return addDialogueView.configSensors;
            default:
                console.log("Listtype unknown - no Add-Dialogue config available.");
                return;
        }
    }
    , createNewEntryDialogue : function() {
        addDialogueView.clearFormFields();
        addDialogueView.dnSubmitButton.innerHTML = "Create Object";
        addDialogueView.dnModalTitle. innerHTML = "Create a new Object:"
        addDialogueView.dnSubmitButton.addEventListener("click", addDialogueView.createNewItem);
    }
    , createNewItem : function(){
        dummyItem = {
            name : "none"
            , id : 0
            , created : 0
            , last_changed : 0
        };
        dummyElectroModelIteam = new electroInstallationItem(dummyItem, addDialogueView.currentLevel, null);
        createItemFormData = addDialogueView.fetchSpecificationData();
        dummyElectroModelIteam.create(createItemFormData.parentId, createItemFormData.specification);
        addDialogueView.clearFormFields();
    }
    , editExistingEntryDialogue: function(clickedEditButton){
        parentRow = clickedEditButton.closest("tr")[0];
        clickedItemId = parentRow.getAttribute("itemId");

        selectedItem = addDialogueView.findItemWithId(clickedItemId)[0];

        console.log(selectedItem);

        $("#AddEdit-ItemName").val(selectedItem.name);
        $("#AddEdit-FloorCountFromBasement").val((selectedItem.floorCountFromBasement || null));
        $("#AddEdit-ParentId").val((selectedItem.parentId || null));
        $("#AddEdit-Unit").val((selectedItem.unit || null));
        $("#AddEdit-Value").val((selectedItem.value || null));

        addDialogueView.dnSubmitButton.innerHTML = "Update Object";
        addDialogueView.dnModalTitle.innerHTML = "Edit an existing Object";
        
        addDialogueView.dnSubmitButton.addEventListener("click", function(){
            addDialogueView.editItem(selectedItem);
        });
    }
    , editItem: function(selectedItem){
        updateSpecificationData = addDialogueView.fetchSpecificationData().specification;
        console.log(addDialogueView.fetchSpecificationData());
        selectedItem.update(updateSpecificationData);
        addDialogueView.clearFormFields();
    }
    , findItemWithId: function(clickedItemId){
        return addDialogueView.currentLevelElectroInstallationsItems.filter(function(item){
            return item.id == clickedItemId;
        });
    }
}