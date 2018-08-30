var shoppinglistView = {
    buildProjects: function (slItems) {
       
        $.each(slItems, function (index, value) {
            var projectNameItem = "<tr> <td class='projectName' id=" + value.id + ">" + value.name + "</td></tr>";
            $(".shoppingList").prepend(projectNameItem);
        })
        $(".projectName").click(function (event) {
            $(".shoppingListRow").empty();
            var slRequest = { action: 'get-shoppinglist', parentid: event.target.id };
            shoppinglistController.fetchShoppinglist(slRequest);
        })

        $(".projectName").click(function () {
            $(".shoppingListData").empty();
            var shoppingProjectTitle = "SHOPPINGLIST: " + $(this).text();
            var shoppingProjectTable = "<table class='table table-bordered'><thead class='table-head'><tr><th>DEVICE</th>"
                + "<th>QUANTITY</th><th class='tableHeadSensors' colspan='20'>SENSORS</th></tr></thead>"
                + "<tbody class='shoppingListRow'></tbody ></table>"
            $(".shoppingListHeader").text(shoppingProjectTitle);
            $(".shoppingListData").append(shoppingProjectTable);
        })
    }

    , buildShoppinglist: function (slDevice) {
        var idCount = 0;
        var rowCount = 0;    
        $.each(slDevice, function (index, value) {
            var shoppinglistItem = "<tr class='shoppingDevices-" + idCount + "'> <td class='tdValue'>" + value.name + "</td> <td>" + value.count + "</td> </tr>";
            idCount++;
            $(".shoppingListRow").prepend(shoppinglistItem);
        })

        //add sensors to shopping list
        for (var i = 0; i < slDevice.length; i++) {
            $.each(slDevice[i].sensor, function (index, value) {
                var sensor = "<td class='sensorData'>" + value.name + "</td>";
                $(".shoppingDevices-" + i).append(sensor);
            })
        }
    }
}

//shoppinglist Controller erstellen. DIeser macht 2 Ajax Abfragen (1x Projektname, 1x Get Shoppinglist)