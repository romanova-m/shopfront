class CartService {
    constructor() {
        this.items = [
            {
                "id": 3,
                "user_id": 1,
                "item_id": 1,
            }
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
        console.log("CartService.createItem():");
        console.log(item);
        return Promise.resolve(item);
    }
    async deleteItem(itemId) {
        console.log("CartService.deleteItem():");
        console.log("item ID:" + itemId);
    }
    async updateItem(item) {
        console.log("CartService.updateItem():");
        console.log(item);
    }
    async post() {
        console.log("CartService.post();");
    }
}
export default CartService