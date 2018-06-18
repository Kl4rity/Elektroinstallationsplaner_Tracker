var addDialogueView = {
    dnName : null
    , dnFloorCountFromBasement : null
    , dnParentId : null
    , dnUnit : null
    , dnValue : null

    , dnSubmitButton : null
    , dnAddItem : null
    , dnModalTitle : null

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
    , configLoaders : {
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
    , initDialogue : function(currentLevel){
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

        this.setFieldVisibility();
    }
    , setFieldVisibility : function(){

        config = addDialogueView.getConfig(addDialogueView.currentLevel);

        if(addDialogueView.dnName.classList.contains("invisible")){
            addDialogueView.dnName.classList.remove("invisible");
        }
        if(addDialogueView.dnFloorCountFromBasement.classList.contains("invisible")){
            addDialogueView.dnFloorCountFromBasement.remove("invisible");
        }
        if(addDialogueView.dnParentId.classList.contains("invisible")){
            addDialogueView.dnParentId.remove("invisible");
        }
        if(addDialogueView.dnUnit.classList.contains("invisible")){
            addDialogueView.dnUnit.remove("invisible");
        }
        if(addDialogueView.dnValue.classList.contains("invisible")){
            addDialogueView.dnValue.remove("invisible");
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
            name = $("#AddEdit-ItemName").val();
            returnObject.specification.name = name;

            if (!name) {
                fieldsAreValid.push(false);
            } else {
                fieldsAreValid.push(true);
            }

        };
        if (config.floorCountFromBasement){
            floorCountFromBasement = $("#AddEdit-FloorCountFromBasement").val();
            returnObject.specification.floor_count_from_basement = floorCountFromBasement;

            if (!floorCountFromBasement) {
                fieldsAreValid.push(false);
            } else {
                fieldsAreValid.push(true);
            }
        };
        if (config.parentId){
            parentId = $("#AddEdit-ParentId").val();
            returnObject.parentid = parentId;

            if (!parentId) {
                fieldsAreValid.push(false);
            } else {
                fieldsAreValid.push(true);
            }
        };
        if (config.unit) {
            unit = $("#AddEdit-Unit").val();
            returnObject.specification.unit = unit;

            if (!unit) {
                fieldsAreValid.push(false);
            } else {
                fieldsAreValid.push(true);
            }
        };
        if (config.value){
            value = $("#AddEdit-Value").val();
            returnObject.specification.value = value;

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
            case "loaders":
                return addDialogueView.configLoaders;
            case "sensors":
                return addDialogueView.configSensors;
            default:
                console.log("Listtype unknown - no Add-Dialogue config available.");
                return;
        }
    }
    , createNewEntryDialogue : function() {
        // Set button to display create Object
        addDialogueView.dnSubmitButton.innerHTML = "Create Object";
        addDialogueView.dnModalTitle. innerHTML = "Create a new Object:"
        // Set button to call the createObject function for the specific list.
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
    }
    , editExistingEntryDialogue: function(){
        // Set button to display update Object
        addDialogueView.dnSubmitButton.innerHTML = "Update Object";
        addDialogueView.dnModalTitle.innerHTML = "Edit an existing Object";
        // Set button to call the item-specific updateObject function
            // Fetch it from the application state by it's Id?
        addDialogueView.dnSubmitButton.addEventListener("click", function(){
            console.log($(this));
            addDialogueView.editItem();
        });
    }
    , editItem: function(){
        // Find the item in a list of items.
        selectedItem = findItemWithId();
        updateSpecificationData = addDialogueView.fetchSpecificationData.specification;
        selectedItem.update(updateSpecificationData);
    }
    , findItemWithId: function(){

    }
}