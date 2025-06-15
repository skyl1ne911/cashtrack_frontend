import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import Authorization from '../components/Authorization';
import Header from '../components/Header';

const base = import.meta.env.DEV ? '/dev' : '/';

function AppRoute() {
    return (
        <BrowserRouter basename={base}>
            <Routes>
                <Route path='' element={<Header/>}/>
            </Routes>
        </BrowserRouter>   
    );
}

export default AppRoute;