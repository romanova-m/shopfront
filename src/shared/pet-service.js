import Configuration from './configuration';
class PetService {
    constructor() {
        this.config = new Configuration();
    }
    async retrieveItems() {
        return fetch(this.config.ITEM_COLLECTION_URL, {
            method: "GET",
            mode: "cors",
            headers: {
                //"Authorization": "Bearer MiB1c2Vy.NzVkMGY5ZjM4NTY0MGY4YWRmMTIzZjNjNjlmYWY3MjljYjczZmFhYWMyODFlMzIzMzhhMjVmNjc4OGUwYzQyOQ==",
                //"Content-Type": "application/json;charset=UTF-8",
                }
        })
            .then(response => {
                if (!response.ok) {
                    this.handleResponseError(response);
                }
                return response.json();
            })
            .then(json => {
                console.log("Retrieved items:");
                console.log(json);
                const items = [];
                //const itemArray = json._embedded.collectionItems;
                //console.log(itemArray);
                //for(let i = 0; i < itemArray.length; i++) {
                //    itemArray[i]["link"] =  itemArray[i].link.self.href;
                //    items.push(itemArray[i]);
                //}
                for(let i = 0; i < json.length; i++) {
                    //json[i].link.self.href= json[i].id;
                    items.push(json[i]);
                }
                return items;
            })
            .catch(error => {
                this.handleError(error);
            });
    }
    async getItem(itemId) {
        console.log("ItemService.getItem():");
        console.log("Item: " + itemId);
        return fetch(this.config.ITEM_COLLECTION_URL + "/" + itemId)
            .then(response => {
                if (!response.ok) {
                    this.handleResponseError(response);
                }
                return response.json();
            })
            .then(item => {
                console.log("Item: " + item);
                    return item;
                }
            )
            .catch(error => {
                this.handleError(error);
            });
    }
    async createItem(newitem) {
        console.log("ItemService.createItem():");
        console.log(newitem);
        return fetch(this.config.ITEM_COLLECTION_URL, {
            method: "PUT",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                //"Authorization": "Bearer MiB1c2Vy.NzVkMGY5ZjM4NTY0MGY4YWRmMTIzZjNjNjlmYWY3MjljYjczZmFhYWMyODFlMzIzMzhhMjVmNjc4OGUwYzQyOQ=="
            },
            body: JSON.stringify(newitem)
        })
            .then(response => {
                if (!response.ok) {
                    this.handleResponseError(response);
                }
                return response.json();
            })
            .catch(error => {
                this.handleError(error);
            });
    }
    async deleteItem(itemId) {
        console.log("ItemService.deleteItem():");
        console.log("item: " + itemId);
        return fetch(this.config.ITEM_COLLECTION_URL + "/" + itemId, {
            method: "DELETE",
            mode: "cors"
        })
            .then(response => {
                if (!response.ok) {
                    this.handleResponseError(response);
                }
            })
            .catch(error => {
                this.handleError(error);
            });
    }
    async updateItem(item) {
        console.log("ItemService.updateItem():");
        console.log(item);
        return fetch(this.config.ITEM_COLLECTION_URL + "/" + item.id, {
            method: "PUT",
            mode: "cors",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(item)
        })
            .then(response => {
                if (!response.ok) {
                    this.handleResponseError(response);
                }
                return response.json();
            })
            .catch(error => {
                this.handleError(error);
            });
    }
    handleResponseError(response) {
        throw new Error("HTTP error, status = " + response.status);
    }
    handleError(error) {
        console.log(error.message);
    }
}
export default PetService;