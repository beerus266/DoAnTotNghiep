import { HiOutlineArrowNarrowRight } from 'react-icons/hi';
import { FaMoneyBill, FaMoneyBillWave, FaRegUser } from 'react-icons/fa';
import cn from 'classnames';
import { MdOutlineStoreMallDirectory } from 'react-icons/md';
import { axios } from 'utils/axios';
import { BsFillCartCheckFill } from 'react-icons/bs';

const Dashboard = ({storeQuantity, orderQuantity, actualRevenue, estimateRevenue}) => {
    // 
    const transitionHover = 'transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-300';
    return (
        <div className="grow bg-gray-light p-10">
            <h1 className='text-5xl mb-2'>Dashboard</h1>
            <div className="flex mb-5">
                <span>Home</span>
                <HiOutlineArrowNarrowRight className='w-10 h-6'/>
                <a href='/backend' className="hover:text-orange-honey">Dashboard</a>
            </div>
            <div className='grid gap-3'>
                <div className='grid grid-cols-4 gap-8'>
                    <div className={cn('h-40 rounded-lg px-4 py-8 flex justify-center items-center bg-orange-honey', transitionHover)}>
                        <div className='flex justify-center items-center w-full'>
                            <div className='basis-1/4'>
                                <MdOutlineStoreMallDirectory className='w-16 h-16 mx-auto text-gray-n400'/>
                            </div>
                            <div className='basis-3/4'>
                                <p className='mt-5 text-center'>Stores</p>
                                <div className='mt-3 text-center text-2xl text-gray-n400'>{storeQuantity}</div>
                            </div>
                        </div>
                    </div>
                    <div className={cn('h-40 rounded-lg px-4 py-8 flex justify-center items-center bg-red-dark', transitionHover)}>
                        <div className='flex justify-center items-center w-full'>
                            <div className='basis-1/4'>
                                <BsFillCartCheckFill className='w-16 h-16 mx-auto text-gray-n400'/>
                            </div>
                            <div className='basis-3/4'>
                                <p className='mt-5 text-center'>Orders</p>
                                <div className='mt-3 text-center text-2xl text-gray-n400'>{orderQuantity}</div>
                            </div>
                        </div>
                    </div>
                    <div className={cn('h-40 rounded-lg px-4 py-8 flex justify-center items-center bg-green-neutral', transitionHover)}>
                        <div className='flex justify-center items-center w-full'>
                            <div className='basis-1/4'>
                                <FaMoneyBillWave className='w-16 h-16 mx-auto text-gray-n400'/>
                            </div>
                            <div className='basis-3/4'>
                                <p className='mt-5 text-center'>Actual revenue</p>
                                <div className='mt-3 text-center text-2xl text-gray-n400'>{actualRevenue} VND</div>
                            </div>
                        </div>
                    </div>
                    <div className={cn('h-40 rounded-lg px-4 py-8 flex justify-center items-center bg-blue-neutral', transitionHover)}>
                        <div className='flex justify-center items-center w-full'>
                            <div className='basis-1/4'>
                                <FaMoneyBill className='w-16 h-16 mx-auto text-gray-n400'/>
                            </div>
                            <div className='basis-3/4'>
                                <p className='mt-5 text-center'>Estimate revenue</p>
                                <div className='mt-3 text-center text-2xl text-gray-n400'>{estimateRevenue} VND</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Dashboard;