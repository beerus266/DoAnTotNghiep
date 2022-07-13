import { HiOutlineArrowNarrowRight } from 'react-icons/hi';
import { FaRegUser } from 'react-icons/fa';
import cn from 'classnames';

const Dashboard = () => {

    const transitionHover = 'transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-300';
    return (
        <div className="grow bg-gray-light p-10">
            <h1 className='text-5xl mb-2'>Dashboard</h1>
            <div className="flex mb-5">
                <span>Home</span>
                <HiOutlineArrowNarrowRight className='w-10 h-6'/>
                <a href='/backend' className="hover:text-orange-honey">Dashboard</a>
            </div>
            <div className='grid grid-cols-2 gap-3'>
                <div className='grid grid-cols-3 gap-4'>
                    {[1,2,3].map(() =>
                    <div className={cn('h-52 bg-white rounded-lg px-4 py-8 flex justify-center items-center', transitionHover)}>
                        <div>
                            <FaRegUser className='w-8 h-8 mx-auto'/>
                            <p className='mt-5 text-center'>Customers</p>
                            <div className='mt-3 text-center text-2xl'>100</div>
                        </div>
                    </div>
                    )}
                </div>
                <div className='grid grid-cols-4 gap-4'>
                    {[1,2,3,4].map(() =>
                    <div className='h-52 bg-white rounded-lg px-4 py-8 flex justify-center items-center'>
                        <div>
                            <FaRegUser className='w-8 h-8 mx-auto'/>
                            <p className='mt-5 text-center'>Orders</p>
                            <div className='mt-3 text-center text-2xl'>100</div>
                        </div>
                    </div>
                    )}
                </div>
            </div>
        </div>
    )
}
export default Dashboard;