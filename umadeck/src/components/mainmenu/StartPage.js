import Footer from "./Footer";
import Header from "./Header";
import MainMenu from "./MainMenu";
import React from "react";

function StartPage(){
    return (
        <div>
            <Header/>
            <MainMenu/>
            <Footer/>
        </div>
    );
}

export default StartPage;