import React from 'react';
import OrderItem from "./listItems/OrderItem";

const OrderList = ({orders, title}) => {
    if(orders.length === 0) {
        return (
            <h1 style={{textAlign:'center'}}>
                No order!
            </h1>
        )
    }
    return (
        <div>
            <h1 style={{textAlign:"center"}}>{title}</h1>
            {
                orders.map((order) =>
                    <OrderItem key={order.order_id} order={order} />
                )
            }
        </div>
    );
};

export default OrderList;