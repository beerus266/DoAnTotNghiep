import { BiHappyHeartEyes } from 'react-icons/bi';

const Success = ({data}) => {
    
    return (
        <div className="p-5">
            <div className="text-xl font-bold text-left flex items-center border-b pb-5 border-b-gray-n600 mb-5">
                <span className=' text-text-green'>Book calendar successfully. We 'll contact you sooner.</span>
                <BiHappyHeartEyes className='text-orange-honey'/>
            </div>
            <div className='border-b pb-5 border-b-gray-n600 mb-5'>
                <img 
                    src={data.store.image_url}
                    className='mx-auto mb-2'
                />
                <p className='text-2xl font-bold'>
                    {data.store.address}
                </p>
                <p className='text-sm text-gray-cm'>
                    {data.store.description}
                </p>
            </div>
            <div className='border-b pb-5 border-b-gray-n600 mb-5'>
                <h2 className='text-xl font-bold mb-4'>Detail</h2>
                <div className='pl-3'>
                    <h4 className='font-semibold'>Services:</h4>
                    <ul role="list" className='list-disc pl-5'>
                        {data.services.map((service) => 
                            <li>{service.name}</li>
                        )}
                    </ul>
                </div>
                <div  className='pl-3'>
                    <h4 className='font-semibold mt-3'>Date vs Time:</h4>
                    <ul role="list" className='list-disc pl-5'>
                        <li>{data.pickedTime} !!! {data.date}</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Success;