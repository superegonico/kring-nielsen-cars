import "./style.css";
import Car, { Cars } from "./modules/car";

document.addEventListener("DOMContentLoaded", () => {
  console.log("DOMContent loaded");

  // new Cars().getCars();
  // new Cars().getCarList();
  new Cars().filterBy({
    type: null,
    propellant: null,
    make: "VW",
    model: null,
  });
  // new Cars().filterByMake("Skoda");
});
