var sidebarView = {
    projectId : null

    , highlightStage: function (lsItems) {
        $.each(lsItems, function (index, value) {
            stageName = value.constructor.name;
            console.log(stageName);
        })
        this.chooseStage(stageName);
    }

    , chooseStage: function (stageName) {
        var stages = ["Floor", "Room", "Loader", "Sensor", "CircuitBreaker", "Fuse", "Wiring"];
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
        }
        if (requestObject.listtype == "projects"){
            sidebarView.projectId = null;
            sidebarView.removeLinkFromCircuitBreakerHook();
        }

        if (sidebarView.projectId === null) {
            sidebarView.removeLinkFromWiringUpHook();
            sidebarView.removeLinkFromReportingHook();
        } else {
            queryService.checkStatusQuery({parentid: requestObject.parentid, action: "get-wiringstatus", successFunction: sidebarView.wiringStatusObserver});
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
            queryService.loadNewView({action : "getlist" , listtype : "CIRCUIT_BREAKERS" , parentid : sidebarView.projectId});
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
