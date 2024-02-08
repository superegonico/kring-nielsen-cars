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
  const filtersUI = new FiltersUI(document.getElementById("car-filters"));
};

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
