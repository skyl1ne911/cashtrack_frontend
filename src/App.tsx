import Header from './components/Header.js';
import { Popup } from './components/Popup.js';
import SideBar from './components/SideBar.js';
import { AuthProvider } from './contexts/AuthContext.js';

function App() {

    return(
        <AuthProvider>
            {/* <Popup/> */}
            <SideBar/>
            <div className='container'>
                <Header/>
            </div>
        </AuthProvider>
    );
};

export default App;
