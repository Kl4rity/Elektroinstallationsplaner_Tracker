var createShoppinglistItem = function (data) {
    slItems = [];

    for (var i = 0; i < data.data.length; i++) {
    item = { "name": data.data[i].name, "id": data.data[i].id }; 
    slItems.push(item);
    //    var name = data.data[i].name;
    //    slItems[i] = name;
    };
    return slItems;
}

var createShoppinglistDevice = function (data) {
    slDevice = [];
    for (var i = 0; i < data.shoppinglist.length; i++) {
        item = { "name": data.shoppinglist[i].devicename, "count": data.shoppinglist[i].count, "sensor": data.shoppinglist[i].sensors}
        slDevice.push(item);
    };
    return slDevice;
}
