import React from "react";

const Pagnation = (props) => {
  const currentPage = props.currentPage;
  const page = props.page;
  const setCurrentPage = props.setCurrentPage;
  const a = [];

  for (let i = 1; i <= page; i++) {
    a.push(i);
  }
  return (
    <div className="flex flex-end items-center gap-10 mt-20">
      <img
        src="/left-arrow.png"
        alt="left"
        onClick={() => {
          if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
          }
        }}
      />

      {a.map((item, i) => (
        <button
          className={`btn page-btn border-2px-solid ${
            currentPage === i + 1 ? "active" : ""
          }`}
          key={i}
          onClick={() => setCurrentPage(i + 1)}
        >
          {i + 1}
        </button>
      ))}

      <img
        src="/right-arrow.png"
        alt="right"
        onClick={() => {
          if (currentPage < page) {
            setCurrentPage(currentPage + 1);
          }
        }}
      />
    </div>
  );
};

export default Pagnation;
