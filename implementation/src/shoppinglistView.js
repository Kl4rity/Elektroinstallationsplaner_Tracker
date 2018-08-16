var shoppinglistView = {
    buildProjects: function (slItems) {
        console.log(slItems);
        $.each(slItems, function (index, value) {
            var projectName = value;
            var projectNameId = "projectName-" + index;
            var projectNameItem = "<tr itemId=" + value.id + "> <td class='projectName'>" + projectName + "</td></tr>";
            $(".shoppingList").prepend(projectNameItem);
        })
        $(".projectName").click(function () {
            var slRequest = { action: 'get-shoppinglist', parentid: 1 };
            shoppinglistController.fetchShoppinglist(slRequest);
        })
    }
}

//shoppinglist Controller erstellen. DIeser macht 2 Ajax Abfragen (1x Projektname, 1x Get Shoppinglist)