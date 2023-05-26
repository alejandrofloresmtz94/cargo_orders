import { Fragment, useEffect, useState } from 'react';
import TabSelector from '../../components/tabSelector/TabSelector';
import SearchBar from '../../components/searchBar/SearchBar';
import Orders from '../../components/orders/Orders';
import { getUpcomingOrders } from '../../services/services';

const OrdersList = () => {
  const [selectedType, setSelectedType] = useState(1);
  const [filter, setFilter] = useState("");
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getUpcomingOrders()
      .then((data) => setOrders(data))
  }, []);

  return (
    <Fragment>
      <TabSelector selectedType={selectedType} setSelectedType={setSelectedType} />
      <SearchBar filter={filter} setFilter={setFilter} />
      <Orders orders={orders} filter={filter}/>
    </Fragment>
  )
}

export default OrdersList;