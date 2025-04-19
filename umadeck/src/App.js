import React from "react";
import "./App.css";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import StartPage from "./components/mainmenu/StartPage";
import ErrorPage from "./components/error/ErrorPage";
import AchievementsPage from "./components/achievements/AchievementsPage";  
import CollectionPage from "./components/collection/CollectionPage";
import NewGamePage from "./components/game/NewGamePage";
import GamePage from "./components/game/GamePage";
import GameOverLostPage from "./components/game/GameOverLostPage";
import GameOverWonPage from "./components/game/GameOverWonPage";

function App(){
    return(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<StartPage/>}/>
            <Route path="*" element={<ErrorPage/>}/>
            <Route path="/achievements" element={<AchievementsPage/>}/>
            <Route path="/collection" element={<CollectionPage/>}/>
            <Route path="/new-game" element={<NewGamePage/>}/>
            <Route path="/game" element={<GamePage/>}/>
            <Route path="/game-over-lost" element={<GameOverLostPage/>}/>
            <Route path="/game-over-won" element={<GameOverWonPage/>}/>
        </Routes>
    </BrowserRouter>
    );
}

export default App;