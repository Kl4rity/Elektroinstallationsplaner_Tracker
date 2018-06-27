var electroListHandler = {
    buildList: function (lsItems) {

        $(".appendedRow").empty();
        
        $.each(lsItems, function (index, value) {
 
            objectName = value.constructor.name.toUpperCase();
            floorName = value.name;
            var deleteButtonId = "deleteButton-" + index;
            var editButtonId = "editButton-" + index;
            var floorNameId = "floorName-" + index;

            var listItem = "<tr itemId=" + value.id +"> <td class='name' id=" + floorNameId + ">" + floorName + "</td><td class='extraData'></td><td align='right'><div class='btn-group mr-2' role='group' aria-label='First group'>"
                + "<button type ='button' class='btn btn-secondary editButton' id=" + editButtonId + " data-toggle='modal' data-target='#exampleModalCenter'><img src='../icons/edit.png' width='25px' height='25px'></button>"
                + "<button type ='button' class='btn btn-secondary detailsButton'><img src='../icons/show.png' width='25px' height='25px'></button>"
                + "<button type ='button' class='btn btn-secondary deleteButton' id=" + deleteButtonId + "><img src='../icons/delete.png' width='25px' height='25px'></button>"
                + "</div></td></tr> ";
            $(".appendedRow").prepend(listItem);

            $("#" + deleteButtonId).click(value.delete);
            
            $("#" + editButtonId).click(function(){
                addDialogueView.editExistingEntryDialogue($(this));
            });
            $("#" + floorNameId).click(value.fetchChildren);

            
            
        });

        this.getProjectName();

        this.showStageTitle(); 
    }



    //, deleteRow: function () {
    //    //l�scht die aktuelle Liste
    //    $(this).parents("tr:first")[0].remove();
    //    //get text value of parent with classname "name" 
    //    //var itemName = ($(this).parents().find(".name").text());
    //}

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

    , showStageTitle: function () {
        $("#listTitle").text(objectName + "S");
    }

    , getProjectName: () => {  
        var newObjectName;
        var setNewObjectName =  () => {
            if (objectName == "PROJECT") {
                console.log(objectName);
                $(".name").click(function () {
                    newObjectName = $(this).text();
                    return newObjectName;
                })  
                
            }   
            
        }
        console.log(newObjectName);
    }

    , updateProjectName: function () {
        var newName = this.getProjectName();
        $("#projectHeadTitle").text(newName);
        }
}

//funktionen der Objektinstanz auf die Buttons setzen und in der Console ausgeben