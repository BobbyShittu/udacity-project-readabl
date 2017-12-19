import {FETCH_CATEGORY, FETCH_CATEGORY_OF_POST, FETCH_POSTS, UP_VOTE, DOWN_VOTE, SORT_BY_TIME, SORT_BY_VOTE} from './types.js';
import * as API from './API';


export const fetchCategory = (category) => {
    return {
        type: FETCH_CATEGORY,
        category
    }
};

export const fetchPostInCategorySuccess = (data) => {
    return {
        type: FETCH_CATEGORY_OF_POST,
        data
    }
};

export const fetchPost = (data) => {
    return {
        type: FETCH_POSTS,
        data
    }
}

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

export const sortByVote = (data) => {
    return {
        type:SORT_BY_VOTE,
        data
    }

}

export const sortByTime = (data) => {
    return {
        type: SORT_BY_TIME,
        data
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

export const fetchPostInCategory = () => {

    return function (dispatch) {
        return API.fetchPosts()
            .then((data) => {
                dispatch(fetchPost(data.data))
            })
            .catch(err => console.log(err))
    }
}

export const fetchcategory = () => {
    return function (dispatch) {
        return API.FetchCategory()
            .then((res) => {
                console.log(res)
                dispatch(fetchCategory(res.data))
            }).catch(err => console.log(err))

    }
}



export const fetchpostincategory = (category) => {

    return function (dispatch) {
        return API.fetchPostInCategory(category)
            .then((res) => {

                console.log(res)
                dispatch(fetchPostInCategorySuccess(res.data))
            }).catch(err => console.log(err))

    }
}