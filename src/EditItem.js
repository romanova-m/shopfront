import React, { Component } from 'react';
import './App.css';
import Validator from './shared/Validator';
class EditItem extends Component {
    constructor(props) {
        super(props);
        this.validator = new Validator();
        this.onCancel = this.onCancel.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        const itemToEdit = props.item;
        this.state = {
            name: itemToEdit.name,
            age: itemToEdit.age,
            price: itemToEdit.price,
            id: itemToEdit.id
        };
    }
    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }
    onCancel() {
        this.props.onCancel();
    }
    onSubmit() {
        if (this.validator.validateInputs(this.state)) {
            this.props.onSubmit(this.state);
        }
    }
    render() {
        return (
            <div className="input-panel">
                <span className="form-caption">Edit item:</span> <span>{this.state.name}</span>
                <div>
                    <label className="field-name">Name:<br/>
                        <input value={this.state.name} name="name" maxLength="40" required onChange={this.handleInputChange} placeholder="name" />
                    </label>
                </div>
                <div>
                    <label className="field-name">Summary:<br/>
                        <input value={this.state.age} name="age" maxLength="4" required pattern="[0-9]{1,4}" onChange={this.handleInputChange} placeholder="age" />
                    </label>
                </div>
                <div>
                    <label className="field-name">Price:<br/>
                        <input value={this.state.price} name="price" maxLength="10" pattern="[0-9]+" onChange={this.handleInputChange} placeholder="price" />
                    </label>
                </div>
                <br/>
                <button onClick={() => this.onCancel()}>Cancel</button>
                <button onClick={() => this.onSubmit()}>Update</button>
            </div>
        );
    }
}
export default EditItem
