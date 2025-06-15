import Header from './components/Header.jsx';
import Authorization from './components/Authorization.jsx'
import AppRoute from './routers/router.jsx';
import { BrowserRouter } from 'react-router-dom';
import { GlobalContext } from './services/context.jsx'

function App() {
    return(
        <GlobalContext>
            <AppRoute/>
        </GlobalContext>
    );
};

export default App;
