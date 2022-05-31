import React, {useContext} from 'react';
import {Link, useHistory} from "react-router-dom";
import {AuthContext} from "../../../context/context";
import ProfileIcon from "../../../icons/profileIcon2.png"
import BusketIcon from "../../../icons/busket.png"
import SearchIcon from "../../../icons/searching.png"
import UsersIcon from "../../../icons/usersIcon.png"
import classes from "./icon.module.css"

const Navbar = () => {
    const router = useHistory()
    const {isAuth, setIsAuth} = useContext(AuthContext)

    const LoginOrProfile = () => {
        if(isAuth) {
            router.push('/profile')
        }
        else {
            router.push('/login')
        }
    }

    return (
        <div className='navbar'>
            <img className={classes.iconButton} src={ProfileIcon} alt="" title="Профиль" onClick={LoginOrProfile}/>
            <img className={classes.iconButton} src={SearchIcon} alt="" title="Товары" onClick={() => router.push('/products')}/>
            <img className={classes.iconButton} src={BusketIcon} alt="" title="Корзина" onClick={() => router.push('/basket')}/>
            {localStorage.getItem('role') === 'ADMIN' &&
                <img className={classes.iconButton} src={UsersIcon} alt="" title="Пользователи" onClick={() => router.push('/users')}/>
            }
        </div>
    );
};

export default Navbar;