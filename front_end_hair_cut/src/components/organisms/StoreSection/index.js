import { useEffect, useState } from 'react';
import { axios } from 'utils/axios';
import StoreItem from '../StoreItem';
import SectionTitle from './SectionTitle';

const StoreSection = ({hasViewMore, link }) => {

    const [stores, setStores] = useState([]);

    const callData = async () => {
        const _stores = await axios.get('/store/findAll', {}).then((res) => res.data);
        setStores(_stores);
    }

    useEffect(() => {
        callData();
    }, []);

    return (
        <div className="mb-6">
            <SectionTitle hasViewMore={hasViewMore} title='Our stores' link={link} />
            <div className="flex flex-wrap -mx-1 md:-mx-2 gap-y-7">
                {stores.map((store) => (
                    <div className="w-1/2 md:w-1/4 px-1 md:px-2 mb-2 md:mb-4" key={store.id}>
                        <StoreItem store={store} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default StoreSection;
