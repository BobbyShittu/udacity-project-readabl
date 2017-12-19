import React, { Component } from 'react';
import CommentForm  from './CommentForm';
import moment from 'moment';
import { Link } from 'react-router-dom';


const Comment = (props) => {
    console.log(props)
    const comment = props.comments
    const url = window.location.href
    const parentid = url.split('/')[4]

    let a = comment && comment.length || []

    if (a.length == 0) {
        return (
            <div className="comment">
                <p> NO COMMENT </p>

                <CommentForm  {...props} />
            </div>
        )
    }
    else {

        return (<div>
            <div>
                {comment && comment.map((p, index) => (
                    <div className="comment" key={index}>
                        <p> Author:{p.author} </p>
                        <p>  Body:{p.body} </p>
                        <p>Vote:<button onClick={
                            (e) => props.commentdownvote(p.id, parentid, "downVote")}>
                            - </button>
                            {p.voteScore}
                            <button onClick={
                                (e) => props.commentupvote(p.id, parentid, "upVote")}>
                                + </button> </p>
                        <p> Time:{moment(p.timestamp).format("MM/DD/YYYY")} </p>
                        <div>
                            <Link to={`/comment/${p.id}`}> <button className="btn btn-primary"> Edit </button> </Link>
                            <button className="btn btn-danger"
                                onClick={(e) => props.deletecomment(p.id, parentid)}> Delete </button>
                        </div>

                    </div>
                ))}

            </div>
            <CommentForm  {...props} />
        </div>
        )
    }
}

export default Comment
