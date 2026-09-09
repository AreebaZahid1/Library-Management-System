import React from "react";

function PageHeader({ buttonText, onClick }) {
  return (
    <button onClick={onClick}>
      {buttonText}
    </button>
  );
}

export default PageHeader;