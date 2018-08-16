var createShoppinglistItem = function (data) {
    console.log(data);
    slItems = [];
    for (var i = 0; i < data.data.length; i++) {
        var name = data.data[i].name;
        //var id = data.data[i].id;
        slItems[i] = name;
        //slItems[i] = id;
       // slItems.push(data.data[i].name);
       // slItems.push(data.data[i].id);
    };
    return slItems;
}

var createShoppinglistDevice = function (data) {
    slDevice = [];
    for (var i = 0; i < data.data.length; i++) {
        slDevice.push(data.shoppinglist[i].devicename);
        slDevice.push(data.shoppinglist[i].count);
    };
    return slDevice;
}
