import React from 'react';
import { Switch, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import Home from '../components/Home.js';
import PostDetail from '../components/postDetail.js';
import CreatePostForm from '../components/CreatePostForm';
import EditPost from '../components/EditPost';
import EditComment from '../components/EditComment';
import Category from '../components/category';
import '../App.css';



const Root = ({ store }) => (
    <Provider store ={store}>
        <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/posts/:post_id' component={PostDetail} />
            <Route path='/createpost' component={CreatePostForm} />
            <Route path='/edit/:post_id' component={EditPost} />
            <Route path='/comment/:comment_id' component={EditComment} />
            <Route exact path='/:category' component={Category} />
        </Switch>
    </Provider>
    )

Root.propTypes = {
    store: PropTypes.object.isRequired,
}

export default Root




