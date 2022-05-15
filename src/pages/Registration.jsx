import React, {useContext} from 'react';
import MyInput from "../components/UI/input/MyInput";
import MyButton from "../components/UI/button/MyButton";
import {AuthContext} from "../context/context";

const Registration = () => {
    const {isAuth, setIsAuth} = useContext(AuthContext)
    const register= (e) => {
        e.preventDefault()
        setIsAuth(true)
        localStorage.setItem('auth', 'true')
    }
    return (
        <div>
            <h1>The registration</h1>
            <form onSubmit={register}>
                <MyInput type="text" placeholder="Input your email"/>
                <MyInput type="text" placeholder="Input your nickname"/>
                <MyInput type="password" placeholder="Input the password"/>
                <MyInput type="password" placeholder="Repeat the password"/>
                <MyButton>Enter</MyButton>
            </form>
        </div>
    );
};

export default Registration;