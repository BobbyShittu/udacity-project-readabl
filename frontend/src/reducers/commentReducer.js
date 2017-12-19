import { CREATE_COMMENT, DELETE_COMMENT, INCREASE_VOTE_FOR_SINGLE_COMMENT, DECREASE_VOTE_FOR_SINGLE_COMMENT, FETCH_COMMENT_FOR_SINGLE_POST, FETCH_SINGLE_COMMENT} from '../actions/types';



export const commentReducer = (state = [], action) => {

    switch (action.type) {

        case FETCH_COMMENT_FOR_SINGLE_POST:
            console.log(action.comment)
            return {
                ...state, [action.id]: action.comment
            }

        case FETCH_SINGLE_COMMENT:
            let id;
            let Id;
            if (action.id == action.data.id)
                return {
                Id: action.data.body,
                id:action.data.parentId
            }


        case CREATE_COMMENT:
            console.log(action)
            let newcomment = action.comment
            d = state[action.parentid]
            newstate = d.push(newcomment)

        case INCREASE_VOTE_FOR_SINGLE_COMMENT:
            let d = state[action.parentid]
            let newstate = d.map((d) => {

                if (d.id == action.id) {
                    d.voteScore = action.post.voteScore
                }
                return d
            })

            return { ...state, [action.parentid]: newstate }

        case DECREASE_VOTE_FOR_SINGLE_COMMENT:

            newstate = state[action.parentid].map((d) => {

                if (d.id == action.id) {
                    d.voteScore = action.post.voteScore
                }
                return d
            })
            return { ...state, [action.parentid]: newstate }


        case DELETE_COMMENT:
            console.log(action)
            newstate = state[action.parentid].filter((d) => {
                return d.id != action.id
            })
            return { ...state, [action.parentid]: newstate }



        default:
            return state;
    }
};