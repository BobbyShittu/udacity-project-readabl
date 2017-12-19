import React, { Component } from 'react';
import Header from './Header';
import { Field, reduxForm } from 'redux-form'
import * as API from '../actions/API';
import { FetchSingleComment} from '../actions/comment'
import { connect } from 'react-redux';
import { Jumbotron } from 'react-bootstrap';







class EditComment extends Component {

    constructor(props) {
        super(props)
        this.state = {
            body: '',
            error: '',
            parentid: ''

        }
    }

    getCommentData() {
        const { comment_id } = this.props.match.params 
        API.fetchSingleComment(comment_id).then((res) => {
            console.log(res.data)
            this.setState({
                body: res.data.body,
                parentid: res.data.parentId

            })
        }).then(() => {
            this.props.initialize({ body: this.state.body })
        }).catch((err) => {
            console.log(err)
            this.setState({
                error: err,

            })
        })


    }
    

    componentDidMount() {
       
       this.getCommentData()   
    }

    
     
     
   
    submitComment(val) {
        const { comment_id } = this.props.match.params
        let comment = this.props.comments
        val.timestamp = Date.now()
        API.editComment(comment_id, val).then((res) => console.log(res))
        window.location.href = '/posts/' + this.state.parentid

    }



    render() { 
       
    const { handleSubmit, load, pristine, reset, submitting } = this.props

    if (this.state.error) {
        return <div>NO COMMENT</div>
    }


    return (
       
        <div>
      
            <Header />
            <Jumbotron>
            <form name="editForm" className="form" onSubmit={handleSubmit(this.submitComment.bind(this))}>
                <h3 className="edit-comment"> EDIT COMMENT </h3>

                <div>
                    <label>Body</label>
                    <div>
                        <Field
                            name="body"
                            component="input"
                            type="text"
                            placeholder="Body"
                            />
                            <br/>
                    </div>
                </div>
                    <br/>
                <div>
                    <button className='btn btn-primary' type="submit" >
                        Submit
                    </button>
                    <button className='btn btn-light'type="button" onClick={reset}>
                        Undo Changes
                    </button>
                </div>
                </form>
                </Jumbotron>
        </div>
    )
}
}



const mapStateToProps = (state) => {
    console.log()
    return {
        comments: state.comments
    }
}

//const mapDispatchToProps = (dispatch) => {
//    return {
//        singlecomment: (comment_id) =>
//            dispatch(FetchSingleComment(comment_id))

//    }

//}


export default connect(mapStateToProps)(reduxForm({
    form: 'initializeFromState' // a unique identifier for this form
})(EditComment))