import Link from 'next/link';

const Menu = ({}) => {
    return (
        <div className="w-full h-full overflow-x-auto">
            <div className="flex mx-auto max-w-full text-lg">
                <div className="h-full w-full">
                    <ul className="flex">
                        <li className="flex p-2.5 px-4 justify-between "> 
                            <Link href='/abc'>
                                <a className='min-h-10 block l:h-full l:relative text-lg l:text-base truncate'>
                                    Home
                                </a>
                            </Link>
                        </li>
                        <li className="flex p-2.5 px-4 justify-between ">
                            <Link href='/abc'>
                                <a className='min-h-10 block l:h-full l:relative text-lg l:text-base truncate'>
                                    Store
                                </a>
                            </Link>
                        </li>
                        <li className="flex p-2.5 px-4 justify-between ">
                            <Link href='/abc'>
                                <a className='min-h-10 block l:h-full l:relative text-lg l:text-base truncate'>
                                    Hair Style
                                </a>
                            </Link>
                        </li>
                        <li className="flex p-2.5 px-4 justify-between ">
                            <Link href='/abc'>
                                <a className='min-h-10 block l:h-full l:relative text-lg l:text-base truncate'>
                                    Barbers
                                </a>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Menu;