import Alert from "components/atoms/Alert";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";

const Breadcrumb = ({page}) => {
    return (
        <div className="mb-5">
            <div className="flex justify-between">
                <h1 className='text-5xl mb-2 text-orange-honey'>{page.title}</h1>
            </div>
            <div className="flex">
                <span>Home</span>
                <HiOutlineArrowNarrowRight className='w-10 h-6'/>
                <a href={page.url} className="hover:text-orange-honey">{page.title}</a>
            </div>
        </div>
    )
}

export default Breadcrumb;