import { useRouter } from 'next/router';
import { AiOutlineMenu } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import { createCookie } from 'utils/helpers';

const Header = ({setHideMenu}) => {

    const router = useRouter();

    const signOut = () => {
        createCookie('user', '');
        router.push('/backend/login');
    }

    return (
        <div className='w-auto h-20 drop-shadow-2xl px-5 flex items-center justify-between bg-green-dark text-white'>
            <div className='flex'>
                <AiOutlineMenu className='w-8 h-8 mr-3 cursor-pointer' onClick={() => setHideMenu()}/>
                <a className='text-xl' href='/backend'>BACKEND</a>
            </div>
            <div>
                <div className='mx-auto h-10 w-10 bg-gray-neutrals rounded-full flex items-center text-center justify-center'>
                    <span>TT</span>
                </div>  
                <div className='cursor-pointer' onClick={signOut}>Sign out</div>
            </div>
        </div>
    )
}

export default Header;