import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Sortby from './Sortby';
import Post from './Post';
import { fetchPostInCategory } from '../actions/categories';
import { fetchComment } from '../actions/comment';
import Header from './Header';
import _map from 'lodash.map'
import '../index.css';

class Home extends Component {

    changeEvent(url) {
        window.location.href = 'http://localhost:3000/' + url
    }

    componentDidMount() {
        console.log(this.props.fetchpost)
        this.props.fetchpost().then(() => _map(this.props.posts.posts, post => {
            this.props.fetchcomment(post.id)
        }))
            }

       
    

    render() {
        console.log(this.props)
        return (
            <div>
                <Header/>
                <div className='sub-header'>
                    <h3>Categories: <select className="header-space btn btn-secondary dropdown-toggle header-space" onChange={(event) => this.changeEvent(event.target.value)}>
                        <option value=''>All</option>
                        <option value='react'>React</option>
                        <option value='redux'>Redux</option>
                        <option value='udacity'>Udacity</option>

                    </select></h3>
                    <span>
                        <div className='sub-header sort'>
    <Sortby {...this.props} /></div></span>
                </div>
                <Post {...this.props}/>
                <Link to='/CreatePost'><button className='add-post'><b>Add Post</b></button></Link>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        posts: state.postincategory,
        comments:state.comments
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchpost: () => 
            dispatch(fetchPostInCategory())
        ,
        fetchcomment: (id) => 
            dispatch(fetchComment(id))
        
    }
    
}

export default connect(mapStateToProps,mapDispatchToProps)(Home)
