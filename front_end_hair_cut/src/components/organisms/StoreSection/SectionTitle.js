import cn from 'classnames';
import Link from 'next/link';
// import { Vector } from 'components/atoms/Icons';

const SectionTitle = ({ title, link, hasViewMore = true }) => (
    <div className="flex items-center justify-between mb-4 mt-4">
        {link ? (
            <Link href={link}>
                <h2 className={cn('text-base md:text-2xl font-bold md:font-semibold')}>{title}</h2>
            </Link>
        ) : (
            <h2 className={cn('text-base md:text-2xl font-bold md:font-semibold')}>{title}</h2>
        )}
        {hasViewMore && (
            <Link href={link || ""}>
                <div className="group flex items-center text-blue">
                    <span className={cn('text-sm mr-1.5 group-hover:underline')}>View More</span>
                    {/* <Vector className="block w-3 transform duration-300 group-hover:translate-x-0.5" /> */}
                </div>
            </Link>
        )}
    </div>
);

export default SectionTitle;
