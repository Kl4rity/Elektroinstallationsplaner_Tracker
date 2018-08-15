var createShoppinglistItem = function (data) {
    slItems = [];
    for (var i = 0; i < data.data.length; i++) {
        slItems.push(data.data[i].name);
    };
    return slItems;
}

var createShoppinglistDevice = function (data) {
    slDevice = [];
    for (var i = 0; i < data.data.length; i++) {
        slDevice.push(data.shoppinglist[i].devicename);
    };
    return slDevice;
}
