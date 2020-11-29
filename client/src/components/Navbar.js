import React, { useState , useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { UserContext } from '../Context/UserContext';
function Navbar() {
    const [userData, setUserData] = useContext(UserContext);
    const histroy = useHistory();
    //console.log(userData.user._id);
    function logoutHandler(){
        localStorage.clear();
        setUserData({user: ''});
        histroy.push('/login');
    }

    
    return (
        <nav className="white z-depth-0">
            <div className="nav-wrapper white container">
                <Link to={userData.user ? "/" : '/login'} className="brand-logo">Instagram</Link>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    {userData.user ?
                        <>
                            <li><Link to="/profile">profile</Link></li>
                            <li><Link to="/createpost">create post</Link></li>
                            <button className="btn red" onClick={logoutHandler}>logout</button>
                        </>
                        :
                        <>
                            <li><Link to="/login">Login</Link></li>
                            <li><Link to="/signup">Signup</Link></li>
                        </>
                    }


                </ul>
            </div>
        </nav>
    )
}
export default Navbar;