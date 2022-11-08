import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { getByName } from "../actions";
import "./Nav.css";
//import style from "../styles/Nav.module.scss";
//import earth from "../images/earth.svg";
//import { AiOutlineSearch } from "react-icons/ai";

function Nav() {
  const dispatch = useDispatch();
  const location = useLocation();

  const error = useSelector((state) => state.error);

  function handleChange(e) {
    dispatch(getByName(e.target.value));
  }

  return (
    <nav>
      <div className="nav-menu">
        {location.pathname === "/countries/" ? (
          <>
            <Link to="/countries/">
              {/* <img src={earth}  alt="earth" /> */}
            </Link>
            <Link to="/activity">Add Activity</Link>
            <div>
              <input
                type="text"
                placeholder="Country..."
                onChange={handleChange}
              />
              {/* <AiOutlineSearch className={style.submit} /> */}
            </div>
          </>
        ) : location.pathname === "/activity" ? (
          <div>
            <Link to="/countries/">
              {/* <img src={earth} className={style.img} alt="earth" /> */}
            </Link>
            <Link to="/countries/">Home</Link>
          </div>
        ) : (
          <>
            <Link to="/countries/">
              {/* <img src={earth} className={style.img} alt="earth" /> */}
            </Link>
            <Link to="/countries/">Home</Link>
            <Link to="/activity">Add Activity</Link>
          </>
        )}
      </div>
      {error !== "" && <p>{error}</p>}
    </nav>
  );
}

export default Nav;
