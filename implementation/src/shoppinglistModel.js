var createShoppinglistItem = function (data) {
    slItems = [];
    for (var i = 0; i < data.data.length; i++) {
        slItems.push(data.data[i].name);
    };
    return slItems;
}
