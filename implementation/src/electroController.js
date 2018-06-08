$(document).ready(function(){

    // Hardcoded postrequest for debugging / development purposes.
    var postRequest = '{"action" : "getlist" , "listtype" : "FLOORS" , "parentid" : 2 }'
    // @Roman: Mit dieser URL musst du auf deine Version des Backends zielen - sonst klappt gar nix!
    var currentBackendAddress = "http://localhost/Uebung4/index.php";

    $.ajax({
        url: currentBackendAddress,
        type: "post",
        data: {data: postRequest},
        dataType: "json",
        success: function(data){
            console.log(data);
            electroListHandler.buildList(createElektroInstallationsItems(data));
        },
        error: function(data){
            console.log("ERROR\n" + data);
        }
    });
});