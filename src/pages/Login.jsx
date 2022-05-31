import React, {useContext, useState} from 'react';
import MyInput from "../components/UI/input/MyInput";
import MyButton from "../components/UI/button/MyButton";
import {AuthContext} from "../context/context";
import ProductService from "../API/ProductService";
import {useHistory} from "react-router-dom";

const Login = () => {
    const {isAuth, setIsAuth, role, setRole} = useContext(AuthContext)
    const router = useHistory()
    //const {role, setRole} = useContext(AuthContext)
    const [authInfo, setAuthInfo] = useState({username:'', password:'', csrf:''});
    const [error, setError] = useState('')
    const login = async(e) => {
        e.preventDefault()
        const response = await ProductService.authorize(authInfo)
        if(!response.hasOwnProperty('authError')) {
            setError('')
            setIsAuth(true);
            localStorage.setItem('auth', 'true')
            localStorage.setItem('JWTToken', response.data.token)
            const userInfo = await ProductService.getCurUserInfo()
            localStorage.setItem('role', userInfo.data.roles[0].roleCode)
            setRole(userInfo.data.roles[0].roleCode)
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
                <MyInput type="text" placeholder={"Никнейм"}
                         value={authInfo.username}
                         onChange={event => setAuthInfo({...authInfo, username: event.target.value})}
                />
                <MyInput type="password" placeholder={"Пароль"}
                         value={authInfo.password}
                         onChange={event => setAuthInfo({...authInfo, password: event.target.value})}
                />
                <MyButton onClick={login}>sign-in</MyButton>
                <MyButton onClick={() => router.push('/registration')}>sign-up</MyButton>
            </form>
        </div>
    );
};

export default Login;

