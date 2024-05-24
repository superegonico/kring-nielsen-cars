import { FiltersUI } from "./filtering";
import { filterData, SearchType } from "filter-data";

let carList = [];
let carFilters = {
  make: [],
  model: [],
  type: [],
  propellant: [],
};

export default class Car {
  constructor(root, car) {
    root.innerHTML = Car.getHTML();

    this.el = {
      car: {
        id: car.Id,
        make: car.Make,
        model: car.Model,
        variant: car.Variant,
        image: car.Pictures[0],
        registration: car.RegistrationDate,
        mileage: car.Mileage,
        propellant: car.Propellant,
        color: car.Color,
        price: car.Price,
      },

      makeModel: root.querySelector(".car__make-model"),
      variant: root.querySelector(".car__variant"),
      image: root.querySelector(".car__image"),
      registration: root.querySelector(".car__reg"),
      mileage: root.querySelector(".car__milage"),
      propellant: root.querySelector(".car__propellant"),
      color: root.querySelector(".car__color"),
      price: root.querySelector(".car__price"),
      carDetails: root.querySelector(".show-car-details"),
    };

    this.insertCarData();
  }

  insertCarData() {
    this.el.makeModel.innerHTML = `${this.el.car.make} ${this.el.car.model}`;
    this.el.variant.innerHTML = `${this.el.car.variant}`;
    this.el.image.src = `${this.el.car.image}`;
    this.el.registration.innerHTML = `${this.el.car.registration}`;
    this.el.mileage.innerHTML = `${this.el.car.mileage}`;
    this.el.propellant.innerHTML = `${this.el.car.propellant}`;
    this.el.color.innerHTML = `${this.el.car.color}`;
    this.el.price.innerHTML = Number(this.el.car.price);
    this.el.carDetails.setAttribute("id", this.el.car.id);
  }

  static getHTML() {
    return `

    <div class="image">
      <figure class="w-full aspect-[16/10] overflow-hidden">
        <img class="car__image w-full h-full object-cover" src=""
            alt="">
      </figure>
    </div>
    <div class="p-4">
    <div class="heading">
      <h3 class="car__make-model text-[20px] leading-snug font-semibold">Mercedes C250</h3>
      <p class="car__variant text-[12px] leading-snug opacity-70">2.0 AMG Line Stc. Aut.</p>
    </div>
    <div class="details grid grid-cols-2 gap-1 py-6 text-[14px]">    

      <ul class="border-[1px] rounded-md p-2">
            <li class="opacity-60 text-[12px]">1. reg</li>
            <li class="car__reg">06.20.2016</li>
        </ul>
        <ul class="border-[1px] rounded-md p-2">
            <li class="opacity-60 text-[12px]">KM</li>
            <li class="car__milage">90.0000</li>
        </ul>
       <ul class="border-[1px] rounded-md p-2">
            <li class="opacity-60 text-[12px]">Brændstof</li>
            <li class="car__propellant">BENZIN</li>
        </ul>
       <ul class="border-[1px] rounded-md p-2">
            <li class="opacity-60 text-[12px]">Farve</li>
            <li class="car__color">SORTMETAL</li>
        </ul>
    </div>
    <div class="pricing flex justify-between items-center">
        <div class="price">
          <div class="inline-block -translate-y-4 mr-2">DKK</div>  
          <span class="car__price text-[22px] font-semibold after:content-[',-']">399.995</span>
        </div>
        <div id="" class="button show-car-details h-[44px] w-[44px] bg-yellow-400 flex justify-center items-center rounded-md cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" width="46" height="46" viewBox="0 0 46 46" fill="none">
  
                <path fill-rule="evenodd" clip-rule="evenodd"
                    d="M26 26.6603L30 23.3301L26 20V23H15V24H26V26.6603Z" fill="#113522" />
            </svg>
        </div>
    </div>
    </div>`;
  }
}

