var electroListHandler = {
    buildList: function (lsItems) {
 
        $.each(lsItems, function (index, value) {
            var floorName = value['name'];
            $("#floorName").prepend("<a href='#' class='list-group-item list-group-item-action'>" + floorName + "</a>");
        });


        
    

    }
    , clearList: function () {
        //l�scht die aktuelle Liste

    }
    , bindEditOptions: function () {

        //click eventlistener f�r die buttons - testen mit console.log

        //CHECK BUTTONS F�R FRONTEND

    }
}