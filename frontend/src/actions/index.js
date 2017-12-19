import { ADD_POST, REMOVE_POST, EDIT_POST, SORT_BY_TIME, SORT_BY_VOTE, UP_VOTE, DOWN_VOTE, POST_DETAIL } from './types.js';
import uuid from 'uuid';
import * as API from './API';


export const createPost = (post) => {
    return {
        type: ADD_POST,
        post
    }
}

export const removePost = ( id , data) => ({
    type: REMOVE_POST,
    id,
    data

})


export const editPost = (id, updates) => ({
    type: EDIT_POST,
    id,
    updates
})

export const upVote = (post, id) => ({
    type: UP_VOTE,
    post,
    id
    
})

export const downVote = (post, id) => ({
    type: DOWN_VOTE,
    post,
    id
})

export const sortByTime = (data) => ({
    type: SORT_BY_TIME,
    data
})

export const sortByVote = (data) => ({
    type: SORT_BY_VOTE,
    data
})

export const postDetail = (posts,id) => ({
    type: POST_DETAIL,
    posts,
    id
    }
)

export const fetchSinglePosts = (id) => {
    console.log('got it')
    return function (dispatch) {
        return API.fetchDetailsForSinglePost(id)
            .then((res) => {
                console.log(res)
                dispatch(postDetail(res.data, id))
            }).catch(err => console.log(err))
    }
}

export const downvote = (id, option) => {
    return function (dispatch) {
        return API.vote(id, option)
            .then((res) => {
                dispatch(downVote(res.data, id))
            }).catch(err => console.log(err))

    }
}


export const upvote = (id, option) => {
    return function (dispatch) {
        return API.vote(id, option)
            .then((res) => {
                console.log(res)
                dispatch(upVote(res.data, id))
            }).catch(err => console.log(err))

    }
}




export const DeleteSinglePost = (id) => {
    return function (dispatch) {
        return API.deleteSinglePost(id)
            .then((data) => {
                dispatch(removePost(id, data))
            })
            .catch(err => console.log(err))
    }
}


export const AddPost = (val) => {
    return function (dispatch) {
        return API.createPost(val)
            .then((res) =>
                dispatch(createPost(res.data))
                )      
    }
}