import React, {useEffect, useState} from "react";
import ProductList from "../components/ProductList";
import {useFetching} from "../hooks/useFetching";
import ProductService from "../API/ProductService";
import {getPageCount} from "../utils/pages";
import MyButton from "../components/UI/button/MyButton";
import {useHistory} from "react-router-dom";

function Basket() {
    const [productList, setProductList] = useState([])
    const [basketList, setBasketList] = useState([])

    const removePost = (product) => {
        setProductList(product.filter(p => p.id !== product.product_id))
    }

    const [fetchProductById, isLoading, error] = useFetching(async(id) => {
        const response = await ProductService.getById(id)
        setProductList([...productList, response.data])
    })

    const [fetchProducts, isProductLoading, productError] = useFetching(async(list) => {
        list.map(async(orderInfo) => fetchProductById(orderInfo.product_id))
        console.log(productList)
    })

    useEffect(() => {
        localStorage.setItem('backetSize', 0)
        const basketSize = localStorage.getItem('basketSize')
        let list = []
        for(let i = 0; i < basketSize; i++) {
            list = [...list, {
                product_id: localStorage.getItem('basketProductId' + i),
                order_size: localStorage.getItem('basketOrderSize' + i)
            }
            ]
        }
        setBasketList(list)
        fetchProducts(list)
    }, [])

    const pay = async() => {
        await ProductService.pay(basketList)
        localStorage.setItem('basketSize', '0')
        setProductList([])
    }

    return (
        <div>
            <ProductList remove={removePost} products={productList} title='Корзина'/>
            <MyButton onClick={() => pay()}>Перейти к оплате</MyButton>
        </div>
    );
}

export default Basket;