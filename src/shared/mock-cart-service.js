class CartService {
    constructor() {
        this.items = [
            {
                "id": 3,
                "age": 1,
                "name": "JOHN",
                "price": 50
            },
            {
                "id": 7,
                "age": 2,
                "name": "TED",
                "price": 40
            },
            {
                "id": 5,
                "age": 1,
                "name": "Джон",
                "price": 50
            },
            {
                "id": 6,
                "age": 2,
                "name": "BOB",
                "price": 40
            },
        ];
    }
    async retrieveItems() {
        return Promise.resolve(this.items);
    }
    async getItem(itemLink) {
        for(let i = 0; i < this.items.length; i++) {
            if ( this.items[i].id === itemLink) {
                return Promise.resolve(this.items[i]);
            }
        }
        return null;
    }
    async createItem(item) {
        item.id = this.items.length;
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
export default CartService