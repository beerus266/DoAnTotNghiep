import cn from 'classnames';
import Link from 'next/link';
import { BsCheck2, BsFillStarFill, BsStarHalf } from 'react-icons/bs';

const StoreItem = ({ store = {} }) => {
    const href = `/store/${store.slug}`;
    const image_url = store.image_url || '/placeholder.jpg';
    return (
        <Link href={href}>
            <a>
                <div className="border border-gray rounded-lg hover:border-orange-honey cursor-pointer hover:text-orange-honey">
                    <div className={cn('relative pb-full')}>
                        <div className="w-full h-full top-0">
                            <img
                                className="w-full h-full max-h-44"
                                src={image_url}
                                alt={store.name}
                                // width={300}
                                // height={300}
                                // quality={100}
                            />
                        </div>
                    </div>

                    <div className={cn('py-1 md:py-2 px-2 md:px-4')}>
                        <div className="truncate l:text-2xl text-lg mb-2 font-semibold my-2 l:my-0">
                            {store.name}
                        </div>
                        <div className='text-text-light text-base truncate my-1'>
                            {store.address}
                        </div>
                        <div className='mt-3 flex text-yellow-neutral gap-1'>
                            <BsFillStarFill />
                            <BsFillStarFill />
                            <BsFillStarFill />
                            <BsStarHalf />
                        </div>
                        <div
                            className={cn(
                                'text-sm flex justify-between text-text mt-5',
                            )}
                        >
                            <div className='flex'>
                                <BsCheck2  className='h-4 w-4 mt-1 mr-1'/>
                                <span className='text-sm'>air-condition</span>
                            </div>
                            <div className='flex'>
                                <BsCheck2  className='h-4 w-4 mt-1 mr-1'/>
                                <span className='text-sm'>Wifi</span>
                            </div>
                        </div>
                    </div>
                </div>
            </a>
        </Link>
    );
};

export default StoreItem;
