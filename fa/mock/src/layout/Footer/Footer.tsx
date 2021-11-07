import React from "react";
import "./css/style.css";
const Footer = () => {
  return (
    <>
      <footer className="footer-page">
        <div className="container pt-4">
          <div className="row">
            <div className="col-6 text-center">
              <p>Copyright © Your Website 2021</p>
            </div>
            <div className="col-6 text-center">
              <i className="fab fa-twitter section__icon"></i>
              <i className="fab fa-facebook-f section__icon__fb"></i>
              <i className="fab fa-instagram section__icon"></i>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
