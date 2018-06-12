var electroListHandler = {
    buildList: function (lsItems) {

        $(".deleteButton").unbind();

        $.each(lsItems, function (index, value) {
            var floorName = value['name'];
            var listItem = "<tr> <td class='name'>" + floorName + "</td><td class='extraData'></td><td align='right'><div class='btn-group mr-2' role='group' aria-label='First group'>"
                + "<button type ='button' class='btn btn-secondary editButton'><img src='../icons/edit.png' width='20px' height='20px'></button>"
                + "<button type ='button' class='btn btn-secondary detailsButton'>S</button>"
                + "<button type ='button' class='btn btn-secondary deleteButton'><img src='../icons/delete.png' width='20px' height='20px'></button>"
                + "</div></td></tr> ";
            $(".appendedRow").prepend(listItem);
        });

        $(".deleteButton").click(this.deleteRow);
        $(".editButton").click(this.editRow);
    }

    , deleteRow: function () {
        //löscht die aktuelle Liste
        $(this).parents("tr:first")[0].remove();
    }

    , editRow: function () {
        console.log("Clicked");
        //$(this).parent().parent().siblings().html("");
        //$(this).parent().parent().siblings().append("<td><input type='text' style='width: 100 % ' class='editName'></td> <td><input type='text' style='width:100%' class='editExtraData'></td>");
        //click eventlistener für die buttons - testen mit console.log

        //CHECK BUTTONS FÜR FRONTEND

    }
}

//funktionen der Objektinstanz auf die Buttons setzen und in der Console ausgeben