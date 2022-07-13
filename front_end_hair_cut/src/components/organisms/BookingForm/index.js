import { useState, useRef, useEffect } from 'react';
import ChooseSalon from './chooseSalon';
import ChooseService from './chooseService';
import { AiOutlineArrowLeft, AiOutlineCalendar } from 'react-icons/ai';
import { MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowRight, MdOutlineKeyboardArrowLeft } from 'react-icons/md';
import cn from 'classnames';
import Success from './success';
import { axios } from 'utils/axios';
import { useRouter } from 'next/router';
import { renderShiftToRange } from 'utils/helpers';

const BookingForm = () => {

    const router = useRouter();
    const [title, setTitle] = useState('Booking cut hair');
    const [salonInfor, setSalonInfor] = useState({});
    const [services, setServices] = useState([]);
    const [schedules, setSchedules] = useState([]);
    const [pickedSchedule, setPickedSchedule] = useState({});
    const [pickedTime, setPickedTime] = useState();
    const [isOpenChooseSalon, setIsOpenChooseSalon] = useState(false);
    const [isOpenChooseService, setIsOpenChooseService] = useState(false);
    const [isShowCalendar, setIsShowCalendar] = useState(false);
    const [isBookedSuccess, setIsBookedSuccess] = useState(false);
    const [scrollPosition, setScrollPosition] = useState(0);

    const timeTableRef = useRef();

    const chooseSalon = () => {
        setIsOpenChooseSalon(true);
        setTitle('Choose the salon');
    }

    const chooseService = () => {
        setIsOpenChooseService(true);
        setTitle('Choose the service');
    }

    const backBooking = () => {
        setIsOpenChooseSalon(false);
        setIsOpenChooseService(false);
        setTitle('Booking cut hair');
    }

    const pickDate = (schedule) => {
        let _pickedSchedule = pickedSchedule;
        
        _pickedSchedule.pickedTime = '';
        setPickedSchedule(schedule);
    }

    const scrollTimeLeft = () => {
        if (scrollPosition > 0) {
            let parentWidth = timeTableRef.current?.clientWidth; 
            timeTableRef.current.scrollTo({
                behavior: 'smooth',
                left: scrollPosition - parentWidth / 4,
            });

            setScrollPosition(scrollPosition - parentWidth / 4);
        }
    }

    const scrollTimeRight = () => {
        let parentWidth = timeTableRef.current?.clientWidth; 
        let widthRemainHidden = (18 / 3 - 4) * (parentWidth / 4);
        if (widthRemainHidden > scrollPosition) {
            timeTableRef.current.scrollTo({
                behavior: 'smooth',
                left: scrollPosition + parentWidth / 4,
            });
    
            setScrollPosition(scrollPosition + parentWidth / 4);
        }

    }

    const validateInfor = () => {
        if (
            Object.keys(salonInfor).length
            && services.length
            && Object.keys(pickedSchedule).length
            && pickedTime
        ) {
            return true;
        }

        return false
    }

    const submitBookNow = () => {
        if (validateInfor()) {
            axios.post(`order/create`, {
                phoneNumber: router.query.phoneNumber,
                storeId: salonInfor.id,
                servicesId: services.map(s => s.id),
                pickedDate: pickedSchedule.date,
                pickedTime
            }).then((res) => {
                setIsBookedSuccess(true);
            })
        } else {
            alert('Chua chon du thong tin');
        }
    }

    const getSchedule = async () => {
        await axios.get(`/store/${salonInfor.id}/getSchedule`, {}).then((res) => {setSchedules(res.data)});
    }

    useEffect(() => {
        if (!isOpenChooseSalon && !isOpenChooseService) {
            setTitle('Booking cut hair');
        }

    }, [isOpenChooseSalon, isOpenChooseService])

    useEffect(() => {
        if (salonInfor.id) {
            getSchedule();
        }

    }, [salonInfor]);

    return (
        <div className="bg-gray mx-auto">
            <div className="max-w-xl mx-auto bg-white">
                {!isBookedSuccess && (
                    <>
                    <div className="bg-gray-light h-10 flex py-2 items-center relative">
                        {(isOpenChooseSalon || isOpenChooseService) &&
                            <div className='ml-4 absolute cursor-pointer' onClick={backBooking}>
                                <AiOutlineArrowLeft className='h-6 w-6' />
                            </div>
                        }
                        <span className="text-center font-semibold text-xl flex-1">{title}</span>
                    </div>
                    {!isOpenChooseSalon && !isOpenChooseService && (
                        <div>
                            <div className="pt-8 px-4">
                                <div className="flex">
                                    <div className={cn(
                                        'h-4 w-4 rounded-full mt-1',
                                        !!Object.keys(salonInfor).length ? 'bg-green' : 'bg-gray'
                                    )}></div>
                                    <div className='flex-1'>
                                        <div className="font-medium text-lg ml-2">1. Choose our salon</div>
                                        <div 
                                            className=" flex h-10 pl-4 rounded-lg ml-2 mt-3 text-base items-center bg-gray-light cursor-pointer" 
                                            onClick={chooseSalon}
                                        > 
                                            <span className='text-left flex-1 text-gray-neutrals'>{!!Object.keys(salonInfor).length ? salonInfor.address : 'Choose the salon'}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="pt-8 px-4">
                                <div className="flex">
                                    <div className={cn(
                                        'h-4 w-4 rounded-full mt-1',
                                        services.length === 0 ? 'bg-gray' : 'bg-green'
                                    )}></div>
                                    <div className='flex-1'>
                                        <div className="font-medium text-lg ml-2">2. Choose our service</div>
                                        <div 
                                            className=" flex h-10 pl-4 rounded-lg ml-2 mt-3 text-base items-center bg-gray-light cursor-pointer" 
                                            onClick={chooseService}
                                        > 
                                            <span className='text-left flex-1 text-gray-neutrals'>
                                                {services.length === 0 ? 'Choose the service' : `Choose ${services.length} services`}
                                            </span>
                                        </div>
                                        {services.length > 0 && <ul className='list-disc pl-5 ml-2 mt-2'>
                                            {services.map((service) => 
                                                <li>
                                                    {service.name}
                                                </li>
                                            )}
                                        </ul>}
                                    </div>
                                </div>
                            </div>
                            <div className="pt-8 px-4">
                                <div className="flex">
                                    <div className={cn(
                                        'h-4 w-4 rounded-full mt-1',
                                        !!pickedTime ? 'bg-green' : 'bg-gray'
                                    )}></div>
                                    <div className='flex-1'>
                                        <div className="font-medium text-lg ml-2">3. Booking date</div>
                                        <div 
                                            className="flex h-10 pl-4 rounded-lg ml-2 my-3 text-base relative items-center bg-gray-light cursor-pointer" 
                                            onClick={() => setIsShowCalendar(!isShowCalendar)}
                                        > 
                                            <div className='text-left flex-1 text-gray-neutrals flex justify-between'>
                                                <div className='flex'>
                                                    <AiOutlineCalendar className='h-6 w-6 mr-2' />
                                                    <span>
                                                        {pickedSchedule.date || 'Pick date'}
                                                    </span>
                                                </div>
                                                {isShowCalendar 
                                                    ? <MdOutlineKeyboardArrowDown className='h-6 w-6 mr-2 order-last'/>
                                                    : <MdOutlineKeyboardArrowRight className='h-6 w-6 mr-2 order-last'/>}
                                            </div>
                                            {isShowCalendar && 
                                                <div className='absolute top-10 left-0 w-full bg-white z-10'>
                                                    {schedules.map((schedule) =>
                                                        <div className={cn({'cursor-not-allowed': schedule.status == 0})}> 
                                                            <div 
                                                                className={cn(
                                                                    'w-full h-10 border-2 border-gray-light border-t-0 flex items-center',
                                                                    {
                                                                        'bg-gray-n400 pointer-events-none': schedule.status == 0
                                                                    }
                                                                )}
                                                                onClick={() => pickDate(schedule)}
                                                            >
                                                                <div 
                                                                    className='pl-5 mx-auto text-left w-full'
                                                                >
                                                                    {schedule.type} ({schedule.date})
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            }
                                        </div>
                                        {pickedSchedule.type && 
                                            <div className='relative'>
                                                <div className='flex pl-2 overflow-x-hidden w-full flex-col flex-wrap h-60 gap-2' ref={timeTableRef}>
                                                    {renderShiftToRange(pickedSchedule.shift, pickedSchedule.time).map((rangeWorking) => 
                                                        <div 
                                                            className={cn(
                                                                'rounded-md border-2 flex justify-center cursor-pointer hover:bg-orange-y300',
                                                                {
                                                                    'bg-orange-y400' : rangeWorking == pickedTime,
                                                                    'bg-gray-n400 pointer-events-none': pickedSchedule.order.includes(rangeWorking)
                                                                }
                                                            )} 
                                                            onClick={() => setPickedTime(rangeWorking)} 
                                                            style={{width: '23%', height: '30%'}}
                                                        >
                                                            <div className='text-xl self-center'>{rangeWorking}</div>
                                                        </div>
                                                    )}
                                                </div>
                                                <div className='absolute top-0 -left-10 h-full items-center flex pb-2'>
                                                    <MdOutlineKeyboardArrowLeft className=' w-16 h-16 cursor-pointer' onClick={scrollTimeLeft}/>
                                                </div>
                                                <div className='absolute top-0 -right-10 h-full items-center flex pb-2'>
                                                    <MdOutlineKeyboardArrowRight className=' w-16 h-16 cursor-pointer' onClick={scrollTimeRight}/>
                                                </div>
                                            </div>
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className='p-5 w-full'>
                                <button className='bg-orange-honey w-full rounded-lg h-10 font-semibold text-xl' onClick={submitBookNow}>Book now</button>
                                <div className='text-center mt-4'>Pay after cut. Cancel not matter</div>
                            </div>
                        </div>
                    )}
                    </>
                )}

                {isBookedSuccess && <Success data={{
                    store: salonInfor,
                    services,
                    date: pickedSchedule.date,
                    pickedTime
                }}/>}

                { isOpenChooseSalon && <ChooseSalon setSalonInfor={setSalonInfor} setIsOpenChooseSalon={setIsOpenChooseSalon} />}
                { isOpenChooseService && <ChooseService setServices={setServices} setIsOpenChooseService={setIsOpenChooseService} salonId={salonInfor.id}/>}
            </div>
        </div>
    )
}

export default BookingForm;
