import "./style.css";
import Car, { Cars } from "./modules/car";
import { Filter, FiltersUI } from "./modules/filtering";
import { filterData, SearchType } from "filter-data";

const filter = new Filter();
const cars = new Cars();

document.addEventListener("DOMContentLoaded", () => {
  console.log("DOMContent loaded");

  cars.getCars();
  getFiltering();

  // console.log(
  //   "filtered-car-list",
  //   JSON.parse(localStorage.getItem("filtered-car-list"))
  // );
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
  // const filtersPropellant = new FiltersUI(
  //   document.querySelector("#car-filters .propellant"),
  //   "propellant"
  // );
};

document.getElementById("free-search").addEventListener("keypress", (e) => {
  // console.log(e.target.value);
  filter.filterSearch = e.target.value;
});

document.getElementById("reset-filters").addEventListener("click", (e) => {
  localStorage.removeItem("filtered-car-list");

  cars.getCars();

  getFiltering();
});

document.getElementById("car-filters").addEventListener("change", (e) => {
  filter.filterObj = {
    key: e.target.id.charAt(0).toUpperCase() + e.target.id.slice(1),
    value: e.target.value,
    type: SearchType.LK,
  };

  getFiltering();

  // console.log(
  //   "filtered-car-list",
  //   JSON.parse(localStorage.getItem("filtered-car-list"))
  // );
});
