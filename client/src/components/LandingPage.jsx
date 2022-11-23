import React from "react";
import { Link } from "react-router-dom";
import "./LandingPage.css";

const LandingPage = () => {
  return (
    <>
      <div
        className={`landing-page `}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="content-container">
          <h1>Welcome to my individual project</h1>
          <Link to={"/countries"}>
            <button>Ingresar</button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
