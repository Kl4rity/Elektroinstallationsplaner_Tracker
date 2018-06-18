var electroListHandler = {
    buildList: function (lsItems) {

        $(".deleteButton").unbind();

        $.each(lsItems, function (index, value) {
            var floorName = value.name;
            var deleteButtonId = "deleteButton-" + index;
            var editButtonId = "editButton-" + index;
            var floorNameId = "floorName-" + index;

            var listItem = "<tr> <td class='name' id=" + floorNameId + ">" + floorName + "</td><td class='extraData'></td><td align='right'><div class='btn-group mr-2' role='group' aria-label='First group'>"
                + "<button type ='button' class='btn btn-secondary editButton' id=" + editButtonId + "><img src='../icons/edit.png' width='25px' height='25px'></button>"
                + "<button type ='button' class='btn btn-secondary detailsButton'><img src='../icons/show.png' width='25px' height='25px'></button>"
                + "<button type ='button' class='btn btn-secondary deleteButton' id=" + deleteButtonId + "><img src='../icons/delete.png' width='25px' height='25px'></button>"
                + "</div></td></tr> ";
            $(".appendedRow").prepend(listItem);
            $("#" + deleteButtonId).click(value.delete);
            $("#" + editButtonId).click(value.update);
            $("#" + floorNameId).click(value.fetchChildren);
            $("#" + floorNameId).hover(this.hoverEffect);


        });



        //$(".deleteButton").click(this.delete);
        //$(".detailsButton").click(this.showDetails);
        //$(".editButton").click(this.editRow);
        //$(".saveBtn").click(this.createItem);
    }

    , deleteRow: function () {
        //löscht die aktuelle Liste
        $(this).parents("tr:first")[0].remove();
        //get text value of parent with classname "name" 
        //var itemName = ($(this).parents().find(".name").text());
        var itemData = 5;
        var currentLevel = 1;
        var nextLevel = 2;
        var deleteItem = new electroInstallationItem(itemData, currentLevel, nextLevel);
        electroInstallationItem.delete();
    }

    , showDetails: function () {
        console.log("clicked");
    }

    , editRow: function () {
        console.log("Seas!");

    }

    , createItem: function () {
        var itemData = 5;
        var currentLevel = 1;
        var nextLevel = 2;
        var newItem = new electroInstallationItem(itemData, currentLevel, nextLevel);
        newItem.create();
    }

    , hoverEffect: function (floorNameId) {
            $(this).css("background-color", "yellow");
            $(this).css("text-decoration", "underline");
        }, function () {
            $(this).css("background-color", "");
            $(this).css("text-decoration", "none");
        }
}

//funktionen der Objektinstanz auf die Buttons setzen und in der Console ausgeben