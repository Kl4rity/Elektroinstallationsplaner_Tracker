class electroInstallationItem {
    constructor(name, id, created, lastChanged){
        this.name = name;
        this.id = id;
        this.created = created;
        this.lastChanged = lastChanged;
        
        this.deleteItem = function() {
            console.log("AJAX request to delete the item will be triggered here.");
        }

        this.fetchChildren = function() {
            console.log("AJAX request to fetch Children will be triggered here.");
        }
    }
}

class Project extends electroInstallationItem {
    constructor(responseItem){
        super(responseItem.name, responseItem.id, responseItem.created, responseItem.last_change);

        this.update = function(){
            console.log("AJAX request to update the item will be triggered here.");
        }
    }
}

class Floor extends electroInstallationItem {
    constructor(responseItem){
        super(responseItem.name, responseItem.id, responseItem.created, responseItem.last_change);

        this.floorCountFromBasement = responseItem.floor_count_from_basement;
        this.parentID = responseItem.projects_id;

        this.update = function(){
            console.log("AJAX request to update the item will be triggered here.");
        }
    }
}

class Room extends electroInstallationItem {
    constructor(responseItem){
        super(responseItem.name, responseItem.id, responseItem.created, responseItem.last_change);

        this.parentID = responseItem.floors_id;

        this.update = function(){
            console.log("AJAX request to update the item will be triggered here.");
        }
    }
}

class Loader extends electroInstallationItem {
    constructor(responseItem){
        super(responseItem.name, responseItem.id, responseItem.created, responseItem.last_change);

        this.parentID = responseItem.rooms_id;

        this.update = function(){
            console.log("AJAX request to update the item will be triggered here.");
        }
    }
}

class Sensor extends electroInstallationItem {
    constructor(responseItem){
        super(responseItem.name, responseItem.id, responseItem.created, responseItem.last_change);

        this.parentID = responseItem.devices_id;
        this.unit = responseItem.unit;
        this.value = responseItem.value;

        this.update = function(){
            console.log("AJAX request to update the item will be triggered here.");
        }
    }
}

// class CircuitBreaker extends electroInstallationItem {
//     constructor(responseItem){
//         super(responseItem.name, responseItem.id, responseItem.created, responseItem.last_change);

//         this.update = function(){
//             console.log("AJAX request to update the item will be triggered here.");
//         }
//     }
// }

// class Fuse extends electroInstallationItem {
//     constructor(responseItem){
//         super(responseItem.name, responseItem.id, responseItem.created, responseItem.last_change);

//         this.update = function(){
//             console.log("AJAX request to update the item will be triggered here.");
//         }
//     }
// }