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
    }

    , checkWhetherDevicesExist : function(){

    }

    , checkWhetherFusesExist : function(){

    }

    , isReadyForWiring : function(){

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
