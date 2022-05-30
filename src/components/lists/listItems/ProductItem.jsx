import React, {useEffect, useState} from 'react';
import {useHistory} from "react-router-dom";
import ProductService from "../../../API/ProductService";
import classes from "../../../styles/img.module.css"
import MyButton from "../../UI/button/MyButton";
import {useFetching} from "../../../hooks/useFetching";

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
        const id = props.product.product_id
        const basketId = parseInt(localStorage.getItem('basketSize'))
        localStorage.setItem('basketProductId' + basketId, id)
        localStorage.setItem('basketOrderSize' + basketId, '1')
        localStorage.setItem('basketSize', String(basketId + 1))
    }

    const transit = async () => {
        await ProductService.addViews([{productId: props.product.product_id, size: 1}])
        router.push(`/products/${props.product.product_id}`
            //, {product: props.product}
        )
    }

    const computeRating = () => {
        if(props.product.product_nreviews === 0) return 0
        return props.product.product_rating/props.product.product_nreviews
    }

    return (
        <div className="post" onClick={() => transit()} >
            <div className="post__content" style={{cursor:"pointer"}}>
                <img className={classes.imgM} src={imageURL} alt={""}/>
                <strong>{props.product.product_name}</strong>
                <div>
                    <div>{'Продавец: ' + props.product.vendor_name}</div>
                    <div>{'Цена: ' + props.product.product_price}</div>
                    <div>{'Просмотров: ' + props.product.product_nviews} views        {'Рейтинг: ' + computeRating()} rating</div>
                    <MyButton onClick={() => addToBasket()}>Добавить в корзину</MyButton>
                </div>
            </div>
        </div>
    );
};

export default ProductItem;