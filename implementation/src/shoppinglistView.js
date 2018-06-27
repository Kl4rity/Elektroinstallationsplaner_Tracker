var shoppinglistView = {
    getProjects: function (lsItems) {
        $.each(lsItems, function (index, value) {
            console.log(value);
            var projectName = value.name;
            var projectNameItem = "<tr itemId=" + value.id + "> <td>" + projectName + "</td></tr>";
            $(".shoppingList").prepend(projectNameItem);
        })
    }
}