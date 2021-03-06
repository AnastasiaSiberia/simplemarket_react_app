import React, {useEffect, useState} from "react";
import ProductList from "../components/lists/ProductList";
import {useFetching} from "../hooks/useFetching";
import ProductService from "../API/ProductService";
import MyButton from "../components/UI/button/MyButton";

function Basket() {
    const [productList, setProductList] = useState([])
    const [basketList, setBasketList] = useState([])

    const removeProduct = (product) => {
        setProductList(product.filter(p => p.id !== product.product_id))
    }
    const [fetchProducts, isProductLoading, productError] = useFetching(async(list) => {
        let newList = []
        for (const orderInfo of list) {
                const response = await ProductService.getById(orderInfo.product_id)
                newList = [...newList, response.data]
        }
        setProductList(newList)
    })

    useEffect(() => {
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