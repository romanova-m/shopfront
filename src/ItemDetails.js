import React, { Component } from 'react';
import './App.css';
import { Icon } from "antd";
import { Button } from "antd";

class ItemDetails extends Component {
    constructor(props) {
        super(props);
        this.onEdit = this.onEdit.bind(this);
        this.onDelete = this.onDelete.bind(this);
        this.onCart = this.onCart.bind(this);
    }
    render() {
        const item = this.props.item;
        return (
            <div className="input-panel">
                <span className="form-caption">{ item.name}</span>
                <div><span className="field-name">Name:</span><br/> {item.name}</div>
                <div><span className="field-name">Age:</span><br/> {item.age}</div>
                <div><span className="field-name">Price:</span><br/> {item.price}</div>
                <br/>
                {!this.props.isCart && <Button onClick={() => this.onCart()}><Icon type="shopping-cart" /></Button>}
                {!this.props.isCart && <Button onClick={() => this.onEdit()}><Icon type="edit" /></Button>}
                <Button type="danger" onClick={() => this.onDelete()}><Icon type="delete" /></Button>
            </div>
        );
    }
    onEdit() {
        this.props.onEdit();
    }
    onDelete() {
        const item = this.props.item;
        if(this.props.isCart || window.confirm("Are you sure to delete item: " + item.name + " ?")) {
            this.props.onDelete(item.id);
        }
    }
    onCart() {
        const item = this.props.item;
        this.props.onCart(item.id);
    }
}
export default ItemDetails