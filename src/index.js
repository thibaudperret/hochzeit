import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import MissionPage from './pages/MissionPage';
import AdminPage from './pages/AdminPage';

ReactDOM.render(
    <Router>
        <Routes>
            <Route exact path='/admin' element={<AdminPage />} />
            <Route exact path='/:missionId' element={<MissionPage />} />
        </Routes>
    </Router>,
    document.getElementById('root')
);
