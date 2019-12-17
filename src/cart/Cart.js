import React, { Component } from 'react';
import './Cart.css';
import ItemDetails from '../ItemDetails';
import CartService from '../shared/cart-service';
import { Icon } from "antd";
import { Button } from "antd";
import 'antd/dist/antd.css';
import ItemService from "../shared/pet-service";


class Cart extends Component {
    constructor(props) {
        super(props);
        this.itemService = new ItemService();
        this.cartService = new CartService();
        this.onSelect = this.onSelect.bind(this);
        this.onNewItem = this.onNewItem.bind(this);
        this.onPost = this.onPost.bind(this);
        this.onEditItem = this.onEditItem.bind(this);
        this.onCancel = this.onCancel.bind(this);
        this.onCancelEdit = this.onCancelEdit.bind(this);
        this.onCreateItem = this.onCreateItem.bind(this);
        this.onUpdateItem = this.onUpdateItem.bind(this);
        this.onDeleteItem = this.onDeleteItem.bind(this);
        this.state = {
            showDetails: false,
            editItem: false,
            selectedItem: null,
            newItem: null,
        }
    }

    componentDidMount() {
        this.getItems();
    }

    render() {
        const items = this.state.items;
        if(!items) return null;
        const cart = true;
        const showDetails = this.state.showDetails;
        const selectedItem = this.state.selectedItem;
        const listItems = items.map((item) =>
            <li key={item.id} onClick={() => this.onSelect(item.id)}>
                <span className="item-name">
                    {this.props.parentItems.map(parentItems => parentItems.id === item.item_id? parentItems.name : "")}
                </span> |  {this.props.parentItems.map(parentItems => parentItems.id === item.item_id? parentItems.price : "")}
            </li>
        );
        return (
            <div className="Cart">
                <h2>Your cart</h2>
                <ol className="items">
                    {listItems}
                </ol>
                <br/>
                <Button type="primary" name="button" onClick={() => this.onPost()}><Icon type="shopping-cart" /></Button>
                <br/>
                {showDetails && selectedItem && <ItemDetails item={selectedItem} onEdit={null} onDelete={this.onDeleteItem} onCart={null} isCart={cart} />}
                </div>
        );
    }

    getItems() {
        let item_ids = [];
        this.cartService.retrieveItems().then(items => {
            this.clearState();
            this.setState({
                items: items
            })
        });

    }

    onSelect(id) {
        this.clearState();
        let item_id;
        for (let i = 0; i < this.state.items.length; i++) {
            if (this.state.items[i].id === id) item_id = this.state.items[i].item_id;
        }
        this.itemService.getItem(item_id).then(item => {
                item.id = id;
                this.setState({
                    showDetails: true,
                    selectedItem: item
                });
            }
        );
    }

    onCancel() {
        this.clearState();
    }

    onNewItem() {
        this.clearState();
        this.setState({
            newItem: true
        });
    }

    onEditItem() {
        this.setState({
            showDetails: false,
            editItem: true,
            newItem: null
        });
    }

    onCancelEdit() {
        this.setState({
            showDetails: true,
            editItem: false,
            newItem: null
        });
    }

    onUpdateItem(item) {
        this.clearState();
        this.cartService.updateItem(item).then(item => {
                this.getItems();
            }
        );
    }

    onCreateItem(itemId) {
        console.log("creating item {}", itemId);
        let newItem = {
            "item_id": itemId,
            "user_id": 1
        };
        this.clearState();
        this.cartService.createItem(newItem).then(item => {
                this.getItems();
            }
        );
    }

    onDeleteItem(id) {
        this.clearState();
        this.cartService.deleteItem(id).then(res => {
                this.getItems();
            }
        );
    }

    onPost() {
        this.clearState();
        this.cartService.post().then(res => {
                this.getItems();
            }
        );
    }

    clearState() {
        this.setState({
            showDetails: false,
            selectedItem: null,
            editItem: false,
            newItem: null
        });
    }
}
export default Cart