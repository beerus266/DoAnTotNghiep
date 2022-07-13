import { useState } from "react";
import { axios } from "utils/axios";
import { useRouter } from 'next/router';

const PhoneBookingForm = () => {
    const router = useRouter();
    const [phoneNumber, setPhoneNumber] = useState('');
    
    const checkNumberInput = (e) => {
        const value = e.target.value;
        if (!/[^0-9\.]/.test(value) && value.length <= 12) {
            if (value.length === 4 || value.length === 8) {
                setPhoneNumber(value + '.');
            } else {
                setPhoneNumber(value);
            }
        }
    }

    const bookWithPhoneNumber = () => {
        if (phoneNumber.length !== 12) {
            alert('Please enter the right phone number');
        } else {
            axios.post(`/customers/create`, {
                phoneNumber
            }).then((res) => {
                console.log(res);
                router.push({
                    pathname: '/booking',
                    query: {
                        phoneNumber: phoneNumber
                    }
                }, '/booking');
            }); 
        }
    }

    return (
        <div className="absolute bottom-20 left-0 right-0 my-0 mx-auto 
            rounded-lg max-w-lg bg-gradient-to-b from-purple-deep to-pink-500
            px-5 py-4"
        >
            <div className='text-text-white font-light pb-4'>
                <div className="text-2xl uppercase">Booking cut in 30s</div>
                <div className="text-lg">Pay after cut. Cancel for free</div>
            </div>

            <div className="flex font-mono">
                <input 
                    className="h-12 basis-2/3 pl-4 rounded-lg text-xl" 
                    placeholder="Enter your number"
                    value={phoneNumber}
                    onChange={checkNumberInput}
                />
                <button 
                    className="ml-3 flex-auto bg-orange-honey text-2xl rounded-lg hover:bg-orange-y400"
                    onClick={bookWithPhoneNumber}
                >
                    Book now
                </button>
            </div>
        </div>
    );
}

export default PhoneBookingForm;