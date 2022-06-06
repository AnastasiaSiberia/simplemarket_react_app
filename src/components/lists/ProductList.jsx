import React from 'react';
import ProductItem from "./listItems/ProductItem";

const ProductList = ({products, title, remove, canAdd}) => {
    if(products.length === 0) {
        return (
            <h1 style={{textAlign:'center', marginTop: "30px"}}>
                Нет товаров!
            </h1>
        )
    }
    return (
        <div>
            <h1 style={{textAlign:"center", marginTop: "30px"}}>{title}</h1>
                {products.map((product, index) =>
                        <ProductItem key={index} remove={remove} number={index + 1} product={product} canAdd={canAdd}/>
                )}
        </div>
    );
};

export default ProductList;