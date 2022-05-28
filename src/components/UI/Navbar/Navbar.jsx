import React, {useContext} from 'react';
import {Link} from "react-router-dom";
import MyButton from "../button/MyButton";
import {AuthContext} from "../../../context/context";

const Navbar = () => {
    const {isAuth, setIsAuth} = useContext(AuthContext)
    const {role, setRole} = useContext(AuthContext)
    const logout = () => {
        setIsAuth(false)
        setRole('')
        localStorage.removeItem('auth')
        localStorage.removeItem('JWTToken')
        localStorage.removeItem('role')
    }

    const login = () => {
        //window.location.assign('http://localhost:8080/login');
        window.location.assign('http://localhost:3000/login');
    }
    return (
        <div className='navbar'>
            {isAuth
                ? <MyButton onClick={logout}>Exit</MyButton>
                : <MyButton onClick={login}>Login</MyButton>
            }
            <div className="navbar__link">
                <Link to="/products">Products</Link>
                {isAuth && <Link to="/profile">Profile</Link>}
                {isAuth && <Link to="/basket">Basket</Link>}
                {localStorage.getItem('role') === 'ADMIN' && <Link to="/users">Users</Link>}
            </div>
        </div>
    );
};

export default Navbar;