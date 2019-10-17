import React, { useState } from 'react';
import "./List.scss";
import { Icon, Label, Table } from 'semantic-ui-react';
import ModalWindow from '../modal/ModalWindow';

const List = (props) => {

    const [showModalDelete, setShowModalDelete] = useState(false);
    const [showModalEdit, setShowModalEdit] = useState(false);
    const [id, setId] = useState(null);
    const [editName, setEditName] = useState('');
    const [editAge, setEditAge] = useState('');
    
    const showModal = (action, id, editName, editAge) => {
        if (action === 'delete') {
            setShowModalDelete(true);
            setId(id);
        }

        if (action === 'edit') {
            setShowModalEdit(true);
            setId(id);
            setEditName(editName);
            setEditAge(editAge);
        }
    }

    const closeModal = () => {
        setShowModalDelete(false);
        setShowModalEdit(false);
    }

    const deleteUser = () => {
      props.showLoader(true); 
      fetch("http://localhost:3100/api/removeUser", {  
        method: 'POST',  
        headers: {  
          "Content-type": 'application/json'  
        },  
        body: JSON.stringify({id})
      })
      .catch(err => console.log('Error in deleteUser' + err))
      .then(() => {
            props.toggleUpdateData();
        })
    }

    const editUser = (name, age) => {
        props.showLoader(true); 
        fetch("http://localhost:3100/api/editUser", {  
          method: 'PUT',  
          headers: {  
            "Content-type": 'application/json'  
          },  
          body: JSON.stringify({id: id, name: name, age: age})
        })
        .catch(err => console.log('Error in editUser' + err))
        .then(() => {
            props.toggleUpdateData();
          })
      }

      const list = props.data.map(user => 
            <Table.Row key={user.id + user.position}>
                <Table.Cell className="cell-position">{user.position}</Table.Cell>
                <Table.Cell>{user.name}</Table.Cell>
                <Table.Cell>{user.age}</Table.Cell>
                <Table.Cell className="cell-edit">
                    <Icon link name='edit' onClick={() => showModal('edit', user.id, user.name, user.age)}/>
                    <Icon link name='trash alternate' onClick={() => showModal('delete', user.id)}/>
                </Table.Cell>
            </Table.Row>
      )

    return (
        <React.Fragment>
            {showModalDelete && 
                <ModalWindow 
                open={showModalDelete}
                closeModal={closeModal}
                deleteUser={deleteUser}
                showDelete={showModal}
            />}
            {showModalEdit && 
                <ModalWindow 
                open={showModalEdit}
                closeModal={closeModal}
                editUser={editUser}
                showEdit={showModal}
                name={editName}
                age={editAge}
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

export default List;
