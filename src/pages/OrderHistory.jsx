import React, {useEffect, useState} from 'react'
import OrderList from "../components/lists/OrderList";
import ProductList from "../components/lists/ProductList";
import {useFetching} from "../hooks/useFetching";
import ProductService from "../API/ProductService";
import Pagination from "../components/UI/pagination/Pagination";
import {getPageCount} from "../utils/utils";
const OrderHistory = () => {
    const [allOrders, setAllOrders] = useState([])
    const [orders, setOrders] = useState([])
    const [totalPages, setTotalPages] = useState(0)
    const [limit, setLimit] = useState(10)
    const [page, setPage] = useState(1)

    const [fetchAllOrders, isLoading, error] = useFetching(async() => {
        let response = await ProductService.getOrders()
        const promises = response.data.map(async(order) => {
            const res = await ProductService.getById(order.product_id)
            const product = res.data
            order = {...order, product_name: res.data.product_name, vendor_name: res.data.vendor_name}
            return order
        })
        let result = await Promise.all(promises)
        result = result.sort((a, b) => a.date < b.date ? 1 : -1)
        setAllOrders(result)
        setTotalPages(getPageCount(result.length, limit))
        updatePageContent(result, page)
    })

    const updatePageContent = (allOrders, page) => {
        let newOrderList = []
        for(let i = limit * (page - 1); i < limit * page && i < allOrders.length; i++) {
            newOrderList = [...newOrderList, allOrders[i]]
        }
        setOrders(newOrderList)
    }

    useEffect(() => {
        fetchAllOrders()
    }, [])

    const changePage = (newPage) => {
        setPage(newPage)
        updatePageContent(allOrders, newPage)
    }


    return (
        <div>
            { error &&
                <h1>Error! ${error}</h1>
            }
            <OrderList orders={orders} title='Заказы'/>
            <Pagination page={page} totalPages={totalPages} changePage={changePage}/>
        </div>
    )
}

export default OrderHistory