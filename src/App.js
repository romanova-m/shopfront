import React, {Component} from 'react';
import './App.css';
import ItemDetails from './ItemDetails';
import NewItem from './NewItem';
import EditItem from './EditItem';
import ItemService from './shared/pet-service';
import CartService from './shared/cart-service';
import 'antd/dist/antd.css';
import {Icon, Layout} from "antd";
import {Avatar} from "antd";
import {Button} from "antd";
import {Row} from 'antd';
import {Col} from 'antd';
import {Divider} from 'antd';
import {Typography} from 'antd';
import Cart from "./cart/Cart";

const {Title} = Typography;
const {Content} = Layout;


class App extends Component {
    constructor(props) {
        super(props);
        this.itemService = new ItemService();
        this.cartService = new CartService();
        this.onSelect = this.onSelect.bind(this);
        this.onNewItem = this.onNewItem.bind(this);
        this.onEditItem = this.onEditItem.bind(this);
        this.onCancel = this.onCancel.bind(this);
        this.onCart = this.onCart.bind(this);
        this.onCancelEdit = this.onCancelEdit.bind(this);
        this.onCreateItem = this.onCreateItem.bind(this);
        this.onUpdateItem = this.onUpdateItem.bind(this);
        this.onDeleteItem = this.onDeleteItem.bind(this);
        this.state = {
            showDetails: false,
            editItem: false,
            selectedItem: null,
            selectedStuff: null,
            newItem: null,
            cartOpen: true,
        }
    }

    componentDidMount() {
        this.getItems();
    }

    render() {
        const items = this.state.items;
        const stuff = this.state.stuff;
        if (!items) return null;
        if (!stuff) return null;
        const showDetails = this.state.showDetails;
        const showDetailsStuff = this.state.showDetailsStuff;
        const selectedItem = this.state.selectedItem;
        const selectedStuff = this.state.selectedStuff;
        const newItem = this.state.newItem;
        const editItem = this.state.editItem;
        const listItems = items.map((item) =>
            <Col span={6}>
                <div key={item.id} onClick={() => this.onSelect(item.id)}>
                    <Avatar size={"large"} icon="user"/>
                    <span className="item-name">{item.name}</span> | {item.price}
                </div>
            </Col>
        );
        const listStuff = stuff.map((item) =>
            <Col span={6}>
                <div key={item.id} onClick={() => this.onSelectStuff(item.id)}>
                    <Avatar size={"large"} icon="user"/>
                    <span className="item-name">{item.name}</span> | {item.price}
                </div>
            </Col>
        );
        return (
            <Layout>
                <Content>
                    <div>
                        <Title level={2}>Available pets</Title>
                        <div className="items">
                            <Layout>
                                <Row gutter={[0, 60]}>
                                    {listItems}
                                </Row>
                                <Row>
                                    <br/>
                                    <Button name="button" onClick={() => this.onNewItem()}><Icon type="plus"/></Button>
                                    {newItem && <NewItem onSubmit={this.onCreateItem} onCancel={this.onCancel}/>}
                                    {showDetails && selectedItem &&
                                    <ItemDetails item={selectedItem} onEdit={this.onEditItem}
                                                 onDelete={this.onDeleteItem}
                                                 onCart={this.onCart} isCart={false} isStuff={false}/>}
                                    {editItem && selectedItem &&
                                    <EditItem onSubmit={this.onUpdateItem} onCancel={this.onCancelEdit}
                                              item={selectedItem}/>}
                                </Row>
                                <Divider/>
                                <Title level={2}>Available stuff</Title>
                                <Row gutter={[0, 60]}>
                                    {listStuff}
                                </Row>
                                {showDetailsStuff && selectedStuff &&
                                <ItemDetails item={selectedStuff} onEdit={null}
                                             onDelete={null}
                                             onCart={this.onCart} isCart={false} isStuff={true}/>}
                            </Layout>
                        </div>
                    </div>
                </Content>
                {this.state.cartOpen && <Cart cartOpen={this.state.cartOpen} parentItems={Array.from(this.state.items).concat(Array.from(this.state.stuff))}/>}
            </Layout>
        );
    }

    getItems() {
        this.itemService.retrieveStuff().then(items => {
            this.setState({stuff: items});
        });
        this.itemService.retrieveItems().then(items => {
            this.setState({items: items});
        });
    }

    onSelect(itemId) {
        this.clearState();
        this.itemService.getItem(itemId).then(item => {
                this.setState({
                    showDetails: true,
                    selectedItem: item
                });
            }
        );
    }

    onSelectStuff(itemId) {
        this.clearState();
        this.itemService.getStuff(itemId).then(item => {
                this.setState({
                    showDetailsStuff: true,
                    selectedStuff: item
                });
            }
        );
    }

    onCancel() {
        this.clearState();
    }

    onCart(itemId) {
        let cart = {"item_id": itemId, "user_id": 1};
        this.cartService.createItem(cart).then(item => {
                this.setState({"cartOpen": false});
                this.setState({"cartOpen": true});
            }
        );
    }

    onNewItem() {
        this.clearState();
        let flag = this.state.newItem;
        this.setState({
            newItem: !flag
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
        this.itemService.updateItem(item).then(item => {
                this.getItems();
            }
        );
    }

    onCreateItem(newItem) {
        this.clearState();
        this.itemService.createItem(newItem).then(item => {
                this.getItems();
            }
        );
    }

    onDeleteItem(itemLink) {
        this.clearState();
        this.itemService.deleteItem(itemLink).then(res => {
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

export default App