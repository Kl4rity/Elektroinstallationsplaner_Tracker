var shoppinglistView = {
    buildProjects: function (slItems) {
        $.each(slItems, function (index, value) {
            var projectName = value;
            var projectNameItem = "<tr itemId=" + value.id + "> <td>" + projectName + "</td></tr>";
            $(".shoppingList").prepend(projectNameItem);
        })
    }
}

//shoppinglist Controller erstellen. DIeser macht 2 Ajax Abfragen (1x Projektname, 1x Get Shoppinglist)