export class CarDetails {
  constructor(root, car) {
    root.innerHTML = CarDetails.getHTML();

    this.el = {
      car: {
        id: car.Id,
        make: car.Make,
        model: car.Model,
        variant: car.Variant,
        image: car.Pictures[0],
        registration: car.RegistrationDate,
        mileage: car.Mileage,
        propellant: car.Propellant,
        color: car.Color,
        price: car.Price,
      },
    };

    this.insertCarData();
  }

  insertCarData() {
    // console.log(this.root);
    // console.log(this.el.car.make);
  }

  static getHTML() {
    return `

    `;
  }
}

export class Cars {
  constructor() {
    this.el = {
      cars: document.getElementById("cars"),
    };
    this.carMake = [];
    this.carModel = [];
    this.carType = [];
    this.carPropellant = [];

    this.el.cars.innerHTML = "";
  }

  get getMake() {
    return this.carMake;
  }

  set getMake(value) {
    let tempList = [];

    if (carList && carList.length > 0) {
      carList.map((car) => {
        Object.keys(car)
          .filter((key) => key.includes("Make"))
          .reduce((cur, key) => {
            return tempList.push(car[key]);
          }, {});
      });

      this.carMake = tempList;

      new FiltersUI(
        document.querySelector("#car-filters .make"),
        "make"
      ).populateFilter([...new Set(this.carMake)], "make");
    } else {
      this.getCarsFeed().then((cars) => {
        cars.map((car) => {
          Object.keys(car)
            .filter((key) => key.includes("Make"))
            .reduce((cur, key) => {
              return this.carMake.push(car[key]);
            }, {});
        });

        new FiltersUI(
          document.querySelector("#car-filters .make"),
          "make"
        ).populateFilter([...new Set(this.carMake)], "make");
      });
    }
  }

  get getModel() {
    return this.carModel;
  }

  set getModel(value) {
    let tempList = [];

    if (carList && carList.length > 0) {
      carList.map((car) => {
        Object.keys(car)
          .filter((key) => key.includes("Model"))
          .reduce((cur, key) => {
            return tempList.push(car[key]);
          }, {});
      });

      this.carModel = tempList;

      new FiltersUI(
        document.querySelector("#car-filters .model"),
        "model"
      ).populateFilter([...new Set(this.carModel)], "model");
    } else {
      this.getCarsFeed().then((cars) => {
        cars.map((car) => {
          Object.keys(car)
            .filter((key) => key.includes("Model"))
            .reduce((cur, key) => {
              return this.carModel.push(car[key]);
            }, {});
        });

        new FiltersUI(
          document.querySelector("#car-filters .model"),
          "model"
        ).populateFilter([...new Set(this.carModel)], "model");
      });
    }
  }

  get getType() {
    return this.carType;
  }

  set getType(value) {
    let tempList = [];

    if (carList && carList.length > 0) {
      carList.map((car) => {
        Object.keys(car)
          .filter((key) => key === "Type")
          .reduce((cur, key) => {
            return tempList.push(car[key]);
          }, {});
      });

      this.carType = tempList;

      new FiltersUI(
        document.querySelector("#car-filters .type"),
        "type"
      ).populateFilter([...new Set(this.carType)], "type");
    } else {
      this.getCarsFeed().then((cars) => {
        cars.map((car) => {
          Object.keys(car)
            .filter((key) => key === "Type")
            .reduce((cur, key) => {
              return this.carType.push(car[key]);
            }, {});
        });

        new FiltersUI(
          document.querySelector("#car-filters .type"),
          "type"
        ).populateFilter([...new Set(this.carType)], "type");
      });
    }
  }

  get getPropellant() {
    return this.carPropellant;
  }

  set getPropellant(value) {
    let tempList = [];

    if (carList && carList.length > 0) {
      carList.map((car) => {
        Object.keys(car)
          .filter((key) => key === "Propellant")
          .reduce((cur, key) => {
            return tempList.push(car[key]);
          }, {});
      });

      this.carPropellant = tempList;

      new FiltersUI(
        document.querySelector("#car-filters .propellant"),
        "propellant"
      ).populateFilter([...new Set(this.carPropellant)], "propellant");
    } else {
      this.getCarsFeed().then((cars) => {
        cars.map((car) => {
          Object.keys(car)
            .filter((key) => key === "Propellant")
            .reduce((cur, key) => {
              return this.carPropellant.push(car[key]);
            }, {});
        });

        new FiltersUI(
          document.querySelector("#car-filters .propellant"),
          "propellant"
        ).populateFilter([...new Set(this.carPropellant)], "propellant");
      });
    }
  }

