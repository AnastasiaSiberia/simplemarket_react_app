import React, {useContext, useEffect, useState} from 'react';
import {useHistory, useParams} from "react-router-dom";
import {useFetching} from "../hooks/useFetching";
import ProductService from "../API/ProductService";
import Loader from "../components/UI/Loader/Loader";
import {AuthContext} from "../context/context";
import MyButton from "../components/UI/button/MyButton";

const ProductIdPage = () => {
    const router = useHistory()
    const params = useParams()
    const {role, setRole} = useContext(AuthContext)
    const [user, setUser] = useState({})
    const [fetchCurUser, isLoading, error] = useFetching(async() => {
        const response = await ProductService.getCurUserInfo()
        setUser(response.data)
    })

    useEffect(() => {
        fetchCurUser()
    }, [])

    return (
        <div>
            <h1> Hello, {user.username} </h1>
            {
                (role === 'USER' || role === 'VENDOR')
                && <div>
                    <MyButton onClick = {() => router.push(`/basket`)}>Корзина</MyButton>
                    <MyButton>История покупок</MyButton>
                </div>
            }
        </div>
    );
};

export default ProductIdPage;