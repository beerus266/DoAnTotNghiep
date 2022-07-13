import Header from "../Header/HeaderBackend";
import Menu from "../Menu/MenuBackend";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.min.css';
import CopyRight from "../CopyRight";


const LayoutBackend = ({children}) => {

    const [hideMenu, setHideMenu] = useState(false);
    return (
        <div>
            <div className="relative">
                <Header setHideMenu={() => setHideMenu(!hideMenu)}/>
                <ToastContainer/>
                <div className="flex">
                    <Menu hideMenu={hideMenu}/>
                    {children}
                </div>
            </div>
            <CopyRight />
        </div>
    )
}

export default LayoutBackend;