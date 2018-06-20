var createElektroInstallationsItems = function (responseData){
        lsItems = [];
        switch(responseData.currentLevel.toLowerCase()){
            case "projects":
                responseData.data.forEach(function(listItem){
                    lsItems.push(new Project(listItem, responseData.currentLevel, responseData.nextLevel)); 
                });
                break;
            case "floors":
                responseData.data.forEach(function(listItem){
                    lsItems.push(new Floor(listItem, responseData.currentLevel, responseData.nextLevel)); 
                });
                break;

            case "rooms":
                responseData.data.forEach(function(listItem){
                    lsItems.push(new Room(listItem, responseData.currentLevel, responseData.nextLevel)); 
                });
                break;

            case "devices":
                console.log(responseData.data);
                responseData.data.forEach(function(listItem){
                    lsItems.push(new Loader(listItem, responseData.currentLevel, responseData.nextLevel)); 
                });
                break;

            case "sensors":
                responseData.data.forEach(function(listItem){
                    lsItems.push(new Sensor(listItem, responseData.currentLevel, responseData.nextLevel)); 
                });
                break;

            default:
                console.log("ERROR: Listtype not known.");
                return;
        }
        console.log(lsItems);
        return lsItems;
    }

class electroInstallationItem {
    constructor(itemData, currentLevel, nextLevel){
        this.name = itemData.name;
        this.id = itemData.id;
        this.created = itemData.created;
        this.lastChanged = itemData.last_change;
        self = this;

        this.fetchChildrenPostRequest = {
            action : "getlist"
            , listtype : nextLevel
            , parentid : this.id
        }

        this.deletePostRequest = {
            action : "delete"
            , listtype : currentLevel
            , itemid : this.id
        };

        this.updatePostRequest = {
            action : "update"
            , listtype : currentLevel
            , itemid : this.id
            , specification : null
        };

        this.createPostRequest = {
            action: "create"
            , listtype : currentLevel
            , parentid : null
            , specification : null
        }
        
        this.ajaxRequest = function(postRequest) {
            console.log("The post request is: " + JSON.stringify(postRequest));
            $.ajax({
                url: "http://localhost/Semester2Project/Elektroinstallationsplaner_Tracker/implementation/backend/index.php"
                , type: "post"
                , data: {data: JSON.stringify(postRequest)}
                , dataType: "json"
                , cache: false
                , success: function(data){
                    console.log("SUCCESS: \n" + data);
                } 
                , error : function(data){
                    console.log("ERROR: \n" + JSON.stringify(data));
                }
            });
        }

        this.fetchChildren = function(){
            console.log("AJAX Request to fetch Children will be triggered here.");
            ElectroController.fetchData(self.fetchChildrenPostRequest);
        }
        
        this.delete = function(){
            $(this).closest("tr")[0].remove();
            console.log("AJAX request to delete item will be triggered here.");
            self.ajaxRequest(self.deletePostRequest);
        }
        
        this.update = function(specification){
            console.log("Specification to be set: " + specification);
            self.updatePostRequest.specification = specification;
            self.ajaxRequest(self.updatePostRequest);
        }
        
        this.create = function(createParentId, specification){
            self.createPostRequest.parentid = createParentId;
            self.createPostRequest.specification = specification;
            self.ajaxRequest(self.createPostRequest);
        }
    }
}

class Project extends electroInstallationItem {
    constructor(itemData, currentLevel, nextLevel){
        super(itemData, currentLevel, nextLevel);
        this.parentid = 0;
    }
}

class Floor extends electroInstallationItem {
    constructor(itemData, currentLevel, nextLevel){
        super(itemData, currentLevel, nextLevel);

        this.floorCountFromBasement = itemData.floor_count_from_basement;
        this.parentId = itemData.projects_id;
    }
}

class Room extends electroInstallationItem {
    constructor(itemData, currentLevel, nextLevel){
        super(itemData, currentLevel, nextLevel);

        this.parentId = itemData.floors_id;
    }
}

class Loader extends electroInstallationItem {
    constructor(itemData, currentLevel, nextLevel){
        super(itemData, currentLevel, nextLevel);

        this.parentId = itemData.rooms_id;
    }
}

class Sensor extends electroInstallationItem {
    constructor(itemData, currentLevel, nextLevel){
        super(itemData, currentLevel, nextLevel);

        this.parentId = itemData.devices_id;
        this.unit = itemData.unit;
        this.value = itemData.value;
    }
}

// class CircuitBreaker extends electroInstallationItem {
//     constructor(itemData, currentLevel, nextLevel){
//         super(itemData, currentLevel, nextLevel);
//     }
// }

// class Fuse extends electroInstallationItem {
//     constructor(itemData, currentLevel, nextLevel){
//         super(itemData, currentLevel, nextLevel);
//     }
// }