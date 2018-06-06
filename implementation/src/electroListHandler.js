var electroListHandler = {
    buildList: function (lsItems) {
 
        $.each(lsItems, function (index, value) {
            var floorName = value['name'];
            $("#floorName").prepend("<a href='#' class='list-group-item list-group-item-action'>" + floorName + "</a>");
        });


        
    

    }
    , clearList: function () {
        //löscht die aktuelle Liste

    }
    , bindEditOptions: function () {

        //click eventlistener für die buttons - testen mit console.log

        //CHECK BUTTONS FÜR FRONTEND

    }
}