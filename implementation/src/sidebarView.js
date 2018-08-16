var sidebarView = {
    projectId : null

    , chooseStage: function (stageName) {
        var stages = ["floors", "rooms", "devices", "sensors", "circuit_breakers", "fuses", "wiring"];
        for (i = 0; i < stages.length; i++) {
            if (stageName == stages[i]) {
                $("." + stageName).addClass("currentlyActiveElement");
            } else {
                $("." + stages[i]).removeClass("currentlyActiveElement");
            }
        }   
    }

    , handleChangeOfView : function(requestObject){
        if (requestObject.listtype == "floors"){
            sidebarView.projectId = requestObject.parentid;
            sidebarView.attachLinkToCircuitBreakerHook();
            sidebarView.attachLinkToPlanningHook();
        }
        if (requestObject.listtype == "projects"){
            sidebarView.projectId = null;
            sidebarView.removeLinkFromCircuitBreakerHook();
            sidebarView.removeLinkFromPlanningHook();
        }

        if (sidebarView.projectId == null) {
            sidebarView.removeLinkFromWiringUpHook();
            sidebarView.removeLinkFromReportingHook();
        } else {
            queryService.checkStatusQuery({parentid: sidebarView.projectId, action: "get-wiringstatus", successFunction: sidebarView.wiringStatusObserver});
        }
    }
    , wiringStatusObserver : function(data){
        if (data.hasDevicesAndFuses){
            sidebarView.attachLinkToWiringUpHook();
            sidebarView.attachLinkToReportingHook();
        } else {
            sidebarView.removeLinkFromWiringUpHook();
            sidebarView.removeLinkFromWiringUpHook();
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
    , attachLinkToReportingHook : function(){
        $("#reportingHook").on("click", function(){
            var projectsRequest = { action: 'getlist', listtype: 'PROJECTS', parentid: '1' };
            switchView("pageShoppingList");
            shoppinglistController.fetchData(projectsRequest);
        });
        $("#reportingHook").addClass("activeSidebarLink");
    }
    , removeLinkFromReportingHook : function(){
        $("#reportingHook").off("click");
        $("#reportingHook").removeClass("activeSidebarLink");
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
}
