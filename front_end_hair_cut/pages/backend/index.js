import Dashboard from "components/organisms/Dashboard";
import LayoutBackend from "components/organisms/Layouts/LayoutBackend";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { axios } from "utils/axios";
import { totalAmount } from "utils/helpers";

const BackendHome = ({storeQuantity, orderQuantity, actualRevenue, estimateRevenue}) => {

    const router = useRouter();
    useEffect(() => {
    }, []);
    return(<Dashboard storeQuantity={storeQuantity} orderQuantity={orderQuantity} actualRevenue={actualRevenue} estimateRevenue={estimateRevenue}/>);
}

BackendHome.getLayout = (page) => <LayoutBackend children={page}/>


export async function getServerSideProps(context) {

    let isLogin = false;
    await axios.get('user/isLogin', {
        headers: {
            "Authorization":`Bearer ${context.req.cookies.user}`
        }
    }).then((res) => {
        isLogin = true;
    }).catch((res) => {
    });

    if (!isLogin) {
        return {
            redirect: {
                destination: '/backend/login',
                permanent:false,
            }
        }
    } else {
        const stores = await axios.get(`store/getStoreTab`, {
            data: {
                userId: context.req.cookies.userId
            }
        }, ).then((res) => {
            return res.data;
        }).catch((res) => {});

        const storeQuantity = stores.length;

        const orders = await axios.get(`order/getAllOrder`, {
            data: {
                storeIds: stores.map(s => s.id)
            }
        }, ).then((res) => {
            return res.data;
        }).catch((res) => {
        });

        const orderQuantity = orders.length;

        let actualRevenue = 0 ; 
        orders.forEach(order => {
            if (order.status === 'Done') actualRevenue += totalAmount(order)
        });

        let estimateRevenue = 0 ; 
        orders.forEach(order => {
            estimateRevenue += totalAmount(order)
        });

        return {
            props: {
                storeQuantity,
                orderQuantity,
                actualRevenue,
                estimateRevenue
            }
        };
    }
}

export default BackendHome;