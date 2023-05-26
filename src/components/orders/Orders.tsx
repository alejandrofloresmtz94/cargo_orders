import OrderCard from "../orderCard/OrderCard";

const Orders = ({ orders, filter } : any) => {
    const selectedOrders = filter.length > 0 
        ? orders.filter((val:any) => val.order_number.includes(filter)) 
        : orders;
    
    return (
        <div className="flex flex-col">
            {
                selectedOrders.map((order:any) =>
                    <OrderCard key={order.order_number} order={order} />
                )
            }
        </div>
    )
}

export default Orders;