var ElectroController = {
    startPage : {action : "getlist" , listtype : "projects" , parentid : "0"}
    , onBackButton : function(){
        queryService.goUpOneLevel();
    }
    , onLogo : function(){
        queryService.goUpToLevel({nameOfList: "projects"});
    }
}

$(document).ready(function(){
    $("#backButton").click(ElectroController.onBackButton);
    $("#projectSelectionHook").click(ElectroController.onLogo);
    addDialogueView.setCleanupEventListener();
    queryService.loadNewView(ElectroController.startPage);
});