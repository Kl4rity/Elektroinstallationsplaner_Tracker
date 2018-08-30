var createWiringlistItem = function (data) {
    projectNames = [];

    for (var i = 0; i < data.data.length; i++) {
        item = { "name": data.data[i].name, "id": data.data[i].id};
        projectNames.push(item);
        //    var name = data.data[i].name;
        //    slItems[i] = name;
    };
    return projectNames;
}

var createCbName = function (data) {
    cbName = [];
    for (var i = 0; i < data.circuitplan.length; i++) {
        
        item = { "name": data.circuitplan[i].name, "fuses": data.circuitplan[i].fuses};
        cbName.push(item);
    }
    return cbName; 
}

