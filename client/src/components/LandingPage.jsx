import React from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div>
      <h1>Welcome to my individual project</h1>
      <Link to={"/countries"}>Ingresar</Link>
    </div>
  );
};

export default LandingPage;
