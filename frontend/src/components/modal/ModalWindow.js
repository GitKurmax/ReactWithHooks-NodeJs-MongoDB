import React, { useState } from 'react';
import { Button, Icon, Modal, Form } from 'semantic-ui-react';
import './Modal.scss';

const ModalWindow = (props) => {
  const [editUser, setEditUser] = useState({name: props.name || '', age: props.age || ''});

  const handleChange = (field, event) => {
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

  const handleClose = (action) => {
    props.closeModal();
    if (action === 'delete') {
      props.deleteUser();
    }
    if (action === 'edit') {
      props.editUser(editUser.name, editUser.age);
    }
  }

    return (
      <React.Fragment>
        {props.showDelete && 
          <Modal
          open={props.open}
          onClose={handleClose}
          basic
          size='small'
          >
          <Modal.Content>
            <h3>Are you shure?</h3>
          </Modal.Content>
          <Modal.Actions>
            <Button onClick={() => handleClose('delete')} inverted>
              <Icon name='checkmark' /> Yes
            </Button>
            <Button onClick={() => handleClose('close')} inverted>
              <Icon name='checkmark' /> No
            </Button>
          </Modal.Actions>
          </Modal>
        }

        {props.showEdit && 
          <Modal
          open={props.open}
          onClose={handleClose}
          basic
          size='small'
          >
          <Modal.Content>
            <h3>Edit user data</h3>
            <Form>
              <Form.Field>
                  <label>Name</label>
                  <input placeholder='Name' 
                         value={editUser.name}
                         onChange={(e) => handleChange('name', e)}
                  />
              </Form.Field>
              <Form.Field>
                  <label>Age</label>
                  <input placeholder='Age'
                         value={editUser.age}
                         onChange={(e) => handleChange('age', e)}
                  />
              </Form.Field>
          </Form>
          </Modal.Content>
          <Modal.Actions>
            <Button onClick={() => handleClose('edit')} inverted>
              <Icon name='checkmark' /> Yes
            </Button>
            <Button onClick={() => handleClose('close')} inverted>
              <Icon name='checkmark' /> No
            </Button>
          </Modal.Actions>
          </Modal>
        }
    </React.Fragment>
    )
}

export default ModalWindow;