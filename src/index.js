import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './index.css';
import MissionPage from './pages/MissionPage';
import AdminPage from './pages/AdminPage';
import PassPage from './pages/PassPage';

function PassWrapper({ element }) {
    const [loggedIn, setLoggedIn] = useState(false);
    return !loggedIn ? <PassPage logIn={() => setLoggedIn(true)} /> : element;
}

function Dispatch() {
    const { hash } = useLocation();
    switch (hash.split('/')[1]) {
        case 'admin':
            return <PassWrapper element={<AdminPage />} />
        case 'aufgabe':
            return <PassWrapper element={<MissionPage missionId={hash.split('/')[2]} />} />
            // return <MissionPage missionId={hash.split('/')[2]} />
        default:
            return <></>;
    }
}

ReactDOM.render(
    <React.StrictMode>
        <Router>
            <Routes>
                {/* <Route exact path='/hochzeit/admin' element={<PassWrapper element={<AdminPage />} />} /> */}
                <Route exact path='/hochzeit' element={<Dispatch />} />
            </Routes>
        </Router>
    </React.StrictMode>,
    document.getElementById('root')
);
