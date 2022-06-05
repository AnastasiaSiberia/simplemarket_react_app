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
            localStorage.setItem('myname', authInfo.username)
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
                <div style={{marginTop: '30px', marginBottom: '30px'}}>
                    <MyInput type="text" placeholder={"Никнейм"}
                             value={authInfo.username}
                             onChange={event => setAuthInfo({...authInfo, username: event.target.value})}
                    />
                    <MyInput type="password" placeholder={"Пароль"}
                             value={authInfo.password}
                             onChange={event => setAuthInfo({...authInfo, password: event.target.value})}
                    />
                </div>
                <MyButton onClick={login} style={{width:'100%'}}>Войти</MyButton>
                <div style={{marginTop: '15px'}}>
                    <MyButton style={{width:'100%'}} onClick={() => router.push('/registration')}>Зарегистрироваться</MyButton>
                </div>
            </form>
        </div>
    );
};

export default Login;

