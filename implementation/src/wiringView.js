var wiringView = {

    //build Projects to choose WiringList from
    buildProjects: function (wlItems) {

        $.each(wlItems, function (index, value) {
            var projectNameItem = "<tr> <td class='wiringProjectName' id=" + value.id + ">" + value.name + "</td></tr>";
            $(".wiringList").prepend(projectNameItem);
        })
        $(".wiringProjectName").click(function (event) {
            $(".singleWiringDiv").empty();
            var wlRequest = { action: 'get-circuitplan', parentid: event.target.id };
            wiringController.fetchWiringlist(wlRequest);
        })

        $(".wiringProjectName").click(function () {
                var wiringProjectTitle = "CIRCUIT PLAN: " + $(this).text();
            $(".circuitPlan").text(wiringProjectTitle);
            })
    }

    //build WiringList basis with Circuit Breaker Name
    , buildWiringlist: function (cbName) {
        var idCount = 0;
        var rowCount = 0;
        var rowCountDevice = 0;
        $.each(cbName, function (index, value) {
            var cbHeader = value.name;
            var wiringList = "<div class='singleWiringDiv'><h4 class='cbTitle'>Circuit Breaker: " + cbHeader + "</h4> <table class='table table-bordered'>"
                + "<thead class='table-head wiringFuses-" + idCount + "'><tr><th class='tableHeadWiring'> Fuses </th><th colspan='20' class='tableHeadWiring devicesHead' >Devices</th></tr></thead><tbody class='wiringDevices-" + idCount + "'></tbody></table></div>";
            idCount++;
            $(".outsideCircuitDiv").prepend(wiringList);
        })

        //add fuses to wiring list
        for (var i = 0; i < cbName.length; i++) {
            $.each(cbName[i].fuses, function (index, value) {
                var fuse = "<tr class='rowNumber-" + rowCount + "'><td class='fuseData'>" + value.name + "</td></tr>";
                rowCount++;
                $(".wiringDevices-" + i).append(fuse);
            })
        }

        //add devices to wiring list
        for (var i = 0; i < cbName.length; i++) {
            var fuses = cbName[i].fuses;
            for (var j = 0; j < fuses.length; j++) {
                $.each(fuses[j].devices, function (index, value) {
                    var device = "<td>" + value.name + "</td>";
                    $(".rowNumber-" + rowCountDevice).append(device);
                })
                rowCountDevice++;
            }
        }
    }
}
