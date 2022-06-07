import React, {useContext, useState} from 'react';
import MyInput from "../components/UI/input/MyInput";
import MyButton from "../components/UI/button/MyButton";
import {AuthContext} from "../context/context";
import ProductService from "../API/ProductService";
import {useHistory} from "react-router-dom";

const Registration = () => {
    const router = useHistory()
    const [authInfo, setAuthInfo] = useState({});
    const [error, setError] = useState('')

    const register= async (e) => {
        e.preventDefault()
        if(authInfo.password.length === 0) {
            setError('Введите пароль')
            return;
        }
        if(authInfo.password === authInfo.repeatedPassword) {
            const response = await ProductService.addUser(authInfo)
            if(response === true) {

            }
            else {
                setError(response)
            }
            router.push("/products")
        }
        else {
            setError('Пароли не совпадают')
        }
    }

    return (
        <div>
            <h1>Регистрация</h1>
            {
                error !== '' &&
                <div className="errorPrompt">{error}</div>
            }
            <form onSubmit={register}>
                <MyInput type="text" placeholder="Введите вашу почту" value={authInfo.email}
                         onChange={event => setAuthInfo({...authInfo, email: event.target.value})}/>
                <MyInput type="text" placeholder="Введите ваш никнейм" value={authInfo.username}
                         onChange={event => setAuthInfo({...authInfo, username: event.target.value})}/>
                <MyInput type="password" placeholder="Введите ваш пароль" value={authInfo.password}
                         onChange={event => setAuthInfo({...authInfo, password: event.target.value})}/>
                <MyInput type="password" placeholder="Повторите ваш пароль" value={authInfo.repeatedPassword}
                         onChange={event => setAuthInfo({...authInfo, repeatedPassword: event.target.value})}/>
                <MyButton onClick={(event) => register(event)}>Зарегистрироваться</MyButton>
                <MyButton onClick={() => router.push("/login")}>У меня уже есть аккаунт</MyButton>
            </form>
        </div>
    );
};

export default Registration;