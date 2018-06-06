$(document).ready(function(){

    lsDummyData = [{
        name : "Erdgeschoss"
        , floor_count_from_basement : 1
        , id : 3
        , parent_id : 4
    },
    {
        name : "Erster Stock"
        , floor_count_from_basement : 2
        , id : 4
        , parent_id : 4
    },
    {
        name : "Zweiter Stock"
        , floor_count_from_basement : 3
        , id : 5
        , parent_id : 4
    },
    {
        name : "Keller"
        , floor_count_from_basement : 0
        , id : 6
        , parent_id : 4
    }];

    electroListHandler.buildList(lsDummyData);

});