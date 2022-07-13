import cn from 'classnames';
import { useState } from 'react';
import { AiFillCheckCircle, AiFillCloseCircle, AiFillInfoCircle } from 'react-icons/ai';

const Alert = ({text, variant, className}) => {
    let title = '';
    const icons = {
        success: <AiFillCheckCircle className='w-5 h-5'/>,
        danger: <AiFillCloseCircle className='w-5 h-5'/>,
        warning: <AiFillInfoCircle className='w-5 h-5'/>,
    }

    switch (variant) {
        case 'success':
            title = 'success!'
            break
        case 'danger':
            title = 'danger!'
            break
        case 'warning':
            title = 'warning!'
            break    
    }

    return (
        <>
            <div 
                className={cn(
                    className,
                    "border rounded-xl px-5 py-4 text-white flex z-10",
                    {
                        'bg-green-neutral': variant == 'success',
                        'bg-red-neutral': variant == 'danger',
                        'bg-yellow-neutral': variant == 'warning',
                    }
                )}
            >
                {icons[variant]}
                <strong className='uppercase mr-4 ml-2'>{title}</strong>
                {text}
            </div>
        </>
    )
}

export default Alert;