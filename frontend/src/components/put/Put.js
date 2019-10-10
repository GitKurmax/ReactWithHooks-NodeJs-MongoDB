import React, { Component } from 'react';
import "./Put.scss";
import { Button, Form } from 'semantic-ui-react'

export default class Put extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            age: ''
        };

        this.addUser = this.addUser.bind(this);
    }

    handleChange(field, event) {
        if (field === 'name') {
            this.setState({
                name: event.target.value
            })
        } else {
            this.setState({
                age: event.target.value
            })
        }
    }

    addUser() {
        this.props.showLoader();
        this.setState({
            name: '',
            age: ''
        });

        fetch("http://localhost:3100/api/add", {  
            method: 'POST',  
            headers: {  
                "Content-type": 'application/json'  
            },  
            body: JSON.stringify({name: this.state.name, age: this.state.age})
            })
            .catch(err => console.log('Error in addUser' + err))
            .then(() => {
                this.props.updateData();
                this.props.showLoader();                
        })
    }

    render() {
        return (
            <div className="put-container">
                <h3>Add user form</h3>
                <Form>
                    <Form.Field>
                        <label>Name*</label>
                        <input placeholder='Name' value={this.state.name} onChange={(e) => this.handleChange('name', e)}/>
                    </Form.Field>
                    <Form.Field>
                        <label>Age*</label>
                        <input placeholder='Age' value={this.state.age} onChange={(e) => this.handleChange('age', e)}/>
                    </Form.Field>
                    <Button type='submit'
                            onClick={() => this.addUser()}
                            disabled={this.state.name && this.state.age ? false:true}
                    >Submit</Button>
                </Form>
            </div>
        )
    }
}
