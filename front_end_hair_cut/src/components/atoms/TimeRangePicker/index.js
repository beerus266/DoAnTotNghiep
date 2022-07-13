import { useState, useEffect, useRef } from "react";
import cn from 'classnames';
import useClickOutside from "hooks/useClickOutside";
import { BsClock } from 'react-icons/bs';

const TimeRangePicker = ({value, onChangeValue, disabled = false, className, dataKey}) => {
    const hasValue = !!value;

    const [isOpenTimePicker, setIsOpenTimePicker] = useState(false);
    const [openH, setOpenH] = useState(hasValue ? parseInt(value.split('~')[0].trim().split(':')[0]) : '00');
    const [openM, setOpenM] = useState(hasValue ? parseInt(value.split('~')[0].trim().split(':')[1]) : '00');
    const [closeH, setCloseH] = useState(hasValue ? parseInt(value.split('~')[1].trim().split(':')[0]) : '00');
    const [closeM, setCloseM] = useState(hasValue ? parseInt(value.split('~')[1].trim().split(':')[1]) : '00');
    const [_value, setValue] = useState(value);
    const hours = [...Array(24).keys()].map(x => x);
    const minutes = [...Array(60).keys()].map(x => x);

    const timePickerRef = useRef(null);

    useClickOutside(timePickerRef, () => {
        setIsOpenTimePicker(false);
    });

    useEffect(() => {
        if (disabled) return;
        const h1 = openH ? openH > 9 ? openH : ('0' + openH) : '00';
        const m1 = openM ? openM > 9 ? openM : ('0' + openM) : '00';
        const h2 = closeH ? closeH > 9 ? closeH : ('0' + closeH) : '00';
        const m2 = closeM ? closeM > 9 ? closeM : ('0' + closeM) : '00';

        setValue(`${h1}:${m1} ~ ${h2}:${m2}`);
    }, [openH, openM, closeH, closeM]);

    return (
        <div 
            className={cn(
                className, 
                "relative inline-block w-full",
                {
                    'pointer-events-none': disabled
                }
            )} 
            ref={timePickerRef}
        >
            <div
                className="border rounded w-full p-1 pl-3 border-gray-n600 cursor-pointer flex items-center justify-between" 
                onClick={() => setIsOpenTimePicker(true)} 
            >
                <span name="time-picker-value" data-key={dataKey}>{_value}</span> 
                <BsClock/>
            </div>
            {isOpenTimePicker && <div 
                className="flex absolute bg-white bottom-9 right-0 w-96 h-64 border border-gray-n600 rounded"
            >
                <div className="w-1/2 p-2 h-full ">
                    <div className="text-center">{value.split('~')[0]}</div>
                    <div className="flex h-5/6">
                        <div className="w-1/2 h-full">
                            <div className="h-1/10 text-center bg-gray">Hours</div>
                            <div className="flex flex-col h-full overflow-y-auto">
                                {hours.map((x) => <div 
                                    className={cn(
                                        "hover:bg-green-g200 text-center cursor-pointer",
                                        {
                                            'bg-green-g400': x == openH
                                        }
                                    )}
                                    onClick={() => setOpenH(x)}
                                >
                                    {x}
                                </div>)}
                            </div>
                        </div>
                        <div className="w-1/2 h-full">
                            <div className="h-1/10 text-center bg-gray">Minutes</div>
                            <div className="flex flex-col h-full overflow-y-auto">
                                {minutes.map((x) => <div 
                                    className={cn(
                                        "hover:bg-green-g200 text-center cursor-pointer",
                                        {
                                            'bg-green-g400': x == openM
                                        }
                                    )}
                                    onClick={() => setOpenM(x)}
                                >
                                    {x}
                                </div>)}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-1/2 p-2 h-full">
                    <div className="text-center">{value.split('~')[1]}</div>
                    <div className="flex h-5/6">
                        <div className="w-1/2 h-full">
                            <div className="h-1/10 text-center bg-gray">Hours</div>
                            <div className="flex flex-col h-full overflow-y-auto">
                                {hours.map((x) => <div 
                                    className={cn(
                                        "hover:bg-green-g200 text-center cursor-pointer",
                                        {
                                            'bg-green-g400': x == closeH
                                        }
                                    )}
                                    onClick={() => setCloseH(x)}
                                >
                                    {x}
                                </div>)}
                            </div>
                        </div>
                        <div className="w-1/2 h-full">
                            <div className="h-1/10 text-center bg-gray">Minutes</div>
                            <div className="flex flex-col h-full overflow-y-auto">
                                {minutes.map((x) => <div 
                                    className={cn(
                                        "hover:bg-green-g200 text-center cursor-pointer",
                                        {
                                            'bg-green-g400': x == closeM
                                        }
                                    )}
                                    onClick={() => setCloseM(x)}
                                >
                                    {x}
                                </div>)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>}
        </div>
    )
}

export default TimeRangePicker;