import "./Footer.css"
import X_icon from "../../assets/X-icon.png";
import Pinterest_icon from "../../assets/Pinterest.png";
import Instagram_icon from "../../assets/Instagram-icon.jpeg";
import Whatsapp_icon from "../../assets/Whatsapp-icon.jpeg";

function Footer() {
    return(
        <>
        <div className="footer">
            <div className="footer-logo">
                <p>Cloth's Today</p>
            </div>

            <ul className="footer-links">
                <li>Company</li>
                <li>Product</li>
                <li>Offices</li>
                <li>About</li>
                <li>Contact</li>
            </ul>

            <div className="Footer-social-icon">
                <img src={Instagram_icon} alt="Instagram Icon" />
                <img src={Pinterest_icon} alt="Pinterest Icon" />
                <img src={Whatsapp_icon} alt="Whatsapp Icon" />
                <img src={X_icon} alt="Twitter Icon" />
            </div>

            <div className="footer-copyright">
                <hr />
                <p>Copyright @ 2025 - All Right Reserved.</p>
            </div>
        </div>
        </>
    )
}

export default Footer;