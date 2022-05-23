import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {useFetching} from "../hooks/useFetching";
import ProductService from "../API/ProductService";
import Loader from "../components/UI/Loader/Loader";

const ProductIdPage = () => {
    const params = useParams()
    const [product, setProduct] = useState({})
    const [comment, setComment] = useState([])
    const [fetchProductById, isLoading, error] = useFetching(async(id) => {
        const response = await ProductService.getById(id)
        setProduct(response.data)
    })
    const [fetchComments, isCommentLoading, commentError] = useFetching(async(id) => {
        //const response = await ProductService.getCommentByPostId(id)
        //setComment(response.data)
    })

    useEffect(() => {
        fetchProductById(params.id)
        fetchComments(params.id)
    }, [])
    return (
        <div>
            {isLoading
                ? <Loader/>
                : (
                    <div>
                        <h1>{product.product_name}</h1>
                        <h2>{product.vendor_name}</h2>
                    </div>
                )
            }
            <h4>
                Comments
            </h4>
            { isCommentLoading
                ? <Loader/>
                : <div>
                    {
                        comment.map(c =>
                            <div style={{marginTop: 15}}>
                                <h5>{c.email}</h5>
                                <div>{c.body}</div>
                            </div>
                        )
                    }
                </div>
            }
        </div>
    );
};

export default ProductIdPage;