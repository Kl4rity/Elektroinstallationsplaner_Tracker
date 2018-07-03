var sidebarView = {
    highlightStage: function (lsItems) {
        

        $.each(lsItems, function (index, value) {
            stageName = value.constructor.name;
            //console.log(stageName);

        })

        this.chooseStage(stageName);
        
    }

    , chooseStage: function (stageName) {
        var stages = ["Floor", "Room", "Loader", "Sensor"];
        for (i = 0; i < stages.length; i++) {
            if (stageName == stages[i]) {
                $("." + stageName).css({ "background": "white", "color": "rgb(124, 198, 214)" });
            } else {
                $("." + stages[i]).css({ "background": "rgb(124, 198, 214)", "color": "white" });
    }
}}

}
