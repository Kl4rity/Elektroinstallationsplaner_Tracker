var createElektroInstallationsItems = function (responseData){
        lsItems = [];
        if(responseData.data.length > 1){
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
    
                case "fuses":
                    responseData.data.forEach(function(listItem){
                        lsItems.push(new Fuse(listItem, responseData.currentLevel, responseData.nextLevel)); 
                    });
                    break;
    
                case "circuit_breakers":
                    responseData.data.forEach(function(listItem){
                        lsItems.push(new CircuitBreaker(listItem, responseData.currentLevel, responseData.nextLevel)); 
                    });
                    break;
    
                default:
                    console.log("ERROR: Listtype not known.");
                    return;
            }
            console.log(lsItems);
            return lsItems;
        } else if (responseData.data.length == 1) {
            console.log(responseData.data);
            switch(responseData.currentLevel.toLowerCase()){
                case "projects":
                    lsItems.push(new Project(responseData.data[0], responseData.currentLevel, responseData.nextLevel)); 
                    break;
                case "floors":
                    lsItems.push(new Floor(responseData.data[0], responseData.currentLevel, responseData.nextLevel)); 
                    break;
    
                case "rooms":
                    lsItems.push(new Room(responseData.data[0], responseData.currentLevel, responseData.nextLevel)); 
                    break;
    
                case "devices":
                    lsItems.push(new Device(responseData.data[0], responseData.currentLevel, responseData.nextLevel)); 
                    break;
    
                case "sensors":
                    lsItems.push(new Sensor(responseData.data[0], responseData.currentLevel, responseData.nextLevel)); 
                    break;
    
                case "fuses":
                    lsItems.push(new Fuse(responseData.data[0], responseData.currentLevel, responseData.nextLevel)); 
                    break;
    
                case "circuit_breakers":
                    lsItems.push(new CircuitBreaker(responseData.data[0], responseData.currentLevel, responseData.nextLevel)); 
                    break;
    
                default:
                    console.log("ERROR: Listtype not known.");
                    return;
            }
            console.log(lsItems);
            return lsItems;
        } else {
            return lsItems;
        }
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
            , specification : null
        };

        this.fetchChildren = ()=>{
            queryService.loadNewView(this.fetchChildrenPostRequest);
        }
        
        this.delete = ()=>{
            queryService.createUpdateDeleteQuery(this.deletePostRequest);
        }
        
        this.update = (specification)=>{
            this.updatePostRequest.specification = specification;
            queryService.createUpdateDeleteQuery(this.updatePostRequest);
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

class CircuitBreaker extends electroInstallationItem {
    constructor(itemData, currentLevel, nextLevel){
        super(itemData, currentLevel, nextLevel);
    }
}

class Fuse extends electroInstallationItem {
    constructor(itemData, currentLevel, nextLevel){
        super(itemData, currentLevel, nextLevel);
    }
}