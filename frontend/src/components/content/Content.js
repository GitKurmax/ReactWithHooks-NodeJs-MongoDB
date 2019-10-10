import React, { Component } from 'react';
import List from '../list/List';
import Put from '../put/Put';
import Loader from '../loader/Loader'
import './Content.scss';

export default class Content extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            update: false,
            showLoader: false,
            addName: '',
            addAge: ''
        };

        this.updateData = this.updateData.bind(this);
        this.showLoader = this.showLoader.bind(this);
        this.getAll = this.getAll.bind(this);
    }

    componentDidMount() {
        this.showLoader();
        this.getAll();
      }

    getAll() {
        fetch("http://localhost:3100/api/getAll")
        .catch(err => console.log('Error in componentDidMount: ' + err))
        .then(response => response.json())
        .then(data => {
          const dataToRender = data.map((user, index) => {
            return {
              id: user._id,
              name: user.name,
              age: user.age,
              position: ++index
            } 
          });

          this.setState({
              data: dataToRender
          })
          this.showLoader();
      });
    }

    updateData() {
        this.getAll();
    }

    showLoader() {
        this.setState((state) => {
            return {
                showLoader: state.showLoader ? false : true
            }
        })
    }

    render() {
        return (
            <div className="content-container">
                {this.state.showLoader && <Loader/>}
                <List data = {this.state.data}
                      updateData = {this.state.update}
                      showLoader = {this.showLoader}
                      toggleUpdateData = {this.updateData}
                    />
                <Put updateData = {this.updateData} showLoader = {this.showLoader}/>
            </div>
        )
    }
}
