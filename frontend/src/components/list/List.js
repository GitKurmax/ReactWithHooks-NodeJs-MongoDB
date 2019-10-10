import React, { Component } from 'react';
import "./List.scss";
import { Icon, Label, Table } from 'semantic-ui-react';
import ModalWindow from '../modal/ModalWindow';

export default class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            showModalDelete: false,
            showModalEdit: false,
            id: null,
            editName: '',
            editAge: ''
        };

        this.showModal = this.showModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
        this.editUser = this.editUser.bind(this);
    }

    showModal(action, id, editName, editAge) {
        if (action === 'delete') {
            this.setState({
                showModalDelete: true,
                id: id
            })
        }

        if (action === 'edit') {
            this.setState({
                showModalEdit: true,
                id: id,
                editName: editName,
                editAge: editAge
            })
        }
    }

    closeModal() {
        this.setState(state => {
            return {
                showModalDelete: false,
                showModalEdit: false
            }
        });
    }

    deleteUser() {
        this.props.showLoader(); 
      fetch("http://localhost:3100/api/removeUser", {  
        method: 'POST',  
        headers: {  
          "Content-type": 'application/json'  
        },  
        body: JSON.stringify({id: this.state.id})
      })
      .catch(err => console.log('Error in deleteUser' + err))
      .then(() => {
            this.props.toggleUpdateData();
        })
    }

    editUser(name, age) {
        this.props.showLoader(); 
        fetch("http://localhost:3100/api/editUser", {  
          method: 'PUT',  
          headers: {  
            "Content-type": 'application/json'  
          },  
          body: JSON.stringify({id: this.state.id, name: name, age: age})
        })
        .catch(err => console.log('Error in editUser' + err))
        .then(() => {
            this.props.toggleUpdateData();
          })
      }

    render() {
        const list = this.props.data.map(user => 
            <Table.Row key={user.id + user.position}>
                <Table.Cell className="cell-position">{user.position}</Table.Cell>
                <Table.Cell>{user.name}</Table.Cell>
                <Table.Cell>{user.age}</Table.Cell>
                <Table.Cell className="cell-edit">
                    <Icon link name='edit' onClick={() => this.showModal('edit', user.id, user.name, user.age)}/>
                    <Icon link name='trash alternate' onClick={() => this.showModal('delete', user.id)}/>
                </Table.Cell>
            </Table.Row>
        )

        return (
            <React.Fragment>
                {this.state.showModalDelete && 
                  <ModalWindow 
                    open={this.state.showModalDelete}
                    closeModal={this.closeModal}
                    deleteUser={this.deleteUser}
                    showDelete={this.showModal}
                />}
                {this.state.showModalEdit && 
                  <ModalWindow 
                    open={this.state.showModalEdit}
                    closeModal={this.closeModal}
                    editUser={this.editUser}
                    showEdit={this.showModal}
                    name={this.state.editName}
                    age={this.state.editAge}
                />}

                <div className="list-container">
                    <Table celled>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>
                                <Label ribbon>No</Label>
                            </Table.HeaderCell>
                            <Table.HeaderCell>Name</Table.HeaderCell>
                            <Table.HeaderCell>Age</Table.HeaderCell>
                            <Table.HeaderCell>Edit</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {list}
                    </Table.Body>
                    </Table>
                </div>
            </React.Fragment>
        )
    }
}
