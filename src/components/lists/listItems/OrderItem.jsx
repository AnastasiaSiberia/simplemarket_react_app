import React, {useEffect, useState} from 'react';
import {useHistory} from "react-router-dom";
import ProductService from "../../../API/ProductService";
import classes from "../../../styles/img.module.css"
import MyButton from "../../UI/button/MyButton";
import {useFetching} from "../../../hooks/useFetching";

const OrderItem = (props) => {
    const [imageURL, setImageURL] = useState({})
    const [fetchImage, isImageLoading, imageError] = useFetching(async () => {
        const vendorName = props.order.vendor_name
        console.log(props.order)
         setImageURL(await ProductService.getFileURL(vendorName,
             props.order.product_id))
    })
    useEffect(() => {
        fetchImage()
    }, [])
    return (
        <div>
            <div className="post">
                {<img className={classes.imgS} src={imageURL} alt={""}/>}
                <div style={{marginLeft: '10px'}}>
                    <div>{'Номер заказа: ' + props.order.order_id}</div>
                    <div>{'Имя товара: ' + props.order.product_name}</div>
                    <div>{'Бренд: ' + props.order.vendor_name}</div>
                    <div>{'Цена: ' + props.order.order_price}</div>
                    <div>{'Количество: ' + props.order.order_size}</div>
                    <div>{'Время заказа: ' + props.order.order_time}</div>
                </div>
            </div>
        </div>
    );
};

export default OrderItem;