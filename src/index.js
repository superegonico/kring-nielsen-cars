import "./style.css";
import Car, { Cars, CarDetails } from "./modules/car";
import { Filter, FiltersUI } from "./modules/filtering";
import { filterData, SearchType } from "filter-data";

const filter = new Filter();
const cars = new Cars();

document.addEventListener("DOMContentLoaded", () => {
  console.log("DOMContent loaded");

  const carID = new window.URLSearchParams(window.location.search).get(
    "visdetaljer"
  );

  if (carID) {
    console.log(carID);
    cars.getSpecificCar(carID);
  } else {
    cars.getCars();
    getFiltering();
  }
});

const getFiltering = (tis, lort) => {
  cars.getModel = true;
  cars.getMake = true;
  cars.getModel = true;
  cars.getType = true;
  cars.getPropellant = true;

  cars.selectedFilters(tis, lort);
};

document.getElementById("free-search").addEventListener("keypress", (e) => {
  filter.filterSearch = e.target.value;
});

document.getElementById("show-filters").addEventListener("click", (e) => {
  document.getElementById("car-filters").classList.toggle("hide");
});
document.getElementById("hide-filters").addEventListener("click", (e) => {
  document.getElementById("car-filters").classList.toggle("hide");
});
document.getElementById("cars").addEventListener("click", (e) => {
  document.getElementById("car-filters").classList.toggle("hide");
});

document.getElementById("reset-filters").addEventListener("click", (e) => {
  localStorage.removeItem("filtered-car-list");
  cars.resetFilters();
  cars.getCars();
  getFiltering();
});

document.getElementById("car-filters").addEventListener("change", (e) => {
  filter.filterObj = {
    key: e.target.id.charAt(0).toUpperCase() + e.target.id.slice(1),
    value: e.target.value,
    type: SearchType.LK,
  };

  getFiltering(e.target.id, e.target.value);
});

// LINK TO CAR DETAILS

document.getElementById("cars").addEventListener("click", (e) => {
  const target = e.target.closest(".show-car-details");

  if (target) {
    window.location.href = `/?visdetaljer=${target.id}`;
  }
});
