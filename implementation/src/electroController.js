var ElectroController = {
    currentBackendAddress : "http://localhost/Semester2Project/Elektroinstallationsplaner_Tracker/implementation/backend/index.php"
    , lastRequest : null
    , fetchData : function(requestObject){

        ElectroController.lastRequest = requestObject;

        $.ajax({
            url: ElectroController.currentBackendAddress,
            type: "post",
            data: {data: JSON.stringify(requestObject)},
            dataType: "json",
            cache: false,
            success: function(data){
                currentLevelElektroinstallationsItems = createElektroInstallationsItems(data);
                
                electroListHandler.buildList(currentLevelElektroinstallationsItems);
                addDialogueView.initDialogue(data.currentLevel.toLowerCase(), currentLevelElektroinstallationsItems);
                sidebarView.highlightStage(currentLevelElektroinstallationsItems);
            },
            error: function(data){
                console.log("ERROR\n" + data);
            }
        });
    }
    , reloadCurrentData : function(){
        ElectroController.fetchData(ElectroController.lastRequest);
    }
    , createNewElement : function(requestObject){
        $.ajax({
            url: ElectroController.currentBackendAddress,
            type: "post",
            data: {data: JSON.stringify(requestObject)},
            dataType: "json",
            cache: false,
            success: function(data){
                ElectroController.reloadCurrentData();
            },
            error: function(data){
                console.log("ERROR\n" + data);
            }
        });
    }
}

$(document).ready(function(){

    var initialRequest = {action : "getlist" , listtype : "PROJECTS" , parentid : "1"};

    ElectroController.fetchData(initialRequest);

});