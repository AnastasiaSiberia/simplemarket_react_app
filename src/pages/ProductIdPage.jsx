import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {useFetching} from "../hooks/useFetching";
import ProductService from "../API/ProductService";
import Loader from "../components/UI/Loader/Loader";
import classes from "../styles/img.module.css"

const ProductIdPage = () => {
    const params = useParams()
    const [product, setProduct] = useState({})
    const [comment, setComment] = useState([])
    // const [image, setImage] = useState({})

    const [fetchProductById, isLoading, error] = useFetching(async(id) => {
        const response = await ProductService.getById(id)
        setProduct(response.data)
    })
    const [fetchComments, isCommentLoading, commentError] = useFetching(async(id) => {
        const response = await ProductService.getCommentByPostId(id)
        setComment(response.data)
    })
    // const [fetchImage, imgLoading, imgError] = useFetching(async(id, vendorName) => {
    //     const response = await ProductService.getFileURL(vendorName, id)
    //     response !== false && setImage(response)
    // })

    useEffect(() => {
        fetchProductById(params.id)
        //fetchComments(params.id)
    }, [])

    // useEffect(() => {
    //     fetchImage(params.id, product.vendor_name)
    // }, [product.vendor_name])

    return (
        <div>
            {/*{imgLoading*/}
            {/*    ? <Loader/>*/}
            {/*    : (*/}
            {/*        <div>*/}
            {/*            {*/}
            {/*                image !== {}*/}
            {/*                    ? <img className={classes.imgL} src={image} alt={""}/>*/}
            {/*                    : <div/>*/}
            {/*            }*/}
            {/*        </div>*/}
            {/*    )*/}
            {/*}*/}
            {isLoading
                ? <Loader/>
                : (
                    <div>
                        <h1>{product.product_name}</h1>
                        {/*<h2>{product.vendor_name}</h2>*/}
                        <h2>{product.product_description}</h2>
                    </div>
                )
            }
            <h4>
                Reviews
            </h4>
            {/*{ isCommentLoading*/}
            {/*    ? <Loader/>*/}
            {/*    : <div>*/}
            {/*        {*/}
            {/*            comment.map(c =>*/}
            {/*                <div style={{marginTop: 15}}>*/}
            {/*                    <h5>{c.email}</h5>*/}
            {/*                    <div>{c.body}</div>*/}
            {/*                </div>*/}
            {/*            )*/}
            {/*        }*/}
            {/*    </div>*/}
            {/*}*/}
        </div>
    );
};

export default ProductIdPage;