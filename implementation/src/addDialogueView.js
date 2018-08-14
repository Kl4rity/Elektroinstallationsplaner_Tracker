var addDialogueView = {
    // Complete Modal Container
    dnFullAddEditModalContainer: null

    // References Input-Containers
    , dnNameContainer : null
    , dnFloorCountFromBasementContainer : null
    , dnParentIdContainer : null
    , dnUnitContainer : null
    , dnValueContainer : null

    // References Input-Fields
    , dnNameInput: null
    , dnFloorCountFromBasementInput: null
    , dnParentIdInput: null
    , dnUnitInput: null
    , dnValueInput: null

    // References PopupInfo
    , dnModalTitle : null

    // References Buttons
    , dnSubmitButton : null
    , dnAddItemButton : null

    , currentLevelElectroInstallationsItems : null
    , currentLevel : null

    // Config objects
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
    , configFuses: {
        name: true
        , parentId : true
    }
    , configCicuitBreakers: {
        name: true
        , parentId : true
    }
    , initDialogue : function(currentLevel, currentLevelElectroInstallationsItems){
        addDialogueView.fetchNodeReferences();
        addDialogueView.currentLevel = currentLevel;
        addDialogueView.currentLevelElectroInstallationsItems = currentLevelElectroInstallationsItems;
        addDialogueView.setFieldVisibility();
    }
    , setCleanupEventListener: function(){
        $("#exampleModalCenter").on("hide.bs.modal", function(e){
            $("#AddEdit-Submit").off("click");
            console.log("Ran cleanup loop on " + $("#AddEdit-Submit")); 
        })
    }
    , fetchNodeReferences: function(){
        //Has to be JQuery for the Bootstrap functionality to work.
        addDialogueView.dnFullAddEditModalContainer = $("#exampleModalCenter");

        addDialogueView.dnNameContainer = document.getElementById("AddEdit-ItemName-Container");
        addDialogueView.dnFloorCountFromBasementContainer = document.getElementById("AddEdit-FloorCountFromBasement-Container");
        addDialogueView.dnParentIdContainer = document.getElementById("AddEdit-ParentId-Container");
        addDialogueView.dnUnitContainer = document.getElementById("AddEdit-Unit-Container");
        addDialogueView.dnValueContainer = document.getElementById("AddEdit-Value-Container");

        addDialogueView.dnNameInput = document.getElementById("AddEdit-ItemName");
        addDialogueView.dnFloorCountFromBasementInput = document.getElementById("AddEdit-FloorCountFromBasement");
        addDialogueView.dnParentIdInput = document.getElementById("AddEdit-ParentId");
        addDialogueView.dnUnitInput = document.getElementById("AddEdit-Unit");
        addDialogueView.dnValueInput = document.getElementById("AddEdit-Value");

        addDialogueView.dnSubmitButton = document.getElementById("AddEdit-Submit");
        addDialogueView.dnAddItemButton = document.getElementById("addItem");
        addDialogueView.dnAddItemButton.addEventListener("click", this.createNewEntryDialogue);

        addDialogueView.dnModalTitle = document.getElementById("ElectroModalTitle");
    }
    , setFieldVisibility : function(){
        config = addDialogueView.getConfig();
        addDialogueView.resetFieldVisibility();

        if (!config.name){
            addDialogueView.dnNameContainer.classList.add("invisible");
        }
        if (!config.floorCountFromBasement){
            addDialogueView.dnFloorCountFromBasementContainer.classList.add("invisible");
        }
        if (!config.parentId){
            addDialogueView.dnParentIdContainer.classList.add("invisible");
        }
        if (!config.unit) {
            addDialogueView.dnUnitContainer.classList.add("invisible");
        }
        if (!config.value){
            addDialogueView.dnValueContainer.classList.add("invisible");
        }
    }
    , resetFieldVisibility : function (){
        if(addDialogueView.dnNameContainer.classList.contains("invisible")){
            addDialogueView.dnNameContainer.classList.remove("invisible");
        }
        if(addDialogueView.dnFloorCountFromBasementContainer.classList.contains("invisible")){
            addDialogueView.dnFloorCountFromBasementContainer.classList.remove("invisible");
        }
        if(addDialogueView.dnParentIdContainer.classList.contains("invisible")){
            addDialogueView.dnParentIdContainer.classList.remove("invisible");
        }
        if(addDialogueView.dnUnitContainer.classList.contains("invisible")){
            addDialogueView.dnUnitContainer.classList.remove("invisible");
        }
        if(addDialogueView.dnValueContainer.classList.contains("invisible")){
            addDialogueView.dnValueContainer.classList.remove("invisible");
        }
    }
    , clearFormFields : function(){
        addDialogueView.setFormFields();
    }
    , setFormFields : function(modelItem){
        addDialogueView.dnNameInput.value = (typeof modelItem !== 'undefined') ? modelItem.name : "";
        addDialogueView.dnFloorCountFromBasementInput.value = (typeof modelItem !== 'undefined') ? modelItem.floorCountFromBasement : "";
        addDialogueView.dnParentIdInput.value = (typeof modelItem !== 'undefined') ? modelItem.parentId : "";
        addDialogueView.dnUnitInput.value = (typeof modelItem !== 'undefined') ? modelItem.unit : "";
        addDialogueView.dnValueInput.value = (typeof modelItem !== 'undefined') ? modelItem.value : "";
    }
    , fetchSpecificationData : function(){
        config = this.getConfig(addDialogueView.currentLevel);

        returnObject = {
            parentid : null
            ,specification : {

            }
        };

        if (config.name){
            returnObject.specification.name = addDialogueView.dnNameInput.value;
        };
        if (config.floorCountFromBasement){
            returnObject.specification.floor_count_from_basement = addDialogueView.dnFloorCountFromBasementInput.value;
        };
        if (config.parentId){
            returnObject.parentid = addDialogueView.dnParentIdInput.value;
        };
        if (config.unit) {
            returnObject.specification.unit = addDialogueView.dnUnitInput.value;
        };
        if (config.value){
            returnObject.specification.value = addDialogueView.dnValueInput.value;
        };

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
            case "fuses":
                return addDialogueView.configFuses;
            case "circuit_breakers":
                return addDialogueView.configCicuitBreakers;
            default:
                console.log("Listtype unknown - no Add-Dialogue config available.");
                return;
        }
    }
    , createNewEntryDialogue : function() {
        addDialogueView.clearFormFields();
        addDialogueView.setParentId();
        addDialogueView.configureVariablePopupViewFeatures(
            {
                title: "Create a new Object:"
                , buttonLabel: "Create Object"
                , onButtonClicked: addDialogueView.createNewItem
            }
        );
    }
    , createNewItem : function(){
        newItemRequest = {
            action: "create"
            , listtype: addDialogueView.currentLevel
            , parentid: null
            , specification: null
        }
        formData = addDialogueView.fetchSpecificationData();
        newItemRequest.parentid = (typeof formData.parentid !== 'undefined') ? formData.parentid : 0;
        newItemRequest.specification = formData.specification;
        console.log(newItemRequest);
        queryService.createUpdateDeleteQuery(newItemRequest);
        addDialogueView.clearFormFields();
    }
    , editExistingEntryDialogue: function(clickedEditButton){
        parentRow = clickedEditButton.closest("tr")[0];
        selectedItem = addDialogueView.getItemById(parentRow.getAttribute("itemId"));
        addDialogueView.setFormFields(selectedItem);
        addDialogueView.configureVariablePopupViewFeatures(
            {
                title: "Edit an existing Object"
                , buttonLabel: "Update Object"
                , onButtonClicked: function(){
                    addDialogueView.editItem(selectedItem);
                    console.log(selectedItem);
                }
            }
        );
    }
    , editItem: function(selectedItem){
        updateSpecificationData = addDialogueView.fetchSpecificationData().specification;
        selectedItem.update(updateSpecificationData);
        addDialogueView.clearFormFields();
    }
    , getItemById: function(clickedItemId){
        return addDialogueView.currentLevelElectroInstallationsItems.filter(function(item){
            return item.id == clickedItemId;
        })[0];
    }
    , setParentId: function(){
        $("#AddEdit-ParentId").val($(".appendedRow").attr("parentid"));
    }
    , configureVariablePopupViewFeatures: function({title, buttonLabel, onButtonClicked}){
        addDialogueView.dnSubmitButton.innerHTML = buttonLabel;
        addDialogueView.dnModalTitle. innerHTML = title;
        $("#AddEdit-Submit").on("click", function(){
            onButtonClicked();
            addDialogueView.dnFullAddEditModalContainer.modal("hide");
        });
    }
}