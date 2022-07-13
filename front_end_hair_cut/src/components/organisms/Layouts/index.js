import Header from "../Header";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.min.css';
import Footer from "../Footer";

const LayoutFrontend = ({children}) => {
    return (
        <div>
            <Header />
            <ToastContainer/>
            {children}
            <Footer />
        </div>
    )
}

export default LayoutFrontend;