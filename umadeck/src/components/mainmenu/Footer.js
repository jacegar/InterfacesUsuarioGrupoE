import "../styles/Footer.css";

function Footer(){
    return(
        <div className="footer-container">
            <div className="social-icons">
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                    <img src="/assets/images/instagram.png" alt="Instagram" className="social-icon" />
                </a>
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
                    <img src="/assets/images/Youtube.png" alt="YouTube" className="social-icon" />
                </a>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                    <img src="/assets/images/facebook.png" alt="Facebook" className="social-icon" />
                </a>
            </div>
        </div> 
    );
}

export default Footer;