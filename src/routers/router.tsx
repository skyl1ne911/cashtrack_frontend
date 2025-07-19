import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import Authorization from '../components/Authorization';
import ThemeProvider from '../contexts/ThemeContext';
import App from '../App';


// const base = import.meta.env.DEV ? '/dev' : '/';

function AppRoute() {
    return (
        <ThemeProvider>
            <BrowserRouter basename='/web'>
                <Routes>
                    <Route path='' element={<App/>}/>
                </Routes>
            </BrowserRouter>   
        </ThemeProvider>
    );
}

export default AppRoute;