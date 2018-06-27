var views = ["page1", "pageShoppingList"]

var switchView = function switchView(newView) {
    for (i = 0; i < views.length; i++) {
        if (newView == views[i]) {
            $("#" + newView).show();
        } else {
            $("#" + views[i]).hide()
        }
    }
}
