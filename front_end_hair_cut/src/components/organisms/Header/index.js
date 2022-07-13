import Link from 'next/link';
import useRouter from 'next/router';
import Input from "../../atoms/Input";
import Menu from "../Menu";
import { BsSearch } from 'react-icons/bs';

const Header = ({}) => {
    return (
        <div
            className='shadow-md l:relative top-0 w-full z-50 bg-white'
        >
            <div className='px-4 bg-white pb-2 l:pb-5 mx-auto l:p-0 l:pt-5 l:max-w-60 xl:max-w-screen-xl'>
                <div className='pt-3 flex z-10 relative bg-white gap-4'>
                    <div className="flex items-center w-1/5 relative">
                        <Link href="/">
                            <a className="cursor-pointer absolute transform ">
                                <img
                                    width={120}
                                    height={37}
                                    src='https://9prints-bucket-data-sync-efs.s3.us-east-2.amazonaws.com/52/storage/setting/413.BOH1H627dd70fdd02d.png'
                                    className='h-auto w-auto max-h-10'
                                />
                            </a>
                        </Link>
                    </div>
                    <div className="flex items-center w-2/5 relative">
                        {/* <SearchInput /> */}
                    </div>
                    <div className="w-1/2  flex items-center justify-end">
                        <ul className="my-hidden flex text-sm text-text-light ">
                            {true && (
                                <>
                                    <li className="relative nav-link cursor-pointer mr-10 hover:text-text" title="Sign in">
                                        Sign in
                                    </li>
                                    <li className="relative nav-link cursor-pointer mr-10 hover:text-text" title="Sign up">
                                        Sign up
                                    </li>
                                </>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
            <div className="mx-auto xl:max-w-screen-xl">
                <Menu />
            </div>
        </div>
    );
}

const SearchInput = () => {

    return (
        <form className="w-full">
            <div className='relative w-full'>
                <Input
                    className='w-full pr-8'
                    placeholder="Enter here to search"
                    name="searchValue"
                    // ref={register({ required: false })}
                />
                <button
                    type="submit"
                    aria-label="search"
                    className='w-4 h-4 absolute right-3 top-3 focus:outline-none text-text-light hover:text-blue'
                >
                    <BsSearch />
                </button>
            </div>
        </form>
    );
};

export default Header;