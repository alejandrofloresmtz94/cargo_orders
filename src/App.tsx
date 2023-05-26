import { Routes, Route } from "react-router-dom";
import Header from './components/header/Header';
import OrdersList from './components/ordersList/ordersList';
import OrderDetail from "./components/orderDetail/OrderDetail";
import './App.css';

const App = () => {

  return (
    <div className='min-w-full min-h-screen px-10 pt-20 pb-10 bg-black'>
      <Routes>
        <Route path="/" element={<Header/>}>
          <Route index element={<OrdersList/>}/>
          <Route path="/details" element={<OrderDetail/>}/>
        </Route>
      </Routes>
    </div>
  )
}

export default App
