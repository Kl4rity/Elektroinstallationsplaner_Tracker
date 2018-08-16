
var shoppinglistController = {
    backendAddress: "http://localhost/Semester2Project/Elektroinstallationsplaner_Tracker/implementation/backend/index.php"
    , fetchData: function (projectsRequest) {
        $.ajax({
            url: shoppinglistController.backendAddress,
            type: "post",
            data: { data: JSON.stringify(projectsRequest) },
            dataType: "json",
            cache: false,
            success: function (data) {
                slItems = createShoppinglistItem(data);
                shoppinglistView.buildProjects(slItems);
            },
            error: function (data) {
                console.log("ERROR\n" + data);
            }
        });
    }

    , fetchShoppinglist: function (slRequest) {
        $.ajax({
            url: shoppinglistController.backendAddress,
            type: "post",
            data: { data: JSON.stringify(slRequest) },
            dataType: "json",
            cache: false,
            success: function (data) {
                console.log(data);
                //shoppingListDevice = createShoppinglistDevice(data);
                //shoppinglistView.buildShoppinglist(shoppingList);
            },
            error: function (data) {
                console.log("shit aint happening" + data);
            }
        });
    }
}