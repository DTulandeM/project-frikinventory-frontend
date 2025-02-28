import faceIcon from "../images/FacebookLogo.svg";
import instIcon from "../images/InstagramLogo.png";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__policy-container">
        <p className="footer__copyright">&#169; 2025 FrikiWeek</p>
        <p className="footer__policy">Privacy Polity</p>
        <p className="footer__policy">Terms and Conditions</p>
        <p className="footer__policy">Contact</p>
      </div>
      <div className="footer__social-container">
        <img src={faceIcon} alt="Facebook" className="footer__social-icon" />
        <a href="https://www.instagram.com/frk_week?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==">
          {" "}
          <img src={instIcon} alt="Instagram" className="footer__social-icon" />
        </a>
      </div>
    </footer>
  );
}
export default Footer;
