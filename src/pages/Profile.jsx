import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {useFetching} from "../hooks/useFetching";
import ProductService from "../API/ProductService";
import Loader from "../components/UI/Loader/Loader";

const ProductIdPage = () => {
    const params = useParams()
    const [user, setUser] = useState({})
    const [fetchCurUser, isLoading, error] = useFetching(async() => {
        const response = await ProductService.getCurUserInfo()
        setUser(response.data)
        console.log(user)
    })

    useEffect(() => {
        fetchCurUser()
    }, [])

    return (
        <div>
            <h1> Hello, {user.username} </h1>
            {user.user_role}
        </div>
    );
};

export default ProductIdPage;