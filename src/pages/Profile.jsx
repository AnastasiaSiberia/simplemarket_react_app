import React, {useContext, useEffect, useState} from 'react';
import {useHistory, useParams} from "react-router-dom";
import {useFetching} from "../hooks/useFetching";
import ProductService from "../API/ProductService";
import {AuthContext} from "../context/context";
import classes from "../components/UI/button/MyButton.module.css"

const ProductIdPage = () => {
    const router = useHistory()
    const params = useParams()
    const {role, setRole} = useContext(AuthContext)
    const [user, setUser] = useState({})
    const {isAuth, setIsAuth} = useContext(AuthContext)

    const [fetchCurUser, isLoading, error] = useFetching(async() => {
        const response = await ProductService.getCurUserInfo()
        setUser(response.data)
    })

    useEffect(() => {
        fetchCurUser()
    }, [])

    const logout = () => {
        setIsAuth(false)
        setRole('')
        localStorage.removeItem('auth')
        localStorage.removeItem('JWTToken')
        localStorage.removeItem('role')
        localStorage.removeItem('myname')
        localStorage.setItem('basketSize', '0')
        router.push('/login')
    }

    return (
        <div>
            <h1 style={{padding: '15px', color: 'coral', textAlign: 'center'}}> Привет, {user.username} </h1>
            {
                (role === 'USER' || role === 'VENDOR')
                &&
                <div>
                    <div>
                        <button className={classes.profileButton} onClick = {() => router.push(`/basket`)}>Корзина</button>
                    </div>
                    <div>
                        <button className={classes.profileButton} onClick = {() => router.push('/order_history')}>История покупок</button>
                    </div>
                </div>
            }
            <div>
                <button className={classes.profileButton} onClick = {() => logout()}>Выйти</button>
            </div>
        </div>
    );
};

export default ProductIdPage;