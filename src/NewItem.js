import React, { Component } from 'react';
import './App.css';
import Validator from './shared/Validator';
class NewItem extends Component {
    constructor(props) {
        super(props);
        this.validator = new Validator();
        this.onCancel = this.onCancel.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.state = {
            name: '',
            age: '',
            price: ''
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
        if(this.validator.validateInputs(this.state)) {
            this.props.onSubmit(this.state);
        }
    }
    render() {
        return (
            <div className="input-panel">
                <span className="form-caption">New item:</span>
                <div>
                    <label className="field-name">Name:<br/>
                        <input value={this.state.name} name="name" maxLength="40" required onChange={this.handleInputChange} placeholder="name" />
                    </label>
                </div>
                <div>
                    <label className="field-name">Age:<br/>
                        <input value={this.state.age} name="age" maxLength="40" pattern="[0-9]" required onChange={this.handleInputChange} placeholder="age" />
                    </label>
                </div>
                <div>
                    <label className="field-name">Price:<br/>
                        <input value={this.state.price} name="price" maxLength="4" pattern="[0-9]" required onChange={this.handleInputChange} placeholder="price" />
                    </label>
                </div>
                <br/>
                <button onClick={() => this.onCancel()}>Cancel</button>
                <button onClick={() => this.onSubmit()}>Create</button>
            </div>
        );
    }
}
export default NewItem