  lowerFirstChar = (obj) =>
    Object.keys(obj).reduce((acc, k) => {
      acc[k.substring(0, 1).toLowerCase() + k.substring(1)] = obj[k];
      return acc;
    }, {});

  lowerize = (obj) => {};

  article(index) {
    const newCarElement = document.createElement("article");
    newCarElement.id = `car-${index}`;
    newCarElement.classList.add(
      "car",
      "pb-4",
      "border-[1px]",
      "rounded-lg",
      "overflow-hidden"
    );
    document.getElementById("cars").appendChild(newCarElement);
  }

  selectedFilters(tis, lort) {
    switch (tis) {
      case "make":
        carFilters.make = lort;
        break;
      case "model":
        carFilters.model = lort;
        break;
      case "type":
        carFilters.type = lort;
        break;
      case "propellant":
        carFilters.propellant = lort;
        break;
      default:
        break;
    }

    if (carFilters.make) {
      const options = Array.from(
        document.querySelector("#car-filters #make").children
      );
      const selected = options
        .filter((option) => option.value === carFilters.make)
        .map((option) => (option.selected = true));
    }
    if (carFilters.model) {
      const options = Array.from(
        document.querySelector("#car-filters #model").children
      );
      const selected = options
        .filter((option) => option.value === carFilters.model)
        .map((option) => (option.selected = true));
    }
    if (carFilters.type) {
      const options = Array.from(
        document.querySelector("#car-filters #type").children
      );
      const selected = options
        .filter((option) => option.value === carFilters.type)
        .map((option) => (option.selected = true));
    }
    if (carFilters.propellant) {
      const options = Array.from(
        document.querySelector("#car-filters #propellant").children
      );
      const selected = options
        .filter((option) => option.value === carFilters.propellant)
        .map((option) => (option.selected = true));
    }

    return;
  }

  filterBy(filters) {
    const result = filterData(carList, filters);

    result.map((car, index) => {
      this.article(index);
    });
    result.map((car, index) => {
      new Car(document.getElementById(`car-${index}`), car);
    });

    carList = result;

    // localStorage.setItem("filtered-car-list", JSON.stringify(result));

    return result;
  }

  filterByMake(make) {
    this.getCarsFeed().then((cars) => {
      const filtedList = cars.filter((car) => car.Make === make);

      filtedList.map((car, index) => {
        this.article(index);
      });
      filtedList.map((car, index) => {
        new Car(document.getElementById(`car-${index}`), car);
      });
    });
  }

  resetFilters() {
    carList = null;
    carFilters = {
      make: [],
      model: [],
      type: [],
      propellant: [],
    };
    this.carMake = [];
    this.carModel = [];
    this.carType = [];
    this.carPropellant = [];
  }

  getSpecificCar(id) {
    this.getCarsFeed().then((cars) => {
      const car = cars.filter((car) => car.Id === id);

      new CarDetails(document.querySelector(".fucking-car"), car[0]);

      return car;
    });
  }

  getCars() {
    this.getCarsFeed().then((cars) => {
      cars.map((car, index) => {
        this.article(index);
      });
      cars.map((car, index) => {
        new Car(document.getElementById(`car-${index}`), car);
      });
      carList = cars;
      console.log(carList);
      return cars;
    });
  }

  getCarsFeed = async () => {
    const response = await fetch(
      "https://gist.githubusercontent.com/nicolaisimonsen/23832234a19f65bb6ace54f51df1b33b/raw/779f7e78675b82e50734138b161cd3c954b0a0ce/cars.json"
    );
    const cars = await response.json();
    return cars.vehicles;
  };
}
