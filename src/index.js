import "./style.css";
import Car, { Cars } from "./modules/car";
import Filter from "./modules/filtering";

let carFilters = {};
const filter = new Filter();

document.addEventListener("DOMContentLoaded", () => {
  console.log("DOMContent loaded");
  // carFilters ? new Cars().getCars() : new Cars().getCars();

  new Cars().getCars();
  // new Cars().getCarList();
  // new Cars().filterBy({
  //   type: null,
  //   propellant: null,
  //   make: "VW",
  //   model: null,
  // });
  // new Cars().filterByMake("Skoda");
});

document.getElementById("car-filters").addEventListener("change", (e) => {
  if (e.target.id === "filters-make") {
    filter.filterObj = { make: e.target.value };
  }
  if (e.target.id === "filters-model") {
    filter.filterObj = { model: e.target.value };
  }
  if (e.target.id === "filters-type") {
    filter.filterObj = { type: e.target.value };
  }
  if (e.target.id === "filters-propellant") {
    filter.filterObj = { propellant: e.target.value };
  }
});

// const x = {
//   aInternal: 10,
//   aListener: function (val) {},
//   set a(val) {
//     this.aInternal = val;
//     this.aListener(val);
//   },
//   get a() {
//     return this.aInternal;
//   },
//   registerListener: function (listener) {
//     this.aListener = listener;
//   },
// };

// x.registerListener(function (val) {
//   alert("Someone changed the value of x.a to " + val);
// });

// x.a = 43;
