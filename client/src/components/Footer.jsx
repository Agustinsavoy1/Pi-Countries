import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <>
      <footer
        style={
          window.location.pathname === "/" || window.location.pathname === ""
            ? { display: "none" }
            : { display: "block" }
        }
      >
        <ul className="icon-container">
          <li className="social-icon">
            <a href="https://github.com/agustinsavoy1" target="_blank">
              github
            </a>
          </li>
          <li className="social-icon">
            <a
              href="https://www.linkedin.com/in/juan-agustin-savoy-9b1103202/"
              target="_blank"
            >
              linkedin
            </a>
          </li>
        </ul>
      </footer>
    </>
  );
};

export default Footer;
