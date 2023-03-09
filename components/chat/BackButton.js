import React from "react";

const BackButton = ({ reset }) => {
  return (
    <div
      onClick={reset}
      className="back-chevron flex items-center"
    >
      &#8249;
    </div>
  );
};

export default BackButton;