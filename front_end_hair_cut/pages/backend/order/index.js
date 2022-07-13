import cn from "classnames";
import Badge from "components/atoms/Badge";
import Button from "components/atoms/Button";
import Breadcrumb from "components/organisms/Breadcrumb";
import LayoutBackend from "components/organisms/Layouts/LayoutBackend";
import { useState } from "react";

import { axios } from "utils/axios";

import { IoIosCut } from 'react-icons/io';
import { ImCancelCircle } from 'react-icons/im';
import { toast } from "react-toastify";
import { BsCheckCircle, BsSearch } from "react-icons/bs";
import Input from "components/atoms/Input/InputBackend";
import { formatPhoneNumber } from "utils/helpers";

const Order = ({initOrders, stores}) => {

    const [currentStoreId, setCurrentStoreId] = useState(stores[0]?.id);
    const [orders, setOrders] = useState(initOrders);
    const textTdClass = 'text-center py-4 px-2';

    const variantBadge = (status) => {
        let variant = '';
        switch (status) {
            case 'Booked':
                variant = 'blue';
                break;
            case 'Process':
                variant = 'yellow';
                break;
            case 'Done':
                variant = 'green';
                break;
            case 'Cancel':
                variant = 'red';
                break;
        }

        return variant;
    }

    const changeTextSearch = (e) => {
        if (e.key == "Enter") {
            searchOrder(e.target.value);
        }
    }

    const searchOrder = (searchKey) => {
        axios.post('order/search', {
            searchKey,
            storeId: currentStoreId
        }).then((res) => {
            setOrders(res.data);
        }).catch(() => {});
    }

    const changeStore = async (storeId) => {
        const _orders = await axios.post('order/getByStoreId', {
            storeId: storeId,
        })
        .then((res) => res.data)
        .catch((res) => {
    
        });
        setCurrentStoreId(storeId);
        setOrders(_orders || []);
    }

    const total = (serviceOrders) => {
        let total = 0;
        for (const serviceOrder of serviceOrders) {
            total += parseInt(serviceOrder.service.price);
        }

        return total;
    }

    const changeOrderStatus = (orderId, status) => {
        axios.post('order/updateStatus', {
            orderId,
            status
        }).then((res) => {
            const _orders = [...orders];
            _orders.forEach((order) => {
                if (order.id === orderId) {
                    order.status = status;
                }
            });
            setOrders(_orders);
            toast.success('Update status order successfully!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: true,
                pauseOnHover: true,
                theme: "dark"
            });
        }).catch((res) => {console.log(res)});
    }

    return (
        <div className="p-10 grow bg-gray-light">
            <Breadcrumb  
                page={
                    {
                        title: 'Order',
                        url: '/backend/order'
                    }
                }
            />

            <div className="flex my-5 justify-center items-center border rounded border-gray-n600">
                <div className="w-20 text-center cursor-pointer">
                    <BsSearch  className="mx-auto"/>
                </div>
                <input 
                    className={cn(
                        ' px-4 py-2  w-full focus:outline-none'
                    )}
                    placeholder="Enter here to search"
                    onKeyPress={changeTextSearch}
                />
            </div>


            <div className="bg-white inline-block">
                <div className="flex">
                    {stores.map((store) => 
                        <div 
                            className={cn(
                                " w-60 border-r-2 border-r-orange-honey h-8 flex justify-center items-center cursor-pointer", 
                                store.id == currentStoreId ? "bg-white border-t-4 border-t-orange-honey" : "bg-gray-n400"
                            )}
                            onClick={() => changeStore(store.id)}
                        >
                            <h2>{store.name}</h2>
                        </div>
                    )}
                </div>
            </div>

            <div className="w-full h-auto bg-white rounded-lg p-5 drop-shadow-xl mb-5">
                <div className="overflow-x-auto">
                    <table className="w-full table-auto">
                        <thead>
                            <tr className="text-xl">
                                <th className="text-left p-2">STT</th>
                                <th className="p-2">Phone Number</th>
                                <th className="p-2">Date</th>
                                <th className="p-2">Time</th>
                                <th className="p-2">Status</th>
                                <th className="p-2">Service</th>
                                <th className="p-2">Total</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order, index) => <tr className="border-t-2 border-t-gray-light hover:bg-gray-n300" key={order.id}>
                                <td className="pl-2">{index + 1}</td>
                                <td 
                                    className={cn(textTdClass)}
                                >
                                    {formatPhoneNumber(order.phoneNumber)}
                                </td>
                                <td 
                                    className={cn(textTdClass)}
                                >
                                    {order.date}
                                </td>
                                <td 
                                    className={cn(textTdClass)}
                                >
                                    {order.time}
                                </td>
                                <td 
                                    className={cn(textTdClass)}
                                >
                                    <Badge 
                                        text={order.status} 
                                        variant={variantBadge(order.status)}
                                    />
                                </td>
                                <td 
                                    className={cn(
                                        textTdClass,
                                        'max-w-[150px]'
                                    )}
                                >
                                    {order.serviceOrder &&
                                        <div className="text-left">
                                            {order.serviceOrder.map((serviceOrder) => 
                                                <p className="truncate">{serviceOrder.service.name}</p>
                                            )}
                                        </div>
                                    }
                                </td>
                                <td 
                                    className={cn(textTdClass)}
                                >
                                    {order.serviceOrder &&
                                        total(order.serviceOrder)
                                    }
                                </td>
                                <td 
                                    className={cn(
                                        textTdClass,
                                        'flex justify-center'
                                    )}
                                >
                                    {order.status == 'Booked' &&
                                        <IoIosCut onClick={() => changeOrderStatus(order.id, 'Process')} className="border rounded-full w-8 h-8 p-1 text-orange-honey hover:text-orange-y500 cursor-pointer mr-2"/>
                                    }
                                    {order.status == 'Process' &&
                                        <BsCheckCircle onClick={() => changeOrderStatus(order.id, 'Done')} className="w-8 h-8 cursor-pointer mr-2 text-text-green hover:text-green-g500" />
                                    }
                                    {(order.status == 'Booked' || order.status == 'Process') &&
                                        <ImCancelCircle onClick={() => changeOrderStatus(order.id, 'Cancel')} className="w-8 h-8 text-red-dark hover:text-red-neutral cursor-pointer"/>
                                    }
                                </td>
                                
                            </tr>)}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

Order.getLayout = (page) => <LayoutBackend children={page} />

export const getServerSideProps = async (context) => {

    const stores = await axios.get(`store/getStoreTab`, {
        userId: context.req.cookies.userId
    }).then((res) => {
        return res.data;
    }).catch((res) => {

    });

    const orders = await axios.get(`order/getByStoreId/${1}`, {
        headers: {
            "Authorization":`Bearer ${context.req.cookies.user}`
        }
    }).then((res) => {
        return res.data;
    }).catch((res) => {

    });

    if (orders) {
        return {
            props: {
                initOrders: orders,
                stores
            }
        }
    } else {
        return {
            redirect: {
                destination: '/backend/login',
                permanent:false,
            }
        }
    }


}

export default Order;
