import { POST_DETAIL, REMOVE_POST, UP_VOTE, DOWN_VOTE} from '../actions/types';



export const postReducer = (state = {},action) => {
    switch (action.type) {
        case POST_DETAIL:
            console.log(action)

            return {
                ...state, [action.id]: action.posts
            }
        case REMOVE_POST:
            console.log('post deleted');
         
        case UP_VOTE:
            let post = {}
            post[action.post.id] = action.post
            console.log(post)
            return post

        case DOWN_VOTE:
             post = {}
            post[action.post.id] = action.post
            console.log(post)
            return post
        

               
        default:
            return state;
    }
}



