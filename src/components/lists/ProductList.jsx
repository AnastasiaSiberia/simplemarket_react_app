import React from 'react';
import ProductItem from "./listItems/ProductItem";
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
                {products.map((product, index) =>
                        <ProductItem remove={remove} number={index + 1} product={product} />
                )}
        </div>
    );
};

export default ProductList;