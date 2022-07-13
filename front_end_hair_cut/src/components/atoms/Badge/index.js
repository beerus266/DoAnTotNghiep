import cn from "classnames";

const Badge = ({ className, variant, text}) => {
    return (
        <span
            className={cn(
                className,
                'rounded-2xl p-2',
                {
                    'bg-green-g400 text-white' : variant == 'green',
                    'bg-orange-y300 text-black': variant == 'yellow',
                    'bg-red  text-white': variant == 'red',
                    'bg-blue-neutral text-white ': variant == 'blue'
                },
            )}
        >
            {text}
        </span>
    )
}

export default Badge;