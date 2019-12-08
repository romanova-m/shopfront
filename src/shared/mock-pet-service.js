class ItemService {
    constructor() {
        this.items = [
            {
                "id": 1,
                "age": 1,
                "name": "ALEX",
                "price": 50
            },
            {
                "id": 2,
                "age": 2,
                "name": "BOB",
                "price": 40
            },
            {
                "id": 3,
                "age": 1,
                "name": "JOHN",
                "price": 50
            },
            {
                "id": 4,
                "age": 2,
                "name": "TED",
                "price": 40
            }
        ];
    }
    async retrieveItems() {
        return Promise.resolve(this.items);
    }
    async getItem(itemLink) {
        for(var i = 0; i < this.items.length; i++) {
            if ( this.items[i].link === itemLink) {
                return Promise.resolve(this.items[i]);
            }
        }
        return null;
    }
    async createItem(item) {
        console.log("ItemService.createItem():");
        console.log(item);
        return Promise.resolve(item);
    }
    async deleteItem(itemId) {
        console.log("ItemService.deleteItem():");
        console.log("item ID:" + itemId);
    }
    async updateItem(item) {
        console.log("ItemService.updateItem():");
        console.log(item);
    }
}
export default ItemService;