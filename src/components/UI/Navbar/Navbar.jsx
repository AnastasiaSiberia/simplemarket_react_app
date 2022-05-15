import React, {useContext} from 'react';
import {Link} from "react-router-dom";
import MyButton from "../button/MyButton";
import {AuthContext} from "../../../context/context";

const Navbar = () => {
    const {isAuth, setIsAuth} = useContext(AuthContext)

    const logout = () => {
        setIsAuth(false)
        localStorage.removeItem('auth')
    }
    return (
        <div className='navbar'>
            <MyButton onClick={logout}>Exit</MyButton>
            <div className="navbar__link">
                <Link to="/products">Products</Link>
                <Link to="/profile">Profile</Link>
            </div>
        </div>
    );
};

export default Navbar;