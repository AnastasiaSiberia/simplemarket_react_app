import React, {useEffect, useState} from 'react'
import OrderList from "../components/lists/OrderList";
import ProductList from "../components/lists/ProductList";
import {useFetching} from "../hooks/useFetching";
import ProductService from "../API/ProductService";
const OrderHistory = () => {
    const [orders, setOrders] = useState([])
    const [products, setProducts] = useState([])

    const addProduct = async(orders) => {
        return
    }

    const [fetchOrders, isLoading, Error] = useFetching(async() => {
        let response = await ProductService.getOrders()
        const promises = response.data.map(async(order) => {
            const res = await ProductService.getById(order.product_id)
            const product = res.data
            order = {...order, product_name: res.data.product_name, vendor_name: res.data.vendor_name}
            //order.product_name = product.product_name
            //order.vendor_name = product.vendor_name
            return order
        })
        setOrders(await Promise.all(promises))
    })

    useEffect(() => {
        fetchOrders()
    }, [])
    return (
        <OrderList orders={orders} title='Заказы'/>
    )
}

export default OrderHistory