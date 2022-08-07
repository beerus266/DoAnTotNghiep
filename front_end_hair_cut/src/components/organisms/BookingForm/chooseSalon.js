import Input from "components/atoms/Input";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { BsSearch } from "react-icons/bs";
import { axios } from "utils/axios";

const ChooseSalon = ({setSalonInfor, setIsOpenChooseSalon}) => {
    const [data, setData] = useState([]);
    const [searchKey, setSearchKey] = useState('');
    // const allData = useRef(0);
    const [allData, setAllData] = useState([]);

    const { register, handleSubmit, formState: { errors } } = useForm({ mode: 'onChange'});

    useEffect(() => {
        axios.get('/store/findAll', {}).then((res) => {
            setData(res.data);
            setAllData(res.data); 
        });
    }, []);

    useEffect(() => {
        const result = allData.filter((store) => {
            return store.name.includes(searchKey) || store.address.includes(searchKey);
        });
        setData(result);
    }, [searchKey])

    const setSalon = (salon) => {
        setSalonInfor(salon);
        setIsOpenChooseSalon(false);
    }

    return (
        <div className="m-4">
            <SearchInput register={register} label="searchKey" setSearchKey={setSearchKey}/>
            {data.map((salon) => 
                <div 
                    className="flex border-t-gray py-4 border-t cursor-pointer"
                    onClick={() => setSalon(salon)}
                    key={salon.id}
                >
                    <div className="basis-1/3">
                        <img src={salon.image_url}/>
                    </div>
                    <div className="pl-4 basis-2/3">
                        <div className="font-semibold text-lg mb-2 text-orange-honey border-b">
                            {salon.name}
                        </div>
                        <div className="font-semibold text-base mb-2">
                            {salon.address}
                        </div>
                        <div className="font-thin text-xs">
                            {salon.description}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

const SearchInput = ({register, label, setSearchKey}) => {
    return (
        <form className="w-full">
            <div className='relative w-full'>
                <input
                    className='w-full pr-8 bg-gray-light rounded-ssm px-4 py-0.3125 focus:border-blue outline-none placeholder-text-light font-normal text-sm h-10 appearance-none'
                    placeholder="Enter here to search"
                    name="searchValue"
                    {...register(
                        label, 
                        {
                            onChange: (e) => setSearchKey(e.target.value)
                        }
                    )}
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
}

export default ChooseSalon;