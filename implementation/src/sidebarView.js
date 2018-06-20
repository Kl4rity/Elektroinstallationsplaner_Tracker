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
            $("." + stageName).css("text-decoration", "Underline");
            } else {
            $("." + stages[i]).css("text-decoration", "none");
    }
}}

}
