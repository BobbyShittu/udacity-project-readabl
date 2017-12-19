import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { fetchcategory, fetchpostincategory } from '../actions/categories.js';
import Header from './Header';
import moment from 'moment';
import { connect } from 'react-redux';
import { Jumbotron } from 'react-bootstrap';



class Category extends Component {

    componentDidMount() {
        const url = window.location.href
        const params = url.split('/')
        this.props.loadCategory(params[3])
        this.props.clickCategory()

    }
    changeEvent(e, url) {
        e.preventDefault()
        window.location.href = 'http://localhost:3000/' + url + '/posts'

    }
    render() {
        
        const url = window.location.href
        const params = url.split('/')
        const category = params[3]
        const posts = this.props.postsincategory.postincategory
        console.log(this.props.postsincategory.postincategory)

        let a = posts && posts.length
        if (a == 0) {
            return (
                <div >
                    <Header />
                    <div>
                        <div className="App">
                            <div className="positon-header">
                                <Link to={'/createpost'}> <button type="button" className="btn btn-primary"><i className="fa fa-plus" aria-hidden="true"> ADD </i></button></Link>
                            </div>
                            <hr />
                            <h4>  no Post in  the <b>{category}</b> Category</h4>
                        </div>
                        <br />
                    </div>
                </div>
            )
        }

        return (
            <div >
                <Header />
                <div>
                    <div className="App">
                    
                        <hr />
                        <h4> Posts in <b>{category}</b> </h4>
                    </div>
                    <br />

                    <Jumbotron>
                    <div className="category-container ">
                            {posts && posts.map((p, index) => (
                                
                            <div key={index}>
                                    
                                <h2>Title: {p.title}</h2>
                                <br />
                                <div >
                                    <p> Body: {p.body}</p>
                                    <div>
                                        <p> Category: {p.category} </p>
                                        <p>Vote: {p.voteScore} </p>

                                        <p> Author: {p.author} </p>
                                        <p> Time: {moment(p.timestamp).format("MM/DD/YYYY")}</p>
                                            <hr/>
                                    </div>
                                    
                                </div>
                                   
                               
                                <br />
                                
                                </div>
                               
                        ))}
                        <div>
                            <Link to={'/createpost'}><button className='add-post'><b> Add Post</b></button></Link>

                        </div>
                    </div>
                      </Jumbotron>    
                </div>

                </div>

        );
    }
}

function mapStateToProps(state) {
    return { postsincategory: state.postincategory };

}


function mapDispatchToProps(dispatch) {
    return {
        loadCategory: category => dispatch(fetchpostincategory(category)),
        clickCategory: () => dispatch(fetchcategory())
     
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Category);
