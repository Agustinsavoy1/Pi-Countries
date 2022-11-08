import React, { useState } from "react";
import "./Paginado.css";
import { HiArrowLeft, HiArrowRight } from "react-icons/hi";

function Paginado({ currentPage, setCurrentPage, max }) {
  const [input, setInput] = useState(1);

  const nextPage = () => {
    setInput(parseInt(input) + 1);
    setCurrentPage(parseInt(currentPage) + 1);
  };

  const previousPage = () => {
    setInput(parseInt(input) - 1);
    setCurrentPage(parseInt(currentPage) - 1);
  };

  const onKeyDown = (e) => {
    if (e.keyCode === 13) {
      setCurrentPage(parseInt(e.target.value));
      if (
        parseInt(e.target.value < 1) ||
        parseInt(e.target.value) > Math.ceil(max) ||
        isNaN(parseInt(e.target.value))
      ) {
        setCurrentPage(1);
        setInput(1);
      } else {
        setCurrentPage(parseInt(e.target.value));
      }
    }
  };

  const onChange = (e) => {
    setInput(e.target.value);
  };

  return (
    <div className="paginado">
      <button disabled={currentPage <= 1} onClick={previousPage}>
        <HiArrowLeft />
      </button>
      <input
        className="current-page"
        onChange={(e) => onChange(e)}
        onKeyDown={(e) => onKeyDown(e)}
        name="page"
        autoComplete="off"
        value={input}
      />
      <p className="max-page"> of {max} </p>
      <button disabled={currentPage >= Math.ceil(max)} onClick={nextPage}>
        <HiArrowRight />
      </button>
    </div>
  );
}

export default Paginado;
