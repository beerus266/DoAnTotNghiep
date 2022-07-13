import '../styles/globals.css';
import 'react-quill/dist/quill.snow.css';
import LayoutFrontend from 'components/organisms/Layouts';
import { Provider } from 'react-redux';
import store from 'stores/store';


function MyApp({ Component, pageProps }) {
  // Use the layout defined at the page level, if available

  const getLayout = Component.getLayout || ((page) => <LayoutFrontend children={page} />);
  return  <Provider store={store}>
            {getLayout(<Component {...pageProps} />)}
          </Provider>
  ;
}

export default MyApp;
