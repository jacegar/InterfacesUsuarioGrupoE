import React from "react";
import "./App.css";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import StartPage from "./components/mainmenu/StartPage";
import ErrorPage from "./components/error/ErrorPage";
import AchievementsPage from "./components/achievements/AchievementsPage";  
import CollectionPage from "./components/collection/CollectionPage";
import NewGame from "./components/newGame/NewGame";

function App(){
    return(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<StartPage/>}/>
            <Route path="*" element={<ErrorPage/>}/>
            <Route path="/achievements" element={<AchievementsPage/>}/>
            <Route path="/collection" element={<CollectionPage/>}/>
            <Route path="/new-game" element={<NewGame/>}/>
        </Routes>
    </BrowserRouter>
    );
}

export default App;