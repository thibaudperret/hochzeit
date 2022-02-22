import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import MissionPage from './pages/MissionPage';
import AdminPage from './pages/AdminPage';
import PassPage from './pages/PassPage';

function PassWrapper({ element }) {
    const [loggedIn, setLoggedIn] = useState(false);
    return !loggedIn ? <PassPage logIn={() => setLoggedIn(true)} /> : element;
}

ReactDOM.render(
    <Router>
        <Routes>
            <Route exact path='/hochzeit/admin' element={<PassWrapper element={<AdminPage />} />} />
            <Route exact path='/hochzeit/:missionId' element={<MissionPage />} />
        </Routes>
    </Router>,
    document.getElementById('root')
);
