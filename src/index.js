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
  cars.getGearType = true;
  cars.getMileage = true;

  cars.selectedFilters(tis, lort);
};

document.getElementById("free-search").addEventListener("input", (e) => {
  filter.filterSearch = e.target.value;
  if (e.target.value === "") {
    document.getElementById("searchBtn").classList.remove("hidden");
    document.getElementById("searchResetBtn").classList.add("hidden");
  } else {
    document.getElementById("searchBtn").classList.add("hidden");
    document.getElementById("searchResetBtn").classList.remove("hidden");
  }
});

document.getElementById("free-search").addEventListener("keyup", (e) => {
  if (e.key === "Escape") {
    filter.filterSearch = "";
    e.target.value = "";
  }
});

document.getElementById("searchResetBtn").addEventListener("click", (e) => {
  filter.filterSearch = "";
  document.getElementById("free-search").value = "";
  document.getElementById("searchBtn").classList.remove("hidden");
  document.getElementById("searchResetBtn").classList.add("hidden");
});

document.getElementById("show-filters").addEventListener("click", (e) => {
  document.getElementById("car-filters").classList.toggle("hide");
});
document.getElementById("hide-filters").addEventListener("click", (e) => {
  document.getElementById("car-filters").classList.toggle("hide");
});

document.addEventListener("click", (e) => {
  if (e.target.id !== "show-filters") {
    if (!e.target.closest("#car-filters")) {
      document.getElementById("car-filters").classList.add("hide");
    }
  }
});

document.getElementById("reset-filters").addEventListener("click", (e) => {
  cars.resetFilters();
  cars.getCars();
  getFiltering();
});

document.getElementById("car-filters").addEventListener("change", (e) => {
  let comp = null;

  switch (e.target.getAttribute("data-search-comp")) {
    case "LK":
      comp = SearchType.LK;
      break;
    case "GTE":
      comp = SearchType.GTE;
      break;
    case "LTE":
      comp = SearchType.LTE;
      break;
    case "GT":
      comp = SearchType.GT;
      break;
    case "LT":
      comp = SearchType.LT;
      break;
    default:
      comp = SearchType.LK;
  }

  filter.filterObj = {
    key: e.target.id.charAt(0).toUpperCase() + e.target.id.slice(1),
    value: e.target.value,
    type: comp,
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
