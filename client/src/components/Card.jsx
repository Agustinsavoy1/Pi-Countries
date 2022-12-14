import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../actions";

import flyingAirplane from "../images/flyingAirplane.svg";
import "./Card.css";
function Card(props) {
  const dispatch = useDispatch();
  const details = useSelector((state) => state.details);
  const loading = useSelector((state) => state.loading);

  useEffect(() => {
    dispatch(getDetail(props.match.params.id));
  }, [dispatch]);

  const activities = details.activities?.map((e) => {
    return {
      name: e.name,
      difficulty: e.difficulty,
      duration: e.duration,
      season: e.season,
    };
  });

  return (
    <div>
      <div className="card-detail">
        {loading ? (
          <img src={flyingAirplane} />
        ) : details !== null ? (
          <div className="detail-container ">
            <div className="detail ">
              <img
                src={details.image}
                alt={details.name}
                className="card-img"
              />
              <h2>{details.name}</h2>
            </div>
            <div>
              <div>
                <div>
                  <h3>Details</h3>
                  <p>Code: {details.id}</p>
                  <p>Continent: {details.continent}</p>
                  <p>Capital: {details.capital}</p>
                  <p>Population: {details.population}</p>
                  <p>Subregion: {details.subregion}</p>
                </div>
                <div>
                  <h3>Activities</h3>
                  {activities?.length > 0 ? (
                    activities?.map((e) => {
                      return (
                        <div key={e.id}>
                          <p>Name: {e.name}</p>
                          <p>Difficulty: {e.difficulty}</p>
                          <p>Duration: {e.duration}</p>
                          <p>Season: {e.season}</p>
                          <hr></hr>
                        </div>
                      );
                    })
                  ) : (
                    <p>Without activities</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <p>Country not found</p>
        )}
      </div>
    </div>
  );
}

export default Card;
