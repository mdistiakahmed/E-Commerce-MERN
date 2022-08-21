import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer id="footer">
      <div className="leftFooter"></div>

      <div className="midFooter">
        <h1>ECOMMERCE.</h1>
        <p>High Quality is our first priority</p>

        <p>Copyrights 2022 &copy; Istiak</p>
      </div>

      <div className="rightFooter">
        <h4>Follow Us</h4>
        <a href="https://www.linkedin.com/in/md-istiak-ahmed-666796a3/">
          LinkedIn
        </a>
        <a href="https://www.facebook.com/istinishat">Facebook</a>
      </div>
    </footer>
  );
};

export default Footer;
