import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useDestinations from '../../hooks/useDestinations';
import Freight from '../../assets/Order 1/header/FCL/freight.svg';
import ContainerTruck from '../../assets/Order 2/FTL/container-truck.svg';
import Truck from '../../assets/Order 1/where to/address/Group 2.svg';
import Marker from '../../assets/Order 1/where to/address/marker.svg';
import Eye from '../../assets/Group 4-1/eye.svg';
import './OrderCard.css';

const OrderCard = ({ order } : any) => {

    const [actualDate, setActualDate] = useState(new Date());
    const [disableResume, setDisabledResume] = useState(true);

    const startDate = new Date(order.start_date);
    const endDate = new Date(order.end_date);
    
    const [destinationFrom, destinationTo] = useDestinations(order.destinations);

    useEffect(() => {
        const clock = setInterval(() => {
            setActualDate(new Date());
            if(order.start_date - actualDate.getMilliseconds() === 0) {
                setDisabledResume(false);
                console.log("Navegar")
            }
        }, 1000)
        return () => clearInterval(clock);
    }, [])

    return (
        <div className="mt-10 text-white">
            <span className="mr-1 text-lg font-AvenirMedium">
                Order
            </span>
            <span className="ml-1 text-lg font-bold font-AvenirMedium">
                #{order.order_number}
            </span>
            <div className="flex flex-col pt-4 mt-4 border card">
                <div className="flex flex-row justify-between px-4">
                    <div className='flex flex-row'>
                        <img src={ order.type === "FCL" ? Freight : ContainerTruck } alt="order type img" />
                        <span className="ml-2 text-base leading-5 font-AvenirMedium">{ order.type }</span>
                    </div>
                    <div className='flex flex-row items-center'>
                        <div className={ "h-3 w-3 rounded-full mr-2 " + order.status_class }></div>
                        <span className='text-xs leading-5 font-AvenirMedium'>{ order.status_string }</span>
                    </div>
                </div>
                <hr className="w-full"/>
                <div className="flex flex-row justify-around px-4">
                    <div className="flex flex-col">
                        <img src={Truck} alt="Pickup image" className='mt-9' />
                        <div className='self-center w-0 h-10 my-3 border-2 border-gray-900'></div>
                        <img src={Marker} alt="Dropoff image" className='mb-10' />
                    </div>
                    <div className="flex flex-col w-8/12 ml-4">
                        <div className="flex flex-col pt-5">
                            <span className='nickname font-AvenirMedium'>{ order.destinations[0]?.nickname }</span>
                            <span className='text-base font-bold font-AvenirHeavy'>{ destinationFrom[0] }</span>
                            <span className='text-sm truncate font-AvenirBook'>{ destinationFrom[1] }</span>
                        </div>
                        <div className="flex flex-col pt-7">
                            <span className='nickname font-AvenirMedium'>{ order.destinations[1]?.nickname }</span>
                            <span className='text-base font-bold font-AvenirHeavy'>{ destinationTo[0] }</span>
                            <span className='text-sm truncate font-AvenirBook'>{ destinationTo[1] }</span>
                        </div>
                    </div>
                    <div className="flex flex-col pl-8">
                        <div className="flex flex-col pt-10">
                            <span className='text-xs text-right date font-AvenirMedium'>{ startDate.getDate() + "/" + (startDate.getMonth()+1) + "/" + startDate.getFullYear() }</span>
                            <span className='text-sm font-bold text-right font-AvenirHeavy'>{ startDate.getHours() + ":" + startDate.getMinutes() }</span>
                        </div>
                        <div className="flex flex-col pt-12">
                            <span className='text-xs text-right date font-AvenirMedium'>{ endDate.getDate() + "/" + (endDate.getMonth()+1) + "/" + endDate.getFullYear() }</span>
                            <span className='text-sm font-bold text-right font-AvenirHeavy'>{ endDate.getHours() + ":" + endDate.getMinutes() }</span>
                        </div>
                    </div>
                </div>
                <div className="flex flex-row items-end justify-between">
                    <button className='pickUpBtn'>
                        Start Pickup in
                        <span className='ml-1 pickupHour'>
                            {/* 
                                // @ts-ignore */}
                            { new Date(order.start_date - actualDate).toLocaleTimeString() }
                        </span>
                    </button>
                    <button disabled={disableResume} >
                        <Link to="/details" className='flex flex-row items-center text-sm font-bold leading-5 text-black font-AvenirHeavy justify-evenly resumeBtn'>
                            Resume
                            <img src={Eye} alt="watch icon" />
                        </Link>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default OrderCard;