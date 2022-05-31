import React, {useEffect, useState} from "react";
import ProductList from "../components/lists/ProductList";
import {useFetching} from "../hooks/useFetching";
import ProductService from "../API/ProductService";
import {getPageCount} from "../utils/utils";
import MyButton from "../components/UI/button/MyButton";
import {useHistory} from "react-router-dom";

function Basket() {
    const [productList, setProductList] = useState([])
    const [basketList, setBasketList] = useState([])

    const removeProduct = (product) => {
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
        <div className='App'>
            <ProductList remove={removeProduct} products={productList} title='Корзина' canAdd={false}/>
            {
                productList.length > 0 && 
                <MyButton onClick={() => pay()} style={{marginTop: '20px', width: '100%'}}>Перейти к оплате</MyButton>
            }
        </div>
    );
}

export default Basket;