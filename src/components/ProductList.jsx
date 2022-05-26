import React from 'react';
import ProductItem from "./ProductItem";
import {CSSTransition, TransitionGroup} from "react-transition-group";

const ProductList = ({products, title, remove}) => {
    if(products.length === 0) {
        return (
            <h1 style={{textAlign:'center'}}>
                No products!
            </h1>
        )
    }
    return (
        <div>
            <h1 style={{textAlign:"center"}}>{title}</h1>
            //<TransitionGroup>
                {products.map((product, index) =>
                    //<CSSTransition key={product.product_id} timeout={500} classNames='post'>
                        <ProductItem remove={remove} number={index + 1} product={product} />
                    //</CSSTransition>
                )}
            //</TransitionGroup>
        </div>
    );
};

export default ProductList;