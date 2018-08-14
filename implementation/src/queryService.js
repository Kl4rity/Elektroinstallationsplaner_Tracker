var queryService = {
    currentBackendAddress : "http://localhost/Semester2Project/Elektroinstallationsplaner_Tracker/implementation/backend/index.php"
    , queryHistory : []
    , loadNewView : function(requestObject){
        console.log(requestObject);

        //pass Data to SidebarView
        sidebarView.handleChangeOfView(requestObject);

        if(!Object.is(requestObject, queryService.queryHistory[queryService.queryHistory.length -1])){
            queryService.queryHistory.push(requestObject);
        }

        $.ajax({
            url: queryService.currentBackendAddress,
            type: "post",
            data: {data: JSON.stringify(requestObject)},
            dataType: "json",
            cache: false,
            success: function(data){
                switchView("page1");
                currentLevelElektroinstallationsItems = createElektroInstallationsItems(data);
                electroListHandler.buildList(currentLevelElektroinstallationsItems, requestObject.listtype, requestObject.parentid);
                addDialogueView.initDialogue(data.currentLevel.toLowerCase(), currentLevelElektroinstallationsItems);
                sidebarView.highlightStage(currentLevelElektroinstallationsItems);
            },
            error: function(data){
                console.log("ERROR\n" + data);
            }
        });
    }
    , reloadQueryAtTopOfStack : function(){
        queryService.loadNewView(queryService.queryHistory[queryService.queryHistory.length -1]);
    }
    , createUpdateDeleteQuery : function(requestObject){
        console.log(requestObject);
        $.ajax({
            url: queryService.currentBackendAddress,
            type: "post",
            data: {data: JSON.stringify(requestObject)},
            dataType: "json",
            cache: false,
            success: function(){
                queryService.reloadQueryAtTopOfStack();
            },
            error: function(data){
                console.log("ERROR\n" + data);
            }
        });
    }
    , goUpOneLevel : function(){
        if(queryService.queryHistory.length > 1){
            queryService.queryHistory.pop();
            queryService.reloadQueryAtTopOfStack();
        } else {
            queryService.reloadQueryAtTopOfStack();
        }
    }
    , goUpToLevel : function({nameOfList}){
        queryService.queryHistory.map(function(query, index){
            if (query.listtype.toLowerCase() === nameOfList){
                queryService.queryHistory.splice((index+1));
            }  
        });
        queryService.reloadQueryAtTopOfStack();
    }
}