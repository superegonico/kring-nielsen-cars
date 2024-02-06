import "./style.css";
import Car from "./modules/car";

// const carsWrapper = document.getElementById("cars");

document.addEventListener("DOMContentLoaded", () => {
  console.log("DOMContent loaded");
  //   const car = new Car(document.getElementById("cars"));

  getCars().then((cars) => {
    cars.map((car, index) => {
      const newCarElement = document.createElement("article");
      newCarElement.id = `car-${index}`;
      document.getElementById("cars").appendChild(newCarElement);
      new Car(document.getElementById(`car-${index}`));
    });
  });
});

async function getCars() {
  const response = await fetch(
    "https://gist.githubusercontent.com/nicolaisimonsen/23832234a19f65bb6ace54f51df1b33b/raw/779f7e78675b82e50734138b161cd3c954b0a0ce/cars.json"
  );
  const cars = await response.json();
  return cars.vehicles;
}
