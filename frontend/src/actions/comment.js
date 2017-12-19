import * as API from './API.js';
import { CREATE_COMMENT, DELETE_COMMENT, INCREASE_VOTE_FOR_SINGLE_COMMENT, DECREASE_VOTE_FOR_SINGLE_COMMENT, FETCH_COMMENT_FOR_SINGLE_POST, FETCH_SINGLE_COMMENT} from './types.js';





export const addComment = (comment, parentid) => {
    return {
        type: CREATE_COMMENT,
        comment,
        parentid
    }
}


export const commentUpVote = (post, id, parentid) => {
    return {
        type:INCREASE_VOTE_FOR_SINGLE_COMMENT,
        post,
        id,
        parentid
    }
}

export const commentDownVote = (post, id, parentid) => {
    return {
        type:DECREASE_VOTE_FOR_SINGLE_COMMENT,
        post,
        id,
        parentid
    }
}

export const fetchCommentForSinglePost = (comment, id) => {
    return {
        type:FETCH_COMMENT_FOR_SINGLE_POST,
        comment,
        id
    }
};

export const fetchSingleComment = (data, id) => {
    return {
        type: FETCH_SINGLE_COMMENT,
        data,
        id
    }
};

export const deleteComments = (id, parentid, comment) => {
    return {
        type:DELETE_COMMENT,
        id,
        comment,
        parentid
    }
};

export const addcomment = (data, parentid) => {
    return function (dispatch) {
        return API.createComment(data)
            .then((data) => {
                dispatch(addComment(data.data, parentid))
            })
            .catch(err => console.log(err))
    }
}



export const deleteComment = (id, parentid) => {
    return function (dispatch) {
        return API.deleteSingleComment(id)
            .then((data) => {
                dispatch(deleteComments(id, parentid, data))
            })
            .catch(err => console.log(err))
    }
}


export const fetchComment = (id) => {

    return function (dispatch) {
        return API.fetchCommentSinglePost(id)
            .then((res) => {
                dispatch(fetchCommentForSinglePost(res.data, id))
            }).catch(err => { throw (err) })
    }
}

export const FetchSingleComment = (id) => {
    return function (dispatch) {
        return API.fetchSingleComment(id)
            .then((res) => {
                dispatch(fetchSingleComment(res.data,id))
            console.log(res.data)
        }).catch(err => {throw(err)})
            }

            }

export const commentdownvote = (id, parentid, option) => {
    return function (dispatch) {
        return API.commentvote(id, option)
            .then((res) => {
                dispatch(commentDownVote(res.data, id, parentid))
            }).catch(err => console.log(err))
    }
}


export const commentupvote = (id, parentid, option) => {
    return function (dispatch) {
        return API.commentvote(id, option)
            .then((res) => {
                dispatch(commentUpVote(res.data, id, parentid))
            }).catch(err => console.log(err))

    }
}
