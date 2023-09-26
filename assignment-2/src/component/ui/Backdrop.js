import React from "react";

const Backdrop = (props) => {
  return (
    <div id="backdrop" class=" fixed" onClick={() => props.closeModal()}></div>
  );
};

export default Backdrop;
