import React, { Component } from 'react';
import uuid from 'uuid'
import moment from 'moment'
import Form from './CreatePost'
import Header from './Header';
import { connect } from 'react-redux';
import {AddPost} from '../actions/index'
import * as API from '../actions/API.js'




class CreatePostForm extends Component {


    //handleSubmit, pristine, reset, submitting// 
    handleSubmit(val) {
        val.id = uuid()
        val.timestamp = Date.now()
      
        //API.createPost(val).then((res) => console.log(res))
        alert('post entered succesfully')
        window.location.href = "/"
    }
  


    render() {


        return (
            <div>
                <Header />
                <h3 className='form'> NEW POST </h3>
                <Form onSubmit={(val) => {
                    console.log()
                    this.props.createPost(val)
                    this.handleSubmit(val)
                }} />
                <br />
                <br />
            </div>
        );
    }



}

const mapDispatchToProps = (dispatch) => {
    return {
        createPost: (val) => {
            dispatch(AddPost(val))
        }
    }
}


export default connect(null, mapDispatchToProps)(CreatePostForm)