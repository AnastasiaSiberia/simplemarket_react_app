import React, {useContext} from 'react';
import MyInput from "../components/UI/input/MyInput";
import MyButton from "../components/UI/button/MyButton";
import {AuthContext} from "../context/context";
import ProductService from "../API/ProductService";

const Login = () => {
    const {isAuth, setIsAuth} = useContext(AuthContext)
    const login = (e) => {
        e.preventDefault()
        console.log('LOGIN')
        setIsAuth(true)
        localStorage.setItem('auth', 'true')
    }
    return (
        <div>
            <h1>The page to log-in</h1>
            <form onSubmit={login}>
                <div><label> User Name : <input type="text" name="username"/> </label></div>
                <div><label> Password: <input type="password" name="password"/> </label></div>
                <div><input type="submit" value="Sign In"/></div>
            </form>
        </div>

    );
};

export default Login;

