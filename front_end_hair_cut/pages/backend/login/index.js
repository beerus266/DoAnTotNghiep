import { BiLock, BiRightArrowAlt } from 'react-icons/bi';
import { useForm } from 'react-hook-form';
import React, { useEffect, useState } from 'react';
import { axios } from 'utils/axios';
import { createCookie } from 'utils/helpers';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { loadUser } from 'stores/account/account.slice';
import { toast, ToastContainer } from 'react-toastify';

const LoginForm = () => {

    const router = useRouter();
    const dispatch = useDispatch();
    const [errMess, setErrMess] = useState();
    const { register, handleSubmit, watch, formState: { errors }  } = useForm({mode: 'onBlur'});

    const onSubmit = async (data) => {
        setErrMess();
        await axios.post('user/login', {
            username: data.username,
            password: data.password,
        }).then((data) => {
            createCookie("user", data.data.token);
            createCookie("userId", data.data.id);
            dispatch(loadUser(data.data));
            router.push('/backend');

        }).catch((res) => {
            setErrMess(res.response?.data?.message);
        });
    }

    useEffect(() => {
        if (router.asPath.includes('active-success')) {
            toast.success('Verify account successfully! Please login.', {
                position: "top-right",
                autoClose: 50000,
                hideProgressBar: true,
                pauseOnHover: true,
            });
        }
    }, []);

    return (
        <div className="bg-gradient-to-r from-purple-500 to-orange-dark h-screen pt-28">
            <form onSubmit={handleSubmit(onSubmit)} className="mx-auto border-gray-n600 bg-white rounded-lg p-14" style={{width: '500px'}}>
                <h2 className="text-center uppercase font-bold mb-6 text-xl">sign in</h2>
                <div className="flex justify-center mb-6">
                    <div className="rounded-full w-24 h-24 border-0 bg-gray-cm flex justify-center items-center">
                        <BiLock className='w-10 h-10 text-white'/>
                    </div>
                </div>
                {errMess && <div className='text-center text-red-dark text-sm animate-shake'>{errMess}</div>}
                <div className='mx-5 mb-4'>
                    <label className='pl-2 text-gray-cm'>Username</label>
                    <InputForm type='text' placeholder='Enter username' label='username' register={register} required/>
                </div>
                <div className='mx-5 mb-1'>
                    <label className='pl-2 text-gray-cm'>Password</label>
                    <InputForm type='password' placeholder='Enter password' label='password' register={register} required/>
                </div>
                <div className='mb-6 text-xs flex justify-between mx-7'>
                    <div className='hover:underline cursor-pointer text-black'>
                        Forgot password
                    </div>
                    <Link href='/backend/register'>
                        <a className='hover:underline cursor-pointer flex text-orange-carrot'>
                            <span>Register account</span>
                            <BiRightArrowAlt className='w-4 h-4'/>
                        </a>
                    </Link>
                </div>
                <div className='px-20 '>
                    <button type='submit' className='w-full h-10 rounded-3xl cursor-pointer flex justify-center items-center border border-green-g400 text-green-g400 hover:text-white hover:bg-green-g400'>
                        <div>Log in</div>
                    </button>
                </div>
            </form>
            <ToastContainer/>
        </div>
    )
}

LoginForm.getLayout = (page) => <>{page}</>

const InputForm = ({ placeholder, label, register, required = false, ...rest }) => {
    return (
        <input 
            className='border w-full mt-1 h-10 rounded-3xl px-5 border-gray-n600'
            placeholder={placeholder}
            {...register(label, { required })}
            {...rest}
        />
    )
};

export default LoginForm;