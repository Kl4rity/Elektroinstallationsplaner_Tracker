var createElektroInstallationsItems = function (responseItem){
        lsItems = [];
        switch(responseItem.currentLevel){
            case "projects":
                rawItemList.forEach(function(listItem){
                    lsItems.push(new Project(listItem, responseItem.currentLevel, responseItem.nextLevel)); 
                });
                break;
            case "floors":
                rawItemList.forEach(function(listItem){
                    lsItems.push(new Floor(listItem, responseItem.currentLevel, responseItem.nextLevel)); 
                });
                break;

            case "rooms":
                rawItemList.forEach(function(listItem){
                    lsItems.push(new Room(listItem, responseItem.currentLevel, responseItem.nextLevel)); 
                });
                break;

            case "loaders":
                rawItemList.forEach(function(listItem){
                    lsItems.push(new Loader(listItem, responseItem.currentLevel, responseItem.nextLevel)); 
                });
                break;

            case "sensors":
                rawItemList.forEach(function(listItem){
                    lsItems.push(new Sensor(listItem, responseItem.currentLevel, responseItem.nextLevel)); 
                });
                break;
                
            default:
                console.log("ERROR: Listtype not known.");
                return;
        }
        return lsItems;
    }

class electroInstallationItem {
    constructor(itemData, currentLevel, nextLevel){
        this.name = itemData.name;
        this.id = itemData.id;
        this.created = itemData.created;
        this.lastChanged = itemData.last_change;

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
            , specification : {
                
            }
        };
        
        this.ajaxRequest = function(postRequest) {
            console.log("The post request is: " + postRequest);
            $.post(window.location.orign, JSON.stringify(postRequest), alert(data));
        }

        this.fetchChildren = function(){
            console.log("AJAX Request to fetch Children will be triggered here.");
            this.ajaxRequest(this.fetchChildrenPostRequest);
        }

        this.update = function(specification){
            console.log("AJAX request to update the item will be triggered here.");
            console.log("Specification to be set: " + specification);
            this.updatePostRequest.specification = specification;
            this.ajaxRequest(this.updatePostRequest);
        }

        this.delete = function(){
            console.log("AJAX request to delete item will be triggered here.");
            this.ajaxRequest(this.deletePostRequest);
        }
    }
}

class Project extends electroInstallationItem {
    constructor(itemData, currentLevel, nextLevel){
        super(itemData, currentLevel, nextLevel);
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