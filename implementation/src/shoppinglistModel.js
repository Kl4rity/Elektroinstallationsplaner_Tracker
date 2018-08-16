var createShoppinglistItem = function (data) {
    console.log(data);
    slItems = [];
    for (var i = 0; i < data.data.length; i++) {
        var name = data.data[i].name;
        slItems[i] = name;
    };
    return slItems;
}

var createShoppinglistDevice = function (data) {
    slDevice = [];
    for (var i = 0; i < data.data.length; i++) {
        var device = data.shoppinglist[i].devicename;
        slDevice[i] = device;
    };
    return slDevice;
}
