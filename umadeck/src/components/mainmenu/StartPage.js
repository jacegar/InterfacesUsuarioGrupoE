import Footer from "./Footer";
import Header from "./Header";
import MainMenu from "./MainMenu";
import React from "react";
import "../styles/mainmenu/StartPage.css";

function StartPage(){
    return (
        <div className="start-page-container">
            <Header/>
            <MainMenu/>
            <Footer/>
        </div>
    );
}

export default StartPage;