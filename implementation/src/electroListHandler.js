var electroListHandler = {
    buildList: function (lsItems, listtype, parentid) {
        $("#shoppingListBtn").unbind();
        $(".appendedRow").empty();

        $(".appendedRow").attr("listtype", listtype);
        $(".appendedRow").attr("parentid", parentid);

        if(lsItems.length >= 1){
            $.each(lsItems, function (index, value) {

<<<<<<< HEAD
                // console.log(value);
=======
                //console.log(value);
>>>>>>> blue
    
                objectName = value.constructor.name.toUpperCase();
                floorName = value.name;
                var deleteButtonId = "deleteButton-" + index;
                var editButtonId = "editButton-" + index;
                var floorNameId = "floorName-" + index;
    
                var listItem = "<tr itemId=" + value.id + "> <td class='name' id=" + floorNameId + ">" + floorName + "</td><td class='extraData'></td><td align='right'><div class='btn-group mr-2' role='group' aria-label='First group'>"
                    + "<button type ='button' class='btn btn-secondary editButton' id=" + editButtonId + " data-toggle='modal' data-target='#exampleModalCenter'><img src='../icons/edit.png' width='25px' height='25px'></button>"
                    + "<button type ='button' class='btn btn-secondary deleteButton' id=" + deleteButtonId + "><img src='../icons/delete.png' width='25px' height='25px'></button>"
                    + "</div></td></tr> ";
                $(".appendedRow").prepend(listItem);
    
                $("#" + deleteButtonId).click(value.delete);
    
                $("#" + editButtonId).click(function () {
                    addDialogueView.editExistingEntryDialogue($(this));
                });
                $("#" + floorNameId).click(value.fetchChildren);
    
                //Change Title of Project when ProjectName is clicked
                $(".name").click(function () {
                    if (objectName == "PROJECT") {
                        var projectTitle = $(this).text();
                        $("#projectHeadTitle").text(projectTitle);
                    }
                });           
            });
        } else if (lsItems.length == 0){
            console.log("nothing here.");

            var listItem = "<tr> <td class='name'> It is lonely here! Add an item!</td><td class='extraData'></td></tr> ";
                $(".appendedRow").prepend(listItem);
        }
        this.showStageTitle(listtype); 

        $("#shoppingListBtn").click(function () {
            var projectsRequest = { action: 'getlist', listtype: 'PROJECTS', parentid: '1' };
            switchView("pageShoppingList");
            shoppinglistController.fetchData(projectsRequest);
        });
    }
    , createItem: function () {
        var itemData = 5;
        var currentLevel = 1;
        var nextLevel = 2;
        var newItem = new electroInstallationItem(itemData, currentLevel, nextLevel);
        newItem.create();
    }

    , showStageTitle: function (listtype) {
        $("#listTitle").text(listtype.toUpperCase());
    }

    , createProjectTitle: function () {
        var projectTitle = $(this).text();
        console.log(projectTitle);
    }
}

