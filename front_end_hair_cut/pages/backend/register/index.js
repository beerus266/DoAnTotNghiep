import { useForm } from 'react-hook-form';
import React, { useState } from 'react';
import { axios } from 'utils/axios';
import { createCookie } from 'utils/helpers';
import { BsPlusLg, BsArrowRightShort } from 'react-icons/bs';
import Link from 'next/link';

const RegisterForm = () => {

    const [errMess, setErrMess] = useState();
    const [succMess, setSuccMess] = useState();
    const { register, handleSubmit, watch, formState: { errors }  } = useForm({mode: 'onBlur'});

    const onSubmit = async (data) => {
        setErrMess();
        setSuccMess();
        if (data.password !== data.passwordAgain) {
            setErrMess('Type password again not match');
            return;
        }
        
        axios.post('user/register', {
            username: data.username,
            password: data.password,
            email: data.email,
        }).then((data) => {
            setSuccMess('Register successful. Please check email to verify');
        }).catch((res) => {
            setErrMess(res.response?.data?.message);
        });
    }

    return (
        <div className="bg-gradient-to-r from-purple-500 to-orange-dark h-screen pt-10">
            <form onSubmit={handleSubmit(onSubmit)} className="mx-auto border-gray-n600 bg-white rounded-lg p-14" style={{width: '500px'}}>
                <h2 className="text-center uppercase font-bold mb-6 text-xl">register</h2>
                <div className="flex justify-center mb-6">
                    <div className="rounded-full w-24 h-24 border-0 bg-gray-cm flex justify-center items-center">
                        <BsPlusLg className='w-10 h-10 text-white'/>
                    </div>
                </div>
                {errMess && <div className='text-center text-red-dark text-sm animate-shake'>{errMess}</div>}
                {succMess && 
                    // <Link href='/backend/login'>
                        <div className='text-center text-green-g400 text-sm animate-shake flex justify-center underline'>
                            <span>{succMess}</span>
                            <BsArrowRightShort className='w-5 h-5' />
                        </div>
                    // </Link>
                }

                <div className='mx-5 mb-4'>
                    <label className='pl-2 text-gray-cm'>Username</label>
                    <InputForm type='text' placeholder='Enter username' label='username' register={register} required/>
                </div>
                <div className='mx-5 mb-4'>
                    <label className='pl-2 text-gray-cm'>Password</label>
                    <InputForm type='password' placeholder='Enter password' label='password' register={register} required/>
                </div>
                <div className='mx-5 mb-1'>
                    <label className='pl-2 text-gray-cm'>Enter password again</label>
                    <InputForm type='password' placeholder='Enter password' label='passwordAgain' register={register} required/>
                </div>
                <div className='mx-5 mb-1'>
                    <label className='pl-2 text-gray-cm'>Email</label>
                    <InputForm type='text' placeholder='Enter email' label='email' register={register} required/>
                </div>
                <div className='mb-6 text-xs flex justify-between mx-7'>
                    <div>
                    </div>
                    <Link href='/backend/login'>
                        <a className='hover:underline cursor-pointer flex text-orange-carrot'>
                            <span>I have a account already. Log in now</span>
                            <BsArrowRightShort className='w-4 h-4'/>
                        </a>
                    </Link>
                </div>
                <div className='px-20 '>
                    <button type='submit' className='w-full h-10 rounded-3xl cursor-pointer flex justify-center items-center border border-green-g400 text-green-g400 hover:text-white hover:bg-green-g400'>
                        <div>Register</div>
                    </button>
                </div>
            </form>
        </div>
    )
}

RegisterForm.getLayout = (page) => <>{page}</>

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

export default RegisterForm;