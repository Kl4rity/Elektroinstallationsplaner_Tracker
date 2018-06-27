var ElectroController = {
    currentBackendAddress : "http://localhost/Semester2Project/Elektroinstallationsplaner_Tracker/implementation/backend/index.php"
    , requestHistory : []
    , fetchData : function(requestObject){
        if(!Object.is(requestObject, ElectroController.requestHistory[ElectroController.requestHistory.length -1])){
            ElectroController.requestHistory.push(requestObject);
        }

        $.ajax({
            url: ElectroController.currentBackendAddress,
            type: "post",
            data: {data: JSON.stringify(requestObject)},
            dataType: "json",
            cache: false,
            success: function(data){
                switchView("page1");
                console.log(data);
                currentLevelElektroinstallationsItems = createElektroInstallationsItems(data);
                electroListHandler.buildList(currentLevelElektroinstallationsItems, requestObject.listtype, requestObject.parentid);
                addDialogueView.initDialogue(data.currentLevel.toLowerCase(), currentLevelElektroinstallationsItems);
                sidebarView.highlightStage(currentLevelElektroinstallationsItems);
                shoppinglistView.getProjects(currentLevelElektroinstallationsItems);
            },
            error: function(data){
                console.log("ERROR\n" + data);
            }
        });
    }
    , reloadCurrentData : function(){
        ElectroController.fetchData(ElectroController.requestHistory[ElectroController.requestHistory.length -1]);
    }
    , createNewElement : function(requestObject){
        $.ajax({
            url: ElectroController.currentBackendAddress,
            type: "post",
            data: {data: JSON.stringify(requestObject)},
            dataType: "json",
            cache: false,
            success: function(){
                ElectroController.reloadCurrentData();
            },
            error: function(data){
                console.log("ERROR\n" + data);
            }
        });
    }
    , onBackButton : function(){
        if(ElectroController.requestHistory.length > 1){
            ElectroController.requestHistory.pop();
            ElectroController.reloadCurrentData();
        } else {
            ElectroController.reloadCurrentData();
        }
    }
}

$(document).ready(function(){

    var initialRequest = {action : "getlist" , listtype : "PROJECTS" , parentid : "1"};

    $("#backButton").click(ElectroController.onBackButton); 
    ElectroController.fetchData(initialRequest);
});