import React from "react";
import LandingPageForm from "../../components/LandingPageForm";

const LandingPage = () => {
  return (
    <div className="d-flex justify-content-center">
      <div className="vh-100 d-flex flex-column justify-content-center">
        <LandingPageForm />
      </div>
    </div>
  );
};

export default LandingPage;
