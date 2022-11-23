import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getActivity, getCountries, postActivity } from "../actions/index";
import "./AddActivity.css";

function valida(input) {
  let errors = {};

  console.log(input.countries);
  console.log(input.countries[0]);

  if (!input.name || input.name === "") {
    errors.name = "Name required";
  } else if (/[0-9]/.test(input.name)) {
    errors.name = "Invalid name";
  }

  if (!input.season) {
    errors.season = "Season required";
  } else if (!["Summer", "Spring", "Winter", "Autumn"].includes(input.season)) {
    errors.season = "Invalid season";
  }

  if (!input.difficulty) {
    errors.difficulty = "Difficulty required";
  } else if (!/\d/.test(input.difficulty)) {
    errors.difficulty = "Difficulty must be a number";
  } else if (input.difficulty < 1 || input.difficulty > 5) {
    errors.difficulty = "Must be a number between 1 and 5";
  }

  if (!input.duration) {
    errors.duration = "Debe ingresar una duracion";
  } else if (!/\d/.test(input.duration)) {
    errors.duration = "Debe ser un numero";
  } else if (input.duration < 1 || input.duration > 24)
    errors.duration = "Debe ser un numero entre 1 y 24";

  if (!/^[A-Z]{3}$/.test(input.countries) || !input.countries) {
    errors.countries = "Debe ser un codigo valido";
  }

  // if (!input.countries) {
  //   errors.countries = "Debe ingresar un codigo de pais";
  // } else

  return errors;
}

// function validateString(input) {
//   let errors = {};
//   if (input.name) {
//     console.log(input.name, "soy input.name");
//     //console.log(input, "dasjhdfaskjdas");
//   }
//   if (!/^[a-záéíóú\s]*$/i !== input.name) {
//     console.log(input.name, "input.name no es una letra");
//   }
//   return errors;
// }

// function validateNumber(input) {
//   let errors = {};
//   if (input.name) {
//     console.log(input.name, "soy input.name");
//   }
//   if (!/^[0-9]*$/ === input.name) {
//     console.log(input.name, "input.name no es una letra");
//   }
//   return errors;
// }

function AddActivity() {
  const dispatch = useDispatch();
  const history = useHistory();
  const countries = useSelector((state) => state.countries).sort((a, b) => {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  });

  const [errors, setErrors] = useState({});

  const [input, setInput] = useState({
    name: "",
    difficulty: "",
    duration: "",
    season: "",
    countries: [],
  });

  useEffect(() => {
    dispatch(getCountries());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getActivity());
  }, [dispatch]);

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      // validateString({
      //   ...input,
      //   [e.target.name]: e.target.value,
      // }),
      // validateNumber({
      //   ...input,
      //   [e.target.name]: e.target.value,
      // })
      valida({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }

  function handleSelect(id) {
    setInput({
      ...input,
      countries: [...input.countries, id.target.value],
    });
    setErrors(
      valida({
        ...input,
        [id.target.name]: id.target.value,
      })
    );
  }

  function handleSeason(e) {
    setInput({
      ...input,
      season: e.target.value,
    });
    setErrors(
      valida({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }

  function handleSelctDifficulty(e) {
    setInput({
      ...input,
      difficulty: e.target.value,
    });
    setErrors(
      valida({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }

  function handleSelectDuration(e) {
    setInput({
      ...input,
      duration: e.target.value,
    });
    setErrors(
      valida({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }

  function handleDelete(e) {
    setInput({
      ...input,
      countries: input.countries.filter((c) => c !== e),
    });
  }

  function finalValidate(input) {
    let error = {};
    if (
      !input.name ||
      !input.difficulty ||
      !input.duration ||
      !input.season ||
      input.countries.length === 0
    ) {
      error.msg = "Debes completar todos los campos";
      alert(error.msg);
      return error;
    } else {
      history.push("/countries/");
      alert("enviado");
    }
  }

  function handleSubmit(e) {
    e.preventDefault();

    dispatch(postActivity(input));

    setInput({
      name: "",
      difficulty: "",
      duration: "",
      season: "",
      countries: [],
    });
    finalValidate(input);

    // if (
    //   !input.name ||
    //   !input.difficulty ||
    //   !input.duration ||
    //   !input.season ||
    //   input.countries.length === 0
    // ) {
    //   let errors = {};
    //   errors.msg = "Debes completar todos los campos";
    // } else {
    //   history.push("/countries/");
    //   alert("enviado");
    // }
  }

  const season = ["Winter", "Spring", "Autumn", "Summer"];
  const difficulty = [1, 2, 3, 4, 5];
  const duration = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24,
  ];

  return (
    <div className="add-content">
      <div className="add-container">
        <div>
          <h2>Add Activity</h2>
          <div>
            <form onSubmit={handleSubmit}>
              <div>
                <label>Activity: </label>
                <input
                  type="text"
                  value={input.name}
                  name="name"
                  onChange={handleChange}
                  placeholder="Activity name..."
                />
                {errors.name && <p>{errors.name}</p>}
              </div>
              <div>
                <label>Season: </label>
                <select onChange={handleSeason}>
                  <option value="" hidden>
                    Select season
                  </option>
                  {season.map((e) => (
                    <option value={e} name="season" key={e}>
                      {e}
                    </option>
                  ))}
                </select>
                {errors.season && <p>{errors.season}</p>}
              </div>
              <div>
                <label>Difficulty: </label>
                <select onChange={handleSelctDifficulty}>
                  <option value="" hidden>
                    Choose an option
                  </option>
                  {difficulty.map((e) => (
                    <option value={e} name="difficulty">
                      {e}
                    </option>
                  ))}
                </select>
                {errors.difficulty && <p>{errors.difficulty}</p>}
              </div>
              <div>
                <label>Duration: </label>
                <select onChange={handleSelectDuration}>
                  <option value="" hidden>
                    Choose an option
                  </option>
                  {duration.map((e) => (
                    <option value={e} name="duration">
                      {e}
                    </option>
                  ))}
                </select>
                {errors.duration && <p>{errors.duration}</p>}
              </div>
              <div>
                <label>Country: </label>
                <select onChange={handleSelect}>
                  <option value=" " hidden>
                    Select country
                  </option>
                  {countries.map((e) => (
                    <option value={e.id} name="countries" key={e.id}>
                      {e.name}
                    </option>
                  ))}
                </select>
                {errors.countries && <p>{errors.countries}</p>}
              </div>
              <div>
                <ul>
                  <li>
                    {input.countries.map((i) => (
                      <div>
                        {i}
                        <button onClick={() => handleDelete(i)} type="button">
                          X
                        </button>
                      </div>
                    ))}
                  </li>
                </ul>
              </div>
              <button type="submit" disabled={!errors ? true : false}>
                Add Activity
              </button>
            </form>
            {/* {errors.msg && <p>{errors.msg}</p>} */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddActivity;
