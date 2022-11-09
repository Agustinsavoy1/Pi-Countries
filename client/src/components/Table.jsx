import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCountries } from "../actions";
import Swal from "sweetalert2";
import "./Table.css";

const Table = () => {
  const [image, setImage] = useState([]);
  const [array, setArray] = useState([]);
  const [score, setScore] = useState(0);
  const dispatch = useDispatch();
  const countries = useSelector((state) => state.countries);
  //Por que no hice esto en el reducer? Por una cuestion de comodidad. :v
  useEffect(() => {
    const newArray = [];
    if (countries.length > 0) {
      while (newArray.length < 4) {
        let randomNum = Math.floor(Math.random() * 250);
        if (countries[randomNum].name && countries[randomNum].image) {
          newArray.push({
            name: countries[randomNum].name,
            image: countries[randomNum].image,
          });
        }
      }
      console.log(newArray, "soy newarray");
      setImage(newArray[Math.floor(Math.random() * 4)].image);
      setArray(newArray);
    }
  }, [countries]);

  useEffect(() => {
    dispatch(getCountries());
  }, [dispatch]);

  function handleAnswer(e) {
    if (e.target.value === image) {
      setScore(score + 1);
      Swal.fire({
        title: "Correct answer!",
        confirmButtonColor: "#34a57f",
      });
      dispatch(getCountries());
    } else
      Swal.fire({
        title: "Incorrect answer, try again!",
        confirmButtonColor: "#34a57f",
      });
  }

  return (
    <div className="table">
      <div className="flag">
        {array ? <img src={image} alt="flag" /> : "null"}
        <div className="options">
          {array.map((n) => {
            return (
              <button
                value={n.image}
                onClick={(e) => handleAnswer(e)}
                key={n.name}
              >
                {n.name}
              </button>
            );
          })}
        </div>
        <div className="score-container">
          <p>Score:</p>
          {score}
        </div>
      </div>
    </div>
  );
};

export default Table;
