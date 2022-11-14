import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  getActivity,
  byContinent,
  byPopulation,
  byOrder,
  getCountries,
  byActivity,
} from "../actions/index";
import "./Home.css";
import Paginado from "./Paginado";

function Home() {
  const dispatch = useDispatch();
  const [order, setOrder] = useState("");

  const countries = useSelector((state) => state.countries);
  const activity = useSelector((state) => state.activity);

  const [currentPage, setCurrentPage] = useState(1);
  const [countriesPerPage, setCountriesPerPage] = useState(9);

  const max = Math.round(countries.length / countriesPerPage);

  useEffect(() => {
    dispatch(getCountries());
    dispatch(byActivity());
  }, [dispatch]);

  function handleOrder(e) {
    e.preventDefault();
    dispatch(byOrder(e.target.value));
    setOrder(e.target.value);
    setCurrentPage(1);
  }

  function handleContinents(e) {
    e.preventDefault();
    dispatch(byContinent(e.target.value));
    setOrder(e.target.value);
    setCurrentPage(1);
  }

  function handleOrderPopulation(e) {
    e.preventDefault();
    dispatch(byPopulation(e.target.value));
    setOrder(e.target.value);
    setCurrentPage(1);
  }

  function handleActivity(e) {
    e.preventDefault();
    dispatch(byActivity(e.target.value));
    setOrder(e.target.value);
    setCurrentPage(1);
  }

  useEffect(() => {
    dispatch(getActivity());
  }, [dispatch]);

  return (
    <div className="home">
      <div className="filter-container">
        <div>
          <select onChange={handleOrderPopulation}>
            <option value="Max" key="Max">
              Max population
            </option>
            <option value="Min" key="Min">
              Min population
            </option>
          </select>
        </div>
        <div>
          <select onChange={handleContinents}>
            <option value="All" key="All">
              All continents
            </option>
            <option value="Africa" key="Africa">
              Africa
            </option>
            <option value="Antarctica" key="Antarctica">
              Antarctica
            </option>
            <option value="Asia" key="Asia">
              Asia
            </option>
            <option value="Europe" key="Europe">
              Europe
            </option>
            <option value="North America" key="NorthAmerica">
              North America
            </option>
            <option value="Oceania" key="Oceania">
              Oceania
            </option>
            <option value="South America" key="SouthAmerica">
              South America
            </option>
          </select>
        </div>
        <div>
          <select onChange={handleActivity}>
            <option value="All">All activities</option>
            {activity.map((e) => (
              <option value={e} key={e}>
                {e}
              </option>
            ))}
          </select>
        </div>
        <div>
          <select onChange={handleOrder}>
            <option value="Asc" key="Asc">
              A-Z
            </option>
            <option value="Desc" key="Desc">
              Z-A
            </option>
          </select>
        </div>
      </div>
      <div className="card-section">
        <div className="card-container">
          {countries
            .slice(
              (currentPage - 1) * countriesPerPage,
              (currentPage - 1) * countriesPerPage + countriesPerPage
            )
            .map((e) => {
              return (
                <Link to={"/countries/" + e.id} key={e.id}>
                  <div className="country-card">
                    <img src={e.image} alt={e.name} className="home-card-img" />
                    <p>{e.name}</p>
                  </div>
                </Link>
              );
            })}
        </div>
      </div>
      <div className="paginado-content">
        <Paginado
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          max={max}
        />
      </div>
    </div>
  );
}

export default Home;
