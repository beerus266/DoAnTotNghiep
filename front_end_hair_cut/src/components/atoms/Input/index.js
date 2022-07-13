import React from "react";

const Input  = React.forwardRef(({ className, variant, disabled, hasTransition = true, ...rest }, ref) => {
    let borderClassName = '';
    switch (variant) {
        case 'primary':
            borderClassName = 'border-primary';
            break;
        case 'success':
            borderClassName = 'border-green';
            break;
        case 'error':
            borderClassName = 'border-red';
            break;
        case 'light':
            borderClassName = 'border-text-light';
            break;
        default:
            borderClassName = 'border-gray-light';
            break;
    }

    return (
        <input
            className='w-full bg-gray-light rounded-ssm px-4 py-0.3125 focus:border-blue outline-none placeholder-text-light font-normal text-sm h-10 appearance-none'
            // style={disabled ? { backgroundColor: '#d6d6d6' } : {}}
            disabled={disabled}
            ref={ref}
            {...rest}
        />
    );
});

export default Input;