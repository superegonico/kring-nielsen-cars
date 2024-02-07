export default class Car {
  constructor(root, car) {
    root.innerHTML = Car.getHTML();

    this.el = {
      car: {
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
  }

  static getHTML() {
    return `
    <div class="heading text-center">
        <h3 class="car__make-model text-[28px] leading-6 font-semibold">Mercedes C250</h3>
        <p class="car__variant text-[16px] leading-6 mt-2">2.0 AMG Line Stc. Aut.</p>
    </div>
    <div class="image mt-6">
      <figure class="w-full aspect-[16/9] overflow-hidden">
        <img class="car__image w-full object-center" src=""
            alt="">
      </figure>
    </div>
    <div class="details px-5 pt-6 pb-8 uppercase flex justify-between text-[10px]">
        <ul>
            <li class="font-bold">1. reg</li>
            <li class="car__reg">06.20.2016</li>
        </ul>
        <ul>
            <li class="font-bold">KM</li>
            <li class="car__milage">90.0000</li>
        </ul>
        <ul>
            <li class="font-bold">Brændstof</li>
            <li class="car__propellant">BENZIN</li>
        </ul>
        <ul>
            <li class="font-bold">Farve</li>
            <li class="car__color">SORTMETAL</li>
        </ul>
    </div>
    <hr>
    <div class="pricing flex justify-between items-center pt-4 px-5">
        <div class="price">
            <span
                class="car__price text-[28px] font-semibold after:content-['DKK'] after:text-[14px] after:ml-3">399.995</span>
        </div>
        <div class="button">
            <svg xmlns="http://www.w3.org/2000/svg" width="46" height="46" viewBox="0 0 46 46" fill="none">
                <circle cx="23" cy="23" r="23" fill="#E7B84C" />
                <path fill-rule="evenodd" clip-rule="evenodd"
                    d="M26 26.6603L30 23.3301L26 20V23H15V24H26V26.6603Z" fill="#113522" />
            </svg>
        </div>
    </div>`;
  }
}

export class Cars {
  constructor() {
    this.el = {
      cars: document.getElementById("cars"),
    };

    this.el.cars.innerHTML = "";
  }

  article(index) {
    const newCarElement = document.createElement("article");
    newCarElement.id = `car-${index}`;
    newCarElement.classList.add("car", "pt-8", "pb-4", "shadow-lg", "bg-white");
    document.getElementById("cars").appendChild(newCarElement);
  }

  filterBy(filters) {
    this.getCarsFeed().then((cars) => {
      const filtedList = cars.filter(
        (car) => car.Make.toLowerCase() === filters.make
      );
      console.log(filtedList);
      filtedList.map((car, index) => {
        this.article(index);
      });
      filtedList.map((car, index) => {
        new Car(document.getElementById(`car-${index}`), car);
      });
    });
  }

  filterByMake(make) {
    this.getCarsFeed().then((cars) => {
      const filtedList = cars.filter((car) => car.Make === make);
      console.log(filtedList);
      filtedList.map((car, index) => {
        this.article(index);
      });
      filtedList.map((car, index) => {
        new Car(document.getElementById(`car-${index}`), car);
      });
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
