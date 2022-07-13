import cn from "classnames";

const Button = ({ className, text, onClickFunc = () => {}, variant, ...rest}) => {
    return (
        <button
            className={cn(
                className,
                'px-2 py-1 rounded-2xl ',
                {
                    'bg-green-g400 hover:bg-green-g500 text-white' : variant == 'primary',
                    'border border-green-g400 text-green-g400 hover:text-white hover:bg-green-g400' : variant == 'outline-primary',
                    'bg-orange-y300 text-black hover:bg-yellow-neutral': variant == 'yellow',
                    'bg-red hover:bg-red-dark text-white': variant == 'danger',
                    'bg-gray-n600 hover:bg-gray-neutrals': variant == 'gray'
                },
                
            )}
            onClick={() => onClickFunc()}
            {...rest}
        >
            {text}
        </button>
    )
}

export default Button;