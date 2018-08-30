var wiringController = {
    backendAddress: "http://localhost/Semester2Project/Elektroinstallationsplaner_Tracker/implementation/backend/index.php"
    , fetchData: function (projectsRequest) {
        $.ajax({
            url: wiringController.backendAddress,
            type: "post",
            data: { data: JSON.stringify(projectsRequest) },
            dataType: "json",
            cache: false,
            success: function (data) {
                wlItems = createWiringlistItem(data);
                wiringView.buildProjects(wlItems);
            },
            error: function (data) {
                console.log("ERROR\n" + data);
            }
        });
    }
    , fetchWiringlist: function (wlRequest) {
        $.ajax({
            url: shoppinglistController.backendAddress,
            type: "post",
            data: { data: JSON.stringify(wlRequest) },
            dataType: "json",
            cache: false,
            success: function (data) {          
                cbName = createCbName(data);
                wiringView.buildWiringlist(cbName);

            },
            error: function (data) {
                console.log("ERROR\n" + data);
            }
        });
    }
}