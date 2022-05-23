import React, {useContext, useState} from 'react';
import MyInput from "../components/UI/input/MyInput";
import MyButton from "../components/UI/button/MyButton";
import {AuthContext} from "../context/context";
import ProductService from "../API/ProductService";

const Login = () => {
    const {isAuth, setIsAuth} = useContext(AuthContext)
    const [authInfo, setAuthInfo] = useState({username:'', password:'', csrf:''});
    const [error, setError] = useState('')
    const login = async(e) => {
        e.preventDefault()
        const response = await ProductService.authorize(authInfo)
        if(response.hasOwnProperty('authError') == false) {
            setError('')
            setIsAuth(true)
            localStorage.setItem('auth', 'true')
            localStorage.setItem('JWTtoken', response.data.token)
        }
        else {
            setError('Не получилось авторизоваться. Проверьте логин и пароль')
        }
    }

    return (
        <div>
            {
                error.length > 0 &&
                <h3>{error}</h3>
            }
            <form>
                <MyInput type="text" placeholder={"username"}
                         value={authInfo.username}
                         onChange={event => setAuthInfo({...authInfo, username: event.target.value})}
                />
                <MyInput type="password" placeholder={"password"}
                         value={authInfo.password}
                         onChange={event => setAuthInfo({...authInfo, password: event.target.value})}
                />
                <MyButton onClick={login}>sign-in</MyButton>
            </form>
        </div>
    );
};

export default Login;

