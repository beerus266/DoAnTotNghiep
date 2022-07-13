import React from "react";
import cn from "classnames";

const Input = React.forwardRef(({ className, placeholder, disabled = false, ...rest }, ref) => {


    // const setValue = (e) => onChangeFunc(e.target.value);

    // const setValueOnlyNumber = (e) => {
    //     const value = e.target?.value;
    //     if (!/[^0-9\.]/.test(value)) {
    //         onChangeFunc(value);
    //     }
    // }

    return (
        <input 
            className={cn(
                'border rounded px-4 py-2 border-gray-n600 w-full focus:border-blue focus:outline-none',
                className,
                {
                    'bg-gray-light': disabled
                }
            )}
            placeholder={placeholder}
            ref={ref}
            disabled={disabled}
            {...rest}
        />
    )
});

export default Input;