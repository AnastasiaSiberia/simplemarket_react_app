import React, {useEffect, useState} from 'react';
import {useHistory} from "react-router-dom";
import ProductService from "../../../API/ProductService";
import classes from "../../../styles/img.module.css"
import MyButton from "../../UI/button/MyButton";
import {useFetching} from "../../../hooks/useFetching";
import rating0 from "../../../icons/rating0.png"
import rating1 from "../../../icons/rating1.png"
import rating2 from "../../../icons/rating2.png"
import rating3 from "../../../icons/rating3.png"
import rating4 from "../../../icons/rating4.png"
import rating5 from "../../../icons/rating5.png"

const ProductItem = (props) => {
    const router = useHistory()
    const [imageURL, setImageURL] = useState({})
    const ratingIconList = [rating0, rating1, rating2, rating3, rating4, rating5]

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
        <div className="post">
            <div style={{cursor:"pointer"}} onClick={() => transit()} >
                <img className={classes.imgM} src={imageURL} alt="" title="Перейти к товару"/>
            </div>
            <div>
                <strong>{props.product.product_name} </strong>
                <img className={classes.ratingImage} src={ratingIconList[computeRating()]} alt="" title={computeRating}/>
                <div>{'Продавец: ' + props.product.vendor_name}</div>
                <div>{props.product.product_nviews} просмотров</div>
            </div>
            <div>{'Цена: ' + props.product.product_price} рублей</div>
            {
                localStorage.getItem('role') !== 'ADMIN' &&
                <MyButton onClick={() => addToBasket()}>Добавить в корзину</MyButton>
            }
        </div>
    );
};

export default ProductItem;