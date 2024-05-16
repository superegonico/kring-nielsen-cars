import "./style.css";
import Car, { Cars } from "./modules/car";
import { Filter, FiltersUI } from "./modules/filtering";

const filter = new Filter();
const cars = new Cars();

document.addEventListener("DOMContentLoaded", () => {
  console.log("DOMContent loaded");

  cars.getCars();
  getFiltering();
});

const getFiltering = () => {
  // cars.getModel = true;
  cars.getMake = true;
  cars.getModel = true;
  cars.getType = true;
  cars.getPropellant = true;

  const filtersMake = new FiltersUI(
    document.querySelector("#car-filters .make"),
    "make"
  );
  const filtersModel = new FiltersUI(
    document.querySelector("#car-filters .model"),
    "model"
  );
  const filtersType = new FiltersUI(
    document.querySelector("#car-filters .type"),
    "type"
  );
  const filtersPropellant = new FiltersUI(
    document.querySelector("#car-filters .propellant"),
    "propellant"
  );
  // const filtersPropellant = new FiltersUI(
  //   document.querySelector("#car-filters .propellant"),
  //   "propellant"
  // );
};

document.getElementById("free-search").addEventListener("keypress", (e) => {
  console.log(e.target.value);
  filter.filterSearch = e.target.value;
});

document.getElementById("car-filters").addEventListener("change", (e) => {
  switch (e.target.id) {
    case "filters-make":
      filter.filterObj = { make: e.target.value };
      break;
    case "filters-model":
      filter.filterObj = { model: e.target.value };
      break;
    case "filters-type":
      filter.filterObj = { type: e.target.value };
      break;
    case "filters-propellant":
      filter.filterObj = { propellant: e.target.value };
      break;
    default:
  }
});
