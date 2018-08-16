var shoppinglistView = {
    buildProjects: function (slItems) {
        console.log(slItems);

        $.each(slItems, function (index, value) {
            var projectNameItem = "<tr> <td class='projectName' id=" + value.id + ">" + value.name + "</td></tr>";
            $(".shoppingList").prepend(projectNameItem);
        })
        $(".projectName").click(function (event) {
            $(".shoppingListRow").empty();
            var slRequest = { action: 'get-shoppinglist', parentid: event.target.id };
            shoppinglistController.fetchShoppinglist(slRequest);
        })
    }

    , buildShoppinglist: function (slDevice) {
        $.each(slDevice, function (index, value) {
            var shoppinglistItem = "<tr> <td>" + value.name + "</td> <td>" + value.count + "</td> </tr>";
            $(".shoppingListRow").prepend(shoppinglistItem);
        })
    }
}

//shoppinglist Controller erstellen. DIeser macht 2 Ajax Abfragen (1x Projektname, 1x Get Shoppinglist)