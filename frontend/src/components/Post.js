import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { DeleteSinglePost } from '../actions/index';
import {upvote, downvote } from '../actions/categories';
import { Redirect } from 'react-router';
import moment from 'moment';
import { Jumbotron } from 'react-bootstrap';





class Post extends Component {
    


    render() {
        const comment = this.props.comments
        const response = this.props.posts
        const posts = response.posts
        var b = posts && Object.getOwnPropertyNames(posts).length;
        console.log(comment)
        if (b === 0) {
            return (
                <div>
                    <h4>No Posts at the moment</h4>
                </div>
                )
        }
        return (
            <div className='post-header'>
                <div className='post-header title'>
                    <h3><i>Posts</i></h3>
                    </div>
                
                {posts && Object.keys(posts).map((b, index) => 
                    <div>
                    <hr className='my-4'/>
                  <Jumbotron>
                    <div key={posts[b].id}>
                        <h2>{posts[b].title}</h2>
                        <p>{posts[b].body}</p>
                        <p>{posts[b].author}</p>
                        <p>{posts[b].category}</p>
                        <p>{moment(posts[b].time).format('MM/DD/YYYY HH:mm')}</p>
                        <p>{posts[b].voteScore}</p>
                        <p> <button
                                    className='btn btn-light'
                            onClick={() => {
                                let voteScore = posts[b].voteScore;
                                let id = posts[b].id;
                                console.log(voteScore)
                                this.props.onIncrement(id, 'upVote')
                            }}>+</button>
                                    <button
                                        className='btn btn-secondary'
                                onClick={() => {
                                    let voteScore = posts[b].voteScore;
                                    let id = posts[b].id;
                                    console.log(voteScore)
                                    this.props.onDecrement(id,'downVote')
                                }} 
                                    >-</button> </p>
                        <p className="time"> Comments:{(comment[posts[b].id] || []).length} </p>
                        <Link to={`/edit/${posts[b].id}`}>
                            <button className='btn btn-primary'>Edit </button></Link>
                        <button className='btn btn-danger' onClick={
                            (e) => this.props.onDelete(posts[b].id)}>Delete
                                    </button>
                        <br />
                                <br/>
                                <div>
                                    <Link to={`/posts/${posts[b].id}`}> <button className='btn btn-primary'>More..</button> </Link>
                                    </div>
                    </div>
                            </Jumbotron>
                     </div>
                    )}
              
               
            </div>
            )

    }
}



const mapDispatchToProps = (dispatch) => {
    return {
        onIncrement: (id, option) => {
            dispatch(upvote(id, option))
        }
        ,
        onDecrement: (id, option) => {
            dispatch(downvote(id, option))
        },
        onDelete: (id) => {
            dispatch(DeleteSinglePost(id))
            alert('post deleted')
            window.location.href = 'http://localhost:3000/'
        }
      
    }
}


export default connect(null, mapDispatchToProps)(Post);
