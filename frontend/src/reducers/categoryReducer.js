import {FETCH_CATEGORY, FETCH_CATEGORY_OF_POST, FETCH_POSTS, UP_VOTE, DOWN_VOTE, SORT_BY_TIME, SORT_BY_VOTE} from '../actions/types';




export const categoryReducer = (state = [], action) => {
    switch (action.type) {
         
        case FETCH_CATEGORY:
            return { ...state, category: action.category }

        case FETCH_POSTS:
            let posts = {}
            var a = action.data.filter((p) => p.deleted == false)
            console.log(a)
            console.log(action.data)
            for (let num in a) {
                posts[a[num].id] = a[num]
            }
            console.log(posts)

            return { ...state, posts }

        case FETCH_CATEGORY_OF_POST:
            console.log(action.data)
            return { ...state, postincategory: action.data }
            

        case UP_VOTE:
            let newstate = state.posts
            console.log(newstate)
            newstate = Object.keys(newstate).map((posts) => {
                if (newstate[posts].id == action.id) {
                    newstate[posts].voteScore = action.post.voteScore
                    return newstate
                }
                console.log(action.post.voteScore)
            })
            return { ...state, newstate }
        case DOWN_VOTE:
             newstate = state.posts
            newstate = Object.keys(newstate).map((posts) => {
                if (newstate[posts].id === action.id) {
                    newstate[posts].voteScore = action.post.voteScore
                    return newstate
                }
            })
            return { ...state, newstate }

        case SORT_BY_VOTE:

            var nstate = Object.values(state.posts)
            let arr = nstate.sort(function (a, b) {
                return b.voteScore - a.voteScore
            })
            posts = {}
            for (let num in arr) {

                posts[arr[num].id] = arr[num]
            }

            console.log(posts)
            return { ...state, posts }


        case SORT_BY_TIME:

             nstate = Object.values(state.posts)
            arr = nstate.sort(function (a, b) {
                let date1 = b.timestamp

                let date2 = a.timestamp

                if (date1 < date2) {
                    return -1
                }
                if (date1 > date2) {
                    return 1
                }
                return 0
            })
            posts = {}
            for (let num in arr) {
                posts[arr[num].id] = arr[num]
            }

            return { ...state, posts }
           
        default:
            return state;
    }
}