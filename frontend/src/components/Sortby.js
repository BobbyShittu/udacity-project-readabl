import React from 'react';
import { connect } from 'react-redux';
import { sortByTime,sortByVote} from '../actions/categories'


const SortBy = (props) => (
    <div>
        <h3>Sort:
           <select
                className="header-space btn btn-secondary dropdown-toggle header-space"
                value={props.posts.VoteScore}
                onChange={(e) => {
                    console.log(props.posts.posts)
                    if (e.target.value === 'vote') {
                            props.onChange(props.posts.posts);
                    } else if (e.target.value === 'time') {
                             props.onChange1(props.posts.posts);
                    }
                }}
            >
                <option value=''></option>
                <option value='vote'>Sort by VoteScore</option>
                <option value='time'>Sort by Time</option>
            </select></h3>
        
    </div>

);



const mapDispatchToProps = (dispatch) => {
    return {
        onChange: (data) => {
            dispatch(sortByVote(data))
            
        },
        onChange1: (data) => {
            dispatch(sortByTime(data))
        }
    }
}

export default connect(null, mapDispatchToProps)(SortBy)