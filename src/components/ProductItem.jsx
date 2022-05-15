import React from 'react';
import {useHistory} from "react-router-dom";

const ProductItem = (props) => {
    const router = useHistory()
    return (
        <div className="post" onClick={() => router.push(`/products/${props.product.product_id}`)} >
            <div className="post__content" style={{cursor:"pointer"}}>
                <strong>{props.product.product_name}</strong>
                <div>
                    <div>vendor: {props.product.vendor_id}</div>
                    <div>{props.product.product_nviews} views        {props.product.product_rating} rating</div>
                    </div>
            </div>
        </div>
    );
};

export default ProductItem;