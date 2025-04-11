import React from 'react';
import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import StartPage from './components/mainmenu/StartPage';
import ErrorPage from './components/error/ErrorPage';

function App(){
    return(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<StartPage/>}/>
            <Route path="*" element={<ErrorPage/>}/>
        </Routes>
    </BrowserRouter>
    );
}

export default App;