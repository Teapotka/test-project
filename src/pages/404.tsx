import {Link} from "react-router-dom";
import React from "react";

const NotFound = () => {
    const basepath = `${process.env.REACT_APP_BASE_ROUTE}`
    return (
        <div className='not-found-box'>
                Page not found
            <br/><br/>
                <Link to={basepath}>Go home</Link>
        </div>
    )
}

export default NotFound