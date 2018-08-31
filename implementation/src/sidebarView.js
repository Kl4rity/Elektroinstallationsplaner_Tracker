var sidebarView = {
    projectId : null

    , chooseStage: function (stageName) {
        var stages = ["projects", "floors", "rooms", "devices", "sensors", "circuit_breakers", "fuses", "wiring"];
        for (i = 0; i < stages.length; i++) {
            if (stageName == stages[i]) {
                $("." + stageName).addClass("currentlyActiveElement");
            } else {
                $("." + stages[i]).removeClass("currentlyActiveElement");
            }
        }   
    }

    , handleChangeOfView : function(requestObject){
        if (requestObject.listtype == "projects"){
            sidebarView.projectId = null;
            sidebarView.removeLinksNeedingProjectId();
        }

        if (sidebarView.projectId == null) {
            sidebarView.removeLinksNeedingDevicesAndFuses();
        } else {
            sidebarView.setLinksNeedingProjectId();
            queryService.checkStatusQuery({parentid: sidebarView.projectId, action: "get-wiringstatus", successFunction: sidebarView.wiringStatusObserver});
        }
    }
    , setProjectsId(id){
        sidebarView.projectId = id;
    }
    , wiringStatusObserver : function(data){
        if (data.hasDevicesAndFuses){
            sidebarView.setLinksNeedingDevicesAndFuses();
        } else {
            sidebarView.removeLinksNeedingDevicesAndFuses();
        }
    }
    , attachLinkToPlanningHook : function(){
        $("#planningHook").on("click", function(){
            queryService.loadNewView({ action: 'getlist', listtype: 'FLOORS', parentid: sidebarView.projectId });
        });
        $("#planningHook").addClass("activeSidebarLink");
    }
    , removeLinkFromPlanningHook : function(){
        $("#planningHook").off("click");
        $("#planningHook").removeClass("activeSidebarLink");
    }
    , attachLinkToWiringUpHook : function(){
        $("#wiringUpHook").on("click", function(){
            queryService.loadNewView({action : "get-wiringdata" , listtype : "Wiring" , parentid : sidebarView.projectId});
        });
        $("#wiringUpHook").addClass("activeSidebarLink");
    }
    , removeLinkFromWiringUpHook : function(){
        $("#wiringUpHook").off("click");
        $("#wiringUpHook").removeClass("activeSidebarLink");
    }
    , attachLinkToCircuitBreakerHook : function(){
        $("#circuitBreakerHook").on("click", function(){
            queryService.loadNewView({action : "getlist" , listtype : "CIRCUIT_BREAKERS" , parentid : sidebarView.projectId});
        });
        $("#circuitBreakerHook").addClass("activeSidebarLink");
    }
    , removeLinkFromCircuitBreakerHook : function(){
        $("#circuitBreakerHook").off("click");
        $("#circuitBreakerHook").removeClass("activeSidebarLink");
    }
    , setLinksNeedingProjectId : function(){
        sidebarView.attachLinkToCircuitBreakerHook();
        sidebarView.attachLinkToPlanningHook();
    }
    , removeLinksNeedingProjectId : function (){
        sidebarView.removeLinkFromCircuitBreakerHook();
        sidebarView.removeLinkFromPlanningHook();
    }
    , setLinksNeedingDevicesAndFuses : function(){
        sidebarView.attachLinkToWiringUpHook();
    }
    , removeLinksNeedingDevicesAndFuses : function(){
        sidebarView.removeLinkFromWiringUpHook();
    }
}
