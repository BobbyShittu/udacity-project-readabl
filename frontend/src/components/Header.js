import React from 'react'
import { Link } from 'react-router-dom'
import '../index.css';

const Header = () => {
    return (
        <div className="App-title">
            <Link to="/"> <h1> READABLES </h1> </Link>
        </div>
    )
}
export default Header