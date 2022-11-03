const { Router } = require("express");
const { Country, Activity } = require("../db");
const router = Router();

router.get("/", async (req, res) => {
  const { name } = req.query;
  const allCountries = await Country.findAll({
    include: Activity,
  });
  if (name) {
    const byName = await allCountries.filter((i) =>
      i.name.toLowerCase().startsWith(name.toLowerCase())
    );
    byName.length
      ? res.json(byName)
      : res.status(404).send({ msg: "Not found" });
  } else {
    res.json(allCountries);
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  let countries;
  if (id.length > 1) {
    countries = await Country.findByPk({
      include: Activity,
    });
    countries = {
      id: countries.id,
      name: countries.name,
      image: countries.image,
      continent: countries.continent,
      capital: countries.capital,
      subregion: countries.subregion,
      area: countries.area,
      population: countries.population,
      activities: countries.activities.map((a) => {
        return {
          id: a.id,
          name: a.name,
          difficulty: a.difficulty,
          duration: a.duration,
          season: a.season,
        };
      }),
    };
  }
  res.json(countries);
});

module.exports = router;
