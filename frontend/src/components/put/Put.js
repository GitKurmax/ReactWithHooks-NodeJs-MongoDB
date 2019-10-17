import React, { useState } from 'react';
import "./Put.scss";
import { Button, Form } from 'semantic-ui-react'

const Put = (props) => {

    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    
    const handleChange = (field, event) => {
        if (field === 'name') {
            setName(event.target.value)
        } else {
            setAge(event.target.value)
        }
    }

    const addUser = () => {
        props.showLoader(true);
        setName('');
        setAge('');

        fetch("http://localhost:3100/api/add", {  
            method: 'POST',  
            headers: {  
                "Content-type": 'application/json'  
            },  
            body: JSON.stringify({name: name, age: age})
            })
            .catch(err => {
                alert('Sorry, you don`t nave a connection to database. Check your internet connection pease.');
            })
            .then(() => {
                props.updateData();                
        })
    }
 
    return (
        <div className="put-container">
            <h3>Add user form</h3>
            <Form>
                <Form.Field>
                    <label>Name*</label>
                    <input placeholder='Name' value={name} onChange={(e) => handleChange('name', e)}/>
                </Form.Field>
                <Form.Field>
                    <label>Age*</label>
                    <input placeholder='Age' value={age} onChange={(e) => handleChange('age', e)}/>
                </Form.Field>
                <Button type='submit'
                        onClick={() => addUser()}
                        disabled={name && age ? false:true}
                >Submit</Button>
            </Form>
        </div>
    )
}

export default Put;
