import Dashboard from "components/organisms/Dashboard";
import LayoutBackend from "components/organisms/Layouts/LayoutBackend";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { axios } from "utils/axios";

const BackendHome = () => {

    const router = useRouter();
    useEffect(() => {
    }, []);
    return(<Dashboard />);
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
        return {
            props: {}
        };
    }
}

export default BackendHome;