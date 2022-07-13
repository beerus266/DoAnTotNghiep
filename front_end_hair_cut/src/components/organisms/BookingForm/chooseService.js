import { useEffect, useState } from 'react';
import cn from 'classnames';
import { axios } from 'utils/axios';;

const ChooseService = ({setServices, setIsOpenChooseService, salonId}) => {

    const [pickedServices, setPickedServices] = useState([]);
    const [isChooseMainService, setIsChooseMainService] = useState(false);
    const [mainServiceId, setMainServiceId] = useState(0);
    const [data, setData] = useState([]);

    const formatPrice = (price) => {
        return price.slice(0, -3);
    }

    const pickOneService = (id) => {
        let _pickedServices = [...pickedServices];
        const _service = data.filter(s => s.id === id);

        if (_pickedServices.includes(id)) {
            if (_service[0].isMainService) {
                setIsChooseMainService(false);
                setMainServiceId(0);
            }
            _pickedServices.splice(_pickedServices.indexOf(id), 1);
        } else {
            if (_service[0].isMainService) {
                setIsChooseMainService(true);
                setMainServiceId(id);
            }
            _pickedServices.push(id);
        }
        setPickedServices(_pickedServices);
    }

    const confirmPickServices = () => {
        setServices(data.filter(service => pickedServices.includes(service.id)));
        setIsOpenChooseService(false);
    }

    const callData = () => {
        axios.get(`/store/${salonId}/getListService`, {}).then((res) => {
            setData(res.data);
        }); 
    }

    useEffect(() => {
        callData();
    }, []);

    return (
        <div>
            <div className="m-4">
                <div className="grid grid-cols-2 gap-x-4 gap-y-8 mb-4">
                    {data.map((service) => 
                        <div key={service.id} className='flex flex-col justify-between'>
                            <img className="w-full" src={service.image_url}/>
                            <h1 className="text-lg mb-2 font-semibold my-2 ">{service.name}</h1>
                            <p className="text-sm font-thin">{service.description}</p>
                            <h2 
                                className={cn(
                                    "text-2xl font-semibold text-orange-carrot inline my-5",
                                    service.isMainService ? 'text-orange-carrot' : 'text-green-neutral'
                                )}
                            >
                                Price: {formatPrice(service.price)}K
                            </h2>
                            <div
                                className={cn(
                                    isChooseMainService && service.isMainService && mainServiceId !== service.id ? 'cursor-not-allowed text-text-light' : ''
                                )}
                            >
                                <button 
                                    className={cn(
                                        "w-full h-10 bg-gray-light rounded-md font-semibold",
                                        pickedServices.includes(service.id) ? 'bg-orange-honey' : 'bg-gray-light',
                                        isChooseMainService && service.isMainService && mainServiceId !== service.id ? 'pointer-events-none text-text-light' : 'hover:bg-orange-honey'
                                    )}
                                    onClick={() => pickOneService(service.id)}
                                >
                                    <span>
                                        {pickedServices.includes(service.id) ? 'picked': 'pick'}
                                    </span>
                                </button>
                            </div>

                        </div>
                    )}
                </div>
            </div>
            <div className="sticky bottom-0 w-full p-4 bg-white">
                <button 
                    className={cn(
                        "w-full h-12 rounded-md font-semibold",
                        pickedServices.length === 0 ? 'bg-gray-light' : 'bg-orange-honey'
                    )}
                    onClick={confirmPickServices}
                >
                    Picks {pickedServices.length} services
                </button>
            </div>
        </div>
    )
}

export default ChooseService;