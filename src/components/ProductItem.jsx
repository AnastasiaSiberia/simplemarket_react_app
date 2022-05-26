import React, {useEffect, useState} from 'react';
import {useHistory} from "react-router-dom";
import ProductService from "../API/ProductService";
import classes from "../styles/img.module.css"
import MyButton from "./UI/button/MyButton";
import {useFetching} from "../hooks/useFetching";

const ProductItem = (props) => {
    const router = useHistory()
    const [imageURL, setImageURL] = useState({})

    const [fetchImage, imageIsLoading, imageError] = useFetching(async() => {
        const response = await ProductService.getFileURL(props.product.vendor_name, props.product.product_id)
        setImageURL(response)
    })
    useEffect(() => {
        fetchImage()
    }, [])

    const addToBasket = () => {
        const id = props.product.product_id //??
    }

    return (
        <div className="post" onClick={() => router.push(`/products/${props.product.product_id}`)} >
            <div className="post__content" style={{cursor:"pointer"}}>
                <img className={classes.imgM} src={imageURL} alt={""}/>
                <strong>{props.product.product_name}</strong>
                <div>
                    <div>{props.product.vendor_name}</div>
                    <div>{props.product.product_nviews} views        {props.product.product_rating} rating</div>
                    <MyButton onClick={addToBasket()}>Добавить в корзину</MyButton>
                </div>
            </div>
        </div>
    );
};

export default ProductItem;