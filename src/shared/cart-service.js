import Configuration from './configuration';
class CartService {
    constructor() {
        this.config = new Configuration();
    }
    async retrieveItems() {
        return fetch(this.config.CART_COLLECTION_URL, {
            method: "GET",
            mode: "cors",
            headers: {
            }
        })
            .then(response => {
                if (!response.ok) {
                    this.handleResponseError(response);
                }
                return response.json();
            })
            .then(json => {
                console.log("Cart retrieved items:");
                const items = [];
                for (let i = 0; i < json.length; i++) {
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
        return fetch(this.config.CART_COLLECTION_URL + "/" + itemId, {
            body:{
                "userId": 1
            }})
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
    async createItem(item) {
        console.log("ItemService.createItem():");
        console.log(item);
        return fetch(this.config.CART_COLLECTION_URL, {
            method: "PUT",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                //"Authorization": "Bearer MiB1c2Vy.NzVkMGY5ZjM4NTY0MGY4YWRmMTIzZjNjNjlmYWY3MjljYjczZmFhYWMyODFlMzIzMzhhMjVmNjc4OGUwYzQyOQ=="
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
    async deleteItem(itemId) {
        console.log("ItemService.deleteItem():");
        console.log("item: " + itemId);
        return fetch(this.config.CART_COLLECTION_URL + "/" + itemId, {
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
    async post() {
        console.log("CartService.post();");
        return fetch(this.config.CART_COLLECTION_URL, {
            method: "POST",
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
        console.log("CartService.updateItem():");
        console.log(item);
        return fetch(this.config.CART_COLLECTION_URL + "/" + item.id, {
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
export default CartService;