import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form'
import { fetchSinglePosts } from '../actions/index';
import * as API from '../actions/API';
import  Header  from './Header';
import { Jumbotron } from 'react-bootstrap';



class EditPost extends Component {


    constructor(props) {
        super(props)
        this.state = {
            body: '',
            title: ''
        }
    }

    getPostData() {
        const { post_id } = this.props.match.params
        API.fetchDetailsForSinglePost(post_id).then((res) => {

            this.setState({
                body: res.data.body,
                title: res.data.title
            })
        }).then(() => {
            this.props.initialize({ title: this.state.title, body: this.state.body })
        })


    }

    componentDidMount() {
        this.getPostData()
        const { post_id } = this.props.match.params
        this.props.fetchSinglePosts(post_id)

    }

    submitPost(val) {

        const { post_id } = this.props.match.params
        API.updateSinglePost(post_id, val).then((res) => console.log(res))
        alert('Post edited succesfully')
        window.location.href = "/"

    }

    render() {
        const { handleSubmit, load, pristine, reset, submitting, post } = this.props

        var b = post && Object.getOwnPropertyNames(post).length;
        if (!post) {
            return <div>NO POST</div>
        }

        if (b === 0) {
            window.location.href = 'http://localhost:3000/'
        }
        if (this.props && !post) {
            alert('no post')
        }

        return (
            <div>
                <Header />
                <Jumbotron>
                <form name="editForm" className="form" onSubmit={handleSubmit(this.submitPost.bind(this))}>

                    <div>
                        <label>Title</label>
                        <div>
                            <Field
                                name="title"
                                component="input"
                                type="text"
                                placeholder="Title"
                            />
                        </div>
                    </div>
                    <div>
                        <label>Body</label>
                        <div>
                            <Field
                                name="body"
                                component="input"
                                type="text"
                                placeholder="Body"
                            />
                        </div>
                    </div>
                        <br/>
                    <div>
                        <button className='btn btn-primary'type="submit" >
                            Submit
                    </button>
                        <button className='btn btn-light' type="button" onClick={reset}>
                            Undo Changes
                    </button>
                    </div>
                    </form>
                    </Jumbotron>
            </div>
        )
    }
}

function mapStateToProps(state, ownProps) {

    return {

        post: state.posts[ownProps.match.params.post_id]
    }
}




export default reduxForm({
 form:'initializefromstate'
})(connect(mapStateToProps, {fetchSinglePosts})(EditPost));