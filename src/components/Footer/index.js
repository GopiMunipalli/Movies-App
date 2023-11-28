import { FaGoogle, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";

import "./index.css";

function Footer() {
  return (
    <div className="footer-bg-container">
      <div className="footer-container">
        <FaGoogle className="footer-icon" />
        <FaTwitter className="footer-icon" />
        <FaInstagram className="footer-icon" />
        <FaYoutube className="footer-icon" />
      </div>
    </div>
  );
}

export default Footer;