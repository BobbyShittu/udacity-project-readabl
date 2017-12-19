import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Comment from './Comment.js';
import { connect } from 'react-redux';
import { addcomment, commentdownvote, commentupvote, fetchComment, deleteComment } from '../actions/comment';
import { fetchSinglePosts, upvote, downvote, DeleteSinglePost } from '../actions/index';
import { Jumbotron } from 'react-bootstrap';
import Header from './Header';
import moment from 'moment';
import uuid from 'uuid';


class PostDetail extends Component {





    componentDidMount() {
        const url = window.location.href
        const params = url.split('/')
        const id = params[4]
        this.props.fetchPost(id)
        this.props.fetchcomment(id)
    }

    handlePostSubmit(val) {
        const url = window.location.href
        const parentid = url.split('/')[4]

        val.parentId = parentid
        val.id = uuid()
        val.timestamp = Date.now()
        console.log(this.props)
        this.props.addcomment(val, parentid)

    }


    onDelete(id) {
        this.props.deletepost(id)
        alert('post deleted')
        window.location.href = 'http://localhost:3000/'

    }
    render() {

        const { post } = this.props
        var b = post && Object.getOwnPropertyNames(post).length;
        if (!post) {
            return <div>NO POST</div>
        }

        if (b === 0) {
           return (<div classname='error'>
               <h2><b> 404</b> </h2>
               <h3>Sorry, the page you tried cannot be found</h3>
               <p>You may have typed the address incorrectly or the post had been deleted!</p>
            </div>)
        }
        if (this.props && !post) {
            alert('no post')
        }

        const comment = this.props.comments

        return (
            <div className="App">
                <Header />
                <div>
                    <div>
                        <div>
                            <div>
                                <Jumbotron>
                                <h2>Title: {post && post.title}</h2>
                                <br />
                                <div>
                                    <p> Body: {post && post.body}</p>
                                    <div>
                                        <p> Category: {post && post.category} </p>
                                        <p>Vote:<button className='btn btn-dark'onClick={
                                            (e) => this.props.downvote(post && post.id, "downVote")}>
                                            -
                                        </button>
                                            {post && post.voteScore}
                                            <button className='btn btn-light'onClick={
                                                (e) => this.props.upvote(post && post.id, "upVote")}>
                                                +
                                            </button> </p>

                                        <p className="author"> Author: {post && post.author} </p>
                                        <p className="time" > Time: {moment(post && post.timestamp).format("MM/DD/YYYY")} </p>
                                        <p className="time"> Comments:{comment && comment.length || []} </p>
                                    </div>
                                </div>
                                <br />
                                <div className="belowpost ">
                                    <Link to={`/edit/${post && post.id}`}>
                                        <button className='btn btn-primary'>Edit </button></Link>
                                    <button className='btn btn-danger' onClick={
                                        (e) => this.onDelete(post && post.id)}>Delete 
                                    </button>
                                    </div>
                                    </Jumbotron>
                                <br />

                                <h3 className='comment-title'> Comments </h3>
                                <br />
                                <Comment {...this.props} onSubmit={this.handlePostSubmit.bind(this)} />
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}


function mapStateToProps(state, ownProps) {
    console.log(ownProps)
    return {
      
        post: state.posts[ownProps.match.params.post_id],
        comments: state.comments[ownProps.match.params.post_id]
    }
}


function mapDispatchToProps(dispatch) {
    return {
        fetchPost: id =>
            dispatch(fetchSinglePosts(id)),
        commentupvote: (id, parentid, option) =>
            dispatch(commentupvote(id, parentid, option)),
        commentdownvote: (id, parentid, option) =>
            dispatch(commentdownvote(id, parentid, option)),
        fetchcomment: (id) =>
            dispatch(fetchComment(id)),
        deletepost: (id) =>
            dispatch(DeleteSinglePost(id)),
        upvote: (id, option) =>
            dispatch(upvote(id, option)),
        downvote: (id, option) =>
            dispatch(downvote(id, option)),
        deletecomment: (id, parentid) =>
            dispatch(deleteComment(id, parentid)),
        addcomment: (data, parentid) =>
            dispatch(addcomment(data, parentid))

    }
}


export default connect(mapStateToProps, mapDispatchToProps)(PostDetail);

