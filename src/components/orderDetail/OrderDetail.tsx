import { useEffect, useState } from 'react';
import { getOrderDetail } from '../../services/services';
import { DetailsType, Status } from '../../types/DetailsType';
import classNames from 'classnames';
import useDestinations from '../../hooks/useDestinations';
import Truck from '../../assets/Active Button/truck.svg';
import UserThumbail from '../../assets/Track Card/Driver/Driver.png';
import Check from '../../assets/check.png';
import Arrow from '../../assets/angle-small-down.svg'
import './OrderDetail.css';

const OrderDetail = () => {
    const [orderDetail, setOrderDetail] = useState<DetailsType | undefined>(undefined);
    const [destinationFrom, destinationTo] = useDestinations(orderDetail?.destinations);
    const [showDropoff, setShowDropoff] = useState(false);
    const [showDetail, setShowDetail] = useState(false);

    useEffect(() => {
        getOrderDetail()
            .then((data) => setOrderDetail(data))
    }, []);
    
    return (
        orderDetail !== undefined ? (
            <div className='flex flex-col w-full mt-12 text-white'>
                <div className='flex flex-col w-full pt-2 pl-5 pr-4 mb-20 border-gray-900 pb-7 card card-gradient'>
                    <span className='text-sm text-white font-AvenirMedium'>
                        Referencia { orderDetail.reference_number }
                    </span>
                    <span className='text-lg text-white font-AvenirMedium'>
                        Order #{ orderDetail.order_number }
                    </span>
                    <div className="flex mt-5 row pointer" onClick={() => setShowDropoff(false)}>
                        <div className='flex items-center justify-center mt-3 outer_circle'>
                            <div className='flex items-center justify-center inner_circle'>
                                <img src={Truck} alt="Truck image"/>
                            </div>
                        </div>
                        <div className='flex flex-col w-11/12 pl-5'>
                            <span className='nickname font-AvenirMedium'>PICKUP</span>
                            <span className='text-base font-bold font-AvenirHeavy'>{destinationFrom[0]}</span>
                            <span className='text-sm truncate font-AvenirBook'>{destinationFrom[1]}</span>
                            <div className='flex flex-row items-center justify-between w-32 px-4 mt-2 status_container'>
                                <div className={"h-3 w-3 rounded-full " + orderDetail.destinations[0].status_class} ></div>
                                <span className='text-base font-AvenirMedium'>{orderDetail.destinations[0].status_string}</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-row separator">
                        <div className='w-0 ml-4 border border-gray-700 h-15'></div>
                        <hr className='w-full mt-10 ml-3 border-gray-700 mb-7'/>
                    </div>
                    <div className="flex row pointer" onClick={() => setShowDropoff(true)}>
                        <div className='flex items-center justify-center w-10 h-10 mt-3 outer_circle_dropoff'>
                            <div className='flex items-center justify-center w-3 h-3 inner_circle_dropoff'>
                            </div>
                        </div>
                        <div className='flex flex-col w-11/12 pl-5'>
                            <span className='nickname font-AvenirMedium'>DROPOFF</span>
                            <span className='text-base font-bold font-AvenirHeavy'>{destinationTo[0]}</span>
                            <span className='text-sm truncate font-AvenirBook'>{destinationTo[1]}</span>
                            <div className='flex flex-row items-center justify-between w-32 px-4 mt-2 status_container'>
                                <div className={"h-3 w-3 rounded-full " + orderDetail.destinations[1].status_class} ></div>
                                <span className='text-base font-AvenirMedium'>{orderDetail.destinations[1].status_string}</span>
                            </div>
                        </div>
                    </div> 
                </div>
                <div className='flex flex-col items-center w-full mt-20 border border-gray-700 rounded-xl card-gradient'>
                    <div className='bg-gray-900 border border-black rounded-full w-17 h-17 profileImg'>
                        <img className='w-full h-full' src={ orderDetail.driver.thumbail ? orderDetail.driver.thumbail : UserThumbail } alt="driver thumbail" />
                    </div>
                    <span className='flex justify-center w-full h-20 mt-5 text-xl font-AvenirHeavy'>
                        { new Date(orderDetail.destinations[0].startDate).toLocaleTimeString("es-MX", {
                            hour12:true, hour:"2-digit", minute:"2-digit"
                        }).toUpperCase() }
                    </span>
                    <div className='flex flex-row w-8/12'>
                        <div className="flex flex-col">
                            {
                                orderDetail.status_list.pickup.map((status:Status, index:number) =>
                                    (status.active) ?
                                            <div className='flex flex-col items-center justify-center' key={index}>
                                                <div className='flex items-center justify-center w-8 h-8 my-5 bg-yellow-400 rounded-full'>
                                                    <img src={Check} className='w-5 h-5' alt="check image" />
                                                </div>
                                                { index < orderDetail.status_list.pickup.length - 1 ? 
                                                    <div className='self-center w-0 h-8 border border-yellow-400'></div>
                                                : null}
                                            </div>
                                        :
                                        <div className='flex flex-col items-center justify-center' key={index}>
                                            <div className='flex items-center justify-center w-8 h-8 my-5 bg-gray-800 rounded-full'>
                                                <div className="flex w-5 h-5 bg-gray-400 rounded-full items-center-"></div>
                                            </div>
                                            { index < orderDetail.status_list.pickup.length - 1 ? 
                                                    <div className='self-center w-0 h-8 border border-gray-500'></div>
                                                : null}
                                        </div>
                                )
                            }
                            {
                                orderDetail.status_list.pickup.every(status => status.active) ?? (
                                    orderDetail.status_list.dropoff.map((status:Status, index:number) => {
                                        (status.active) ?
                                            <div className='flex flex-col items-center justify-center' key={index}>
                                                <div className='flex items-center justify-center w-8 h-8 my-5 bg-yellow-400 rounded-full'>
                                                    <img src={Check} className='w-5 h-5' alt="check image" />
                                                </div>
                                                { index < (orderDetail.status_list.dropoff.length - 1) ? 
                                                    <div className='self-center w-0 h-8 border border-yellow-400'></div>
                                                : null}
                                            </div>                                    
                                        :
                                            <div className='flex flex-col items-center justify-center' key={index}>
                                                <div className='flex items-center justify-center w-8 h-8 my-5 bg-gray-800 rounded-full'>
                                                    <div className="flex w-5 h-5 bg-gray-400 rounded-full items-center-"></div>
                                                </div>
                                                { index < (orderDetail.status_list.dropoff.length - 1) ? 
                                                    <div className='self-center w-0 h-8 border border-gray-500'></div>
                                                : null}
                                            </div>
                                    })
                                )
                            }
                        </div>
                        <div className='flex flex-col'>
                            {
                                orderDetail.status_list.pickup.map((status:Status, index:number) => 
                                    <span key={index} className={classNames('pt-6 ml-10 text-base font-bold pb-14 font-AvenirHeavy', { "text-[#5B5B5B]" : !status.active } )}>
                                        { status.status }
                                    </span>
                                )
                            }
                            {
                                orderDetail.status_list.pickup.every(status => status.active) ?? (
                                    orderDetail.status_list.dropoff.map((status:Status, index:number) =>
                                        <span key={index} className={classNames('pt-6 ml-10 text-base font-bold pb-14 font-AvenirHeavy', { "text-[#5B5B5B]" : !status.active } )}>
                                            { status.status }
                                        </span>
                                    )
                                )
                            }
                        </div>
                    </div>
                    <div className="flex flex-row w-full h-20">
                        <button className='w-full h-full text-xl font-bold border border-gray-700 rounded-2xl font-AvenirHeavy trackOrder' disabled={ orderDetail.status < 3 }>
                            Track Order
                        </button>
                    </div>
                </div>
                <div className='flex flex-row justify-between px-6 py-2 mt-10 mb-2 border border-gray-800 rounded card-gradient pointer' onClick={() => setShowDetail(!showDetail) }>
                    <span className='text-base font-bold font-AvenirHeavy'>{ showDropoff ? "Dropoff" : "Pickup" } Data</span>
                    <img src={Arrow} alt="Arrow" className={ classNames('w-5 h-5 text-yellow-600', {'rotate-180': showDetail}, {'rotate-90': !showDetail} ) } />
                </div>
                <div className={ classNames('flex flex-col pt-5 px-2', { 'hidden': !showDetail }) }>
                    <span className='my-3 text-base font-AvenirMedium'>
                        { !showDropoff ? orderDetail.destinations[0].address : orderDetail.destinations[1].address }
                    </span>
                    <span className='my-3 text-base font-AvenirMedium'>
                        { !showDropoff ? 
                            new Date(orderDetail.destinations[0].startDate).toLocaleString("es-MX", {
                                day: "2-digit",
                                month: "long",
                                year: "numeric",
                                hour: "2-digit",
                                minute: "2-digit"
                            }) : 
                            new Date(orderDetail.destinations[1].endDate).toLocaleString("es-MX", {
                                day: "2-digit",
                                month: "long",
                                year: "numeric",
                                hour: "2-digit",
                                minute: "2-digit"
                            }) }
                    </span>
                    <span className='my-3 text-base font-AvenirMedium'>
                        { orderDetail.driver.telephone }
                    </span>
                    <span className='my-3 text-base font-AvenirMedium'>
                        { orderDetail.driver.email }
                    </span>
                </div>
            </div>
        ) : null
    );
}

export default OrderDetail;