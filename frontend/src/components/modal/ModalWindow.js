import React, { Component } from 'react'
import { Button, Icon, Modal, Form } from 'semantic-ui-react'
import './Modal.scss'

export default class ModalWindow extends Component {

  constructor(props) {
    super(props);

    this.state = {
      name: this.props.name || '',
      age: this.props.age || ''
    }
    
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

  handleClose = (action) => {
    this.props.closeModal();
    if (action === 'delete') {
      this.props.deleteUser();
    }
    if (action === 'edit') {
      this.props.editUser(this.state.name, this.state.age);
    }
  }

  render() {
    return (
      <React.Fragment>
        {this.props.showDelete && 
          <Modal
          open={this.props.open}
          onClose={this.handleClose}
          basic
          size='small'
          >
          <Modal.Content>
            <h3>Are you shure?</h3>
          </Modal.Content>
          <Modal.Actions>
            <Button onClick={() => this.handleClose('delete')} inverted>
              <Icon name='checkmark' /> Yes
            </Button>
            <Button onClick={() => this.handleClose('close')} inverted>
              <Icon name='checkmark' /> No
            </Button>
          </Modal.Actions>
          </Modal>
        }

        {this.props.showEdit && 
          <Modal
          open={this.props.open}
          onClose={this.handleClose}
          basic
          size='small'
          >
          <Modal.Content>
            <h3>Edit user data</h3>
            <Form>
              <Form.Field>
                  <label>Name</label>
                  <input placeholder='Name' 
                         value={this.state.name}
                         onChange={(e) => this.handleChange('name', e)}
                  />
              </Form.Field>
              <Form.Field>
                  <label>Age</label>
                  <input placeholder='Age'
                         value={this.state.age}
                         onChange={(e) => this.handleChange('age', e)}
                  />
              </Form.Field>
          </Form>
          </Modal.Content>
          <Modal.Actions>
            <Button onClick={() => this.handleClose('edit')} inverted>
              <Icon name='checkmark' /> Yes
            </Button>
            <Button onClick={() => this.handleClose('close')} inverted>
              <Icon name='checkmark' /> No
            </Button>
          </Modal.Actions>
          </Modal>
        }
    </React.Fragment>
    )
  }
}
