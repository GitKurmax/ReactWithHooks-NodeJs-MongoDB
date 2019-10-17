import React, { useState, useEffect } from 'react';
import List from '../list/List';
import Put from '../put/Put';
import Loader from '../loader/Loader'
import './Content.scss';
import { useSelector, useDispatch } from 'react-redux';

const Content = (props) => {
    const reduxData = useSelector(state => state.data);
    const [data, setData ] = useState([]);
    const [update, setUpdate ] = useState(false);
    const [showLoaderTrigger, setShowLoaderTrigger ] = useState(true);
    const [isDataLoaded, setIsDataLoaded ] = useState(false);
    const [editedNames, setEditedNames ] = useState({
            addName: '',
            addAge: ''
        });

    console.log(reduxData);

    useEffect(() => {
      if(!isDataLoaded) {
        setShowLoaderTrigger(true);
        getAll();
      }  
    },[showLoaderTrigger])

    const getAll = () => {
      
      fetch("http://localhost:3100/api/getAll")
        .catch(err => console.log('Error in componentDidMount: ' + err))
        .then(response => {
            if (!response) {
                return [];
            }
            return response.json()
        })
        .then(data => {
          const dataToRender = data.map((user, index) => {
            return {
              id: user._id,
              name: user.name,
              age: user.age,
              position: ++index
            } 
          });

          setData(dataToRender)
          setIsDataLoaded(true)
          setShowLoaderTrigger(false);
           //showLoader();
      });
    }

    const updateData = () => {
        getAll();
    }

    // const showLoader = () => {
    //     setShowLoaderTrigger(showLoaderTrigger ? false : true);
    // }

    return (
        <div className="content-container">
            {showLoaderTrigger && <Loader/>}
            <List data = {data}
                    showLoader = {setShowLoaderTrigger}
                    toggleUpdateData = {updateData}
                />
            <Put updateData = {updateData}
              showLoader = {setShowLoaderTrigger}
            />
        </div>
    )
}

export default Content;