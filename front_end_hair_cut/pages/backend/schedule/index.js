import Breadcrumb from "components/organisms/Breadcrumb";
import LayoutBackend from "components/organisms/Layouts/LayoutBackend";
import TimeRangePicker from "components/atoms/TimeRangePicker";
import Button from "components/atoms/Button";
import Alert from "components/atoms/Alert";
import Input from "components/atoms/Input/InputBackend";

import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import cn from 'classnames';

import { useEffect, useState } from "react";
import { MdOutlineAddCircleOutline } from 'react-icons/md';
import { BiMinusCircle } from 'react-icons/bi';
import { BsTrashFill } from "react-icons/bs";
import { formatScheduleShiftToString, formatStringToScheduleTime } from "utils/helpers";
import { axios } from "utils/axios";
import { useRouter } from "next/router";
import ConfirmModal from "components/atoms/ConfirmModal";
import { toast } from "react-toastify";

const Schedule = ({initSchedules = [], stores}) => {

    const router = useRouter();
    const [currentStoreId, setCurrentStoreId] = useState(stores[0]?.id);
    const [schedules, setSchedules] = useState(initSchedules);
    const [openModalConfirm, setOpenModalConfirm] = useState(false);
    const [delScheduleIndex, setDelScheduleIndex] = useState();
    const typeOfSchedule = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Holiday'];

    const changeStore = async (storeId) => {
        const _schedules = await axios.post('schedule/getByStoreId', {
            storeId: storeId,
        })
        .then((res) => res.data)
        .catch((res) => {});
        _schedules.map((s, i) => {s.index = i});
        setSchedules(_schedules || []);
        setCurrentStoreId(storeId);
    }

    const shift = {
        "start": {
            "hour": "08", 
            "minute": "00"
        },
        "end": {
            "hour": "17", 
            "minute": "00"
        }, 
    }

    const addNewSchedule = () => {
        let _schedules = [...schedules];
        _schedules.push({
            id: 0,
            index: _schedules.length,
            type: 'Monday',
            date: 'Every week',
            time: 30,
            shift: [shift]
        });
        setSchedules(_schedules);
    }

    const setValueSchedules = (index, prop, value) => {
        let _schedules = [...schedules];
        let _schedule = _schedules[index];
        if (prop == 'addShift') {
            _schedule.shift.push(shift);
        } else if (prop == 'removeShift') {
            _schedule.shift.pop();
        } else {
            _schedule[prop] = value;
        }
        
        if (prop == 'type') {
            if (value == 'Holiday') {
                _schedule.date = new Date().toLocaleDateString('en-CA');
            } else {
                _schedule.date = 'Every week';
            }
        }

        setSchedules(_schedules);
    }

    const changeTypeOfSchedule = (e) => {
        let index = e.target.closest('tr').getAttribute('data-key').split('_')[1];
        setValueSchedules(index, 'type', e.target.value);
    }

    const onChangeHolidayDateOne = (date, index) => {
        setValueSchedules(index, 'date', new Date(date).toLocaleDateString('en-CA'));
    }

    const addNewShift = (e) => {
        let index = e.target.closest('tr').getAttribute('data-key').split('_')[1];
        setValueSchedules(index, 'addShift');
    }

    const removeShift = (e) => {
        let index = e.target.closest('tr').getAttribute('data-key').split('_')[1];
        setValueSchedules(index, 'removeShift');
    }

    const onRemoveSchedule = (index) => {
        console.log(index);
        setDelScheduleIndex(index);
        setOpenModalConfirm(true);
    }

    const removeSchedule = () => {
        let _schedules = [...schedules];

        axios.post('schedule/delete', {
            scheduleId: _schedules[delScheduleIndex].id
        }).then((data) => {
            setOpenModalConfirm(false);
            _schedules.splice(delScheduleIndex, 1);
            setSchedules(_schedules);
            toast.success('Save schedule successfully!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: true,
                pauseOnHover: true,
            });
        }).catch((res) => {
            console.log(res);
        })


    }

    const loadChangeShiftsData = () => {

        let _schedules = [...schedules];

        _schedules.forEach(s => s.shift = []);

        document.getElementsByName('time-picker-value').forEach((timePicker) => {
            const idAndIndex = timePicker.getAttribute('data-key').split('_');
            _schedules.forEach((schedule) => {
                if (schedule.id == idAndIndex[0] && schedule.index == idAndIndex[1]) {
                    schedule.shift.push(formatStringToScheduleTime(timePicker.textContent));
                }
            });
        });

        setSchedules(_schedules);

    }

    const validateSchedules = () => {
        console.log(schedules);
    }

    const submit = () => {
        loadChangeShiftsData();
        // validateSchedules();
        axios.post('schedule/create', {
            storeId: currentStoreId,
            schedules: schedules
        }).then((res) => {
            toast.success('Save schedule successfully!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: true,
                pauseOnHover: true,
            });
        });
    }

    return (
        <div className="p-10 grow bg-gray-light">
            <Breadcrumb 
                page={
                    {
                        title: 'Schedule',
                        url: '/backend/schedule'
                    }
                }
            />

            {openModalConfirm && 
                <ConfirmModal 
                    title='Delete a schedule ?'
                    content={`You will delete schedule #[${schedules[delScheduleIndex].type}]. Are you sure ?`}
                    setConfirm={removeSchedule}
                    closeModal={() => setOpenModalConfirm(false)}
                />
            }

            <div className="flex justify-end mb-5">
                <Button  text='Add new schedule' variant='outline-primary' onClickFunc={addNewSchedule}/>
            </div>

            <div className="bg-white inline-block">
                <div className="flex">
                    {stores.map((store) => 
                        <div 
                            key={store.id}
                            className={cn(
                                "px-5 border-r-2 border-r-orange-honey h-8 flex justify-center items-center cursor-pointer text-gray-cm", 
                                store.id == currentStoreId ? "bg-white border-t-4 border-t-orange-honey text-black" : "bg-gray-n400"
                            )}
                            onClick={() => changeStore(store.id)}
                        >
                            <h2>{store.name}</h2>
                        </div>
                    )}
                </div>
            </div>
            <div className="w-full h-auto bg-white rounded-lg p-5 drop-shadow-xl mb-5 rounded-t-none">
                <table className="w-full table-auto">
                    <thead>
                        <tr className="text-xl">
                            <th className="text-left p-2">STT</th>
                            <th className="p-2">Type</th>
                            <th className="p-2">Date</th>
                            <th className="p-2">Time (minutes)</th>
                            <th className="p-2">Shift</th>
                        </tr>
                    </thead>
                    <tbody>
                        {schedules.map((schedule, i) => 
                        <tr className="border-t-2 border-t-gray-light hover:bg-gray-n300 relative" data-key={`${schedule.id}_${schedule.index}`} key={schedule.id}>
                            <td className="text-left py-4 px-2 w-1/12">{i + 1}</td>
                            <td className="text-center py-4 px-2 w-1/6">
                                <select 
                                    className="w-full h-9 border rounded-lg p-2 border-gray-n500" 
                                    onChange={(e) => changeTypeOfSchedule(e)}
                                    value={schedule.type}
                                >
                                    {typeOfSchedule.map((type, i) => <option value={type} key={i}>{type}</option>)}
                                </select>
                            </td>
                            <td className="text-center py-4 px-2 w-1/6 pl-5" name='date'>
                                {schedule.type == 'Holiday'
                                    ? <Calendar onChange={(value) => onChangeHolidayDateOne(value, schedule.index)} value={new Date(schedule.date)} className='rounded-lg' />
                                    : <Input
                                        className='text-center'
                                        disabled={true} 
                                        value={schedule.date}
                                    />
                                }
                            </td>
                            {schedule.type == 'Holiday' && <td className="text-center">
                                <Input 
                                    className='text-center w-3/4'
                                    disabled={true}
                                    value={schedule.date}
                                />
                            </td>}
                            {schedule.type != 'Holiday' && 
                                <td className="text-center py-4 px-2 w-1/6">
                                    <Input
                                        className='text-center'
                                        disabled={true} 
                                        defaultValue={schedule.time} 
                                    />
                                </td>
                            }
                            {schedule.type != 'Holiday' && <td className="pr-5">
                                <div className="flex justify-center items-center">
                                    <div className="flex flex-col basis-4/5">
                                        {schedule.shift.map((shift, i) => 
                                            <TimeRangePicker key={i} value={formatScheduleShiftToString(shift)} className='my-1' dataKey={`${schedule.id}_${schedule.index}`}/>
                                        )}
                                    </div>
                                    <div className="flex">
                                        <MdOutlineAddCircleOutline onClick={addNewShift} className="ml-3 w-8 h-8 hover:text-orange-honey cursor-pointer"/>
                                        <BiMinusCircle onClick={removeShift} className="ml-3 w-8 h-8 hover:text-orange-honey cursor-pointer"/>
                                    </div>
                                </div>
                            </td>}
                            <td>
                                <BsTrashFill  className="hover:text-red-dark cursor-pointer mx-auto" onClick={() => onRemoveSchedule(schedule.index)}/>
                            </td>
                        </tr>)}
                    </tbody>
                </table>
            </div>
            <div className="flex justify-end">  
                <Button className='text-2xl w-40 h-12' text='Save' variant='primary' onClickFunc={submit}/>
            </div>
        </div>
    )
}

Schedule.getLayout = (page) => <LayoutBackend children={page} />

export async function getServerSideProps(context) {

    const stores = await axios.get(`store/getStoreTab`, {
        data: {
            userId: context.req.cookies.userId
        }
    }).then((res) => {
        return res.data;
    }).catch((res) => {

    });

    const schedules = await axios.post('schedule/getByStoreId', {
        storeId: stores[0].id,
        headers: {
            "Authorization":`Bearer ${context.req.cookies.user}`
        }
    })
    .then((res) => res.data)
    .catch((res) => {

    });

    if (schedules) {
        schedules.map((s, i) => {s.index = i});

        return {
            props: {
                initSchedules: schedules,
                stores: stores
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

export default Schedule;