import "../styles/mainmenu/Footer.css";

function Footer(){
    return(
        <footer className="footer">
            <div className="social-icons">
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" tabIndex="0" aria-label="Instagram">
                    <img src="/assets/images/instagram.png" alt="Instagram" className="social-icon" />
                </a>
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" tabIndex="0" aria-label="YouTube">
                    <img src="/assets/images/Youtube.png" alt="YouTube" className="social-icon" />
                </a>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" tabIndex="0" aria-label="Facebook">
                    <img src="/assets/images/facebook.png" alt="Facebook" className="social-icon" />
                </a>
            </div>
        </footer> 
    );
}

export default Footer;