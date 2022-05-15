import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {useFetching} from "../hooks/useFetching";
import ProductService from "../API/ProductService";
import Loader from "../components/UI/Loader/Loader";

const ProductIdPage = () => {
    const params = useParams()
    const [product, setProduct] = useState({})
    const [fetchProductById, isLoading, error] = useFetching(async(id) => {
        const response = await ProductService.getById(id)
        setProduct(response.data)
    })

    useEffect(() => {
        //fetchUserById(params.id)
    }, [])
    return (
        <div>
            Hello user!
        </div>
    );
};

export default ProductIdPage;