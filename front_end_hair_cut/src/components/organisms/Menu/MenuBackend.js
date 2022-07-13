import cn from 'classnames';
import { 
    MdCalculate, 
    MdOutlineMonitor, 
    MdStoreMallDirectory,
    MdOutlineStackedBarChart,
    MdOutlineLibraryBooks 
} from 'react-icons/md';
import { FaRegCalendarAlt } from 'react-icons/fa';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { selectorAccount } from 'stores/account/account.selector';

const Menu = ({hideMenu}) => {

    const router = useRouter();
    const linkTab = {
        dashboard: '/backend',
        store: '/backend/store',
        service: '/backend/service',
        schedule: '/backend/schedule',
        order: '/backend/order',
        user: '/backend/user',
    }
    const commonClass = 'p-7 border-b border-gray-neutrals cursor-pointer hover:text-text-contrast';
    const [activeTab, setActiveTab] = useState('');
    const account = useSelector(selectorAccount);

    useEffect(() => {
        if (Object.values(linkTab).includes(router.asPath)) {
            setActiveTab(router.asPath);
        }
    }, [router.asPath]);

    return (
        <div 
            className={cn(
                "w-36 flex flex-col ",
                {
                    "-ml-36" : hideMenu
                }
            )}
            // style={{height: `calc(100vh - 5rem)`}}
        >
            <Link href={linkTab.dashboard}>
                <div 
                    className={cn(
                        commonClass,
                        {
                            'text-orange-honey': activeTab == linkTab.dashboard
                        }
                    )}
                    style={{height: '100px'}}
                >
                    <div className='text-center '>
                        <MdOutlineStackedBarChart className='mx-auto w-6 h-6'/>
                        <span>Dashboard</span>
                    </div>
                </div>
            </Link>
            <Link href={linkTab.store}>
                <div 
                    className={cn(
                        commonClass,
                        {
                            'text-orange-honey': activeTab == linkTab.store
                        }
                    )} 
                    style={{height: '100px'}}
                >
                    <div className='text-center '>
                        <MdStoreMallDirectory className='mx-auto w-8 h-8'/>
                        <span>Store</span>
                    </div>
                </div>
            </Link>
            <Link href={linkTab.service}>
                <div 
                    className={cn(
                        commonClass,
                        {
                            'text-orange-honey': activeTab == linkTab.service
                        }
                    )}
                    style={{height: '100px'}}
                >
                    <div className='text-center '>
                        <MdOutlineMonitor className='mx-auto w-6 h-6'/>
                        <span>Service</span>
                    </div>
                </div>
            </Link>
            <Link href={linkTab.schedule}>
                <div 
                    className={cn(
                        commonClass,
                        {
                            'text-orange-honey': activeTab == linkTab.schedule
                        }
                    )}
                    style={{height: '100px'}}
                >
                    <div className='text-center '>
                        <FaRegCalendarAlt className='mx-auto w-6 h-6'/>
                        <span>Schedule</span>
                    </div>
                </div>
            </Link>
            <Link href={linkTab.order}>
                <div 
                    className={cn(
                        commonClass,
                        {
                            'text-orange-honey': activeTab == linkTab.order
                        }
                    )}
                    style={{height: '100px'}}
                >
                    <div className='text-center '>
                        <MdOutlineLibraryBooks className='mx-auto w-6 h-6'/>
                        <span>Order</span>
                    </div>
                </div>
            </Link>
            {account.role === 'admin' &&
                <Link href={linkTab.user}>
                    <div 
                        className={cn(
                            commonClass,
                            {
                                'text-orange-honey': activeTab == linkTab.user
                            }
                        )}
                        style={{height: '100px'}}
                    >
                        <div className='text-center '>
                            <MdOutlineLibraryBooks className='mx-auto w-6 h-6'/>
                            <span>User</span>
                        </div>
                    </div>
                </Link> 
            }
        </div>
    )
}

export default Menu;