import cors from "cors";
import { FiltersUI } from "./filtering";
import { filterData, SearchType } from "filter-data";
import Swiper from "swiper";

let carList = [];
let filterList = [];
let carFilters = {
  make: [],
  model: [],
  type: [],
  propellant: [],
  mileage: [],
  gear: [],
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
        // year: car.Year,
        propellant: car.Propellant,
        color: car.Color,
        price: car.Price,
        gear: car.GearType,
      },

      makeModel: root.querySelector(".car__make-model"),
      variant: root.querySelector(".car__variant"),
      image: root.querySelector(".car__image"),
      registration: root.querySelector(".car__reg"),
      mileage: root.querySelector(".car__milage"),
      // year: root.querySelector(".car__year"),
      propellant: root.querySelector(".car__propellant"),
      color: root.querySelector(".car__color"),
      price: root.querySelector(".car__price"),
      gear: root.querySelector(".car__gear"),
      carDetails: root.querySelector(".show-car-details"),
    };

    this.insertCarData();
  }

  insertCarData() {
    const priceFormat = new Intl.NumberFormat("da-DK", {
      style: "currency",
      currency: "DKK",
      maximumFractionDigits: 0,
    });

    const kmFormat = new Intl.NumberFormat("da-DK", {
      style: "unit",
      unit: "kilometer",
    });

    this.el.makeModel.innerHTML = `${this.el.car.make} ${this.el.car.model}`;
    this.el.variant.innerHTML = `${this.el.car.variant}`;
    this.el.image.src = `${this.el.car.image}`;
    this.el.registration.innerHTML = `${this.el.car.registration}`;
    this.el.mileage.innerHTML = kmFormat
      .format(Number(this.el.car.mileage))
      .replace("km", "");
    this.el.propellant.innerHTML = `${this.el.car.propellant}`;
    this.el.color.innerHTML = `${this.el.car.color}`;
    // this.el.year.innerHTML = `${this.el.car.year}`;
    this.el.gear.innerHTML = `${
      this.el.car.gear === "A" ? "Automatisk" : "Manuel"
    }`;
    this.el.price.innerHTML = priceFormat
      .format(Number(this.el.car.price))
      .replace("kr.", "");
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
       <ul class="border-[1px] rounded-md p-2">
            <li class="opacity-60 text-[12px]">Gear</li>
            <li class="car__gear"></li>
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
        year: car.Year,
        image: car.Pictures[0],
        images: car.Pictures,
        registration: car.RegistrationDate,
        mileage: car.Mileage,
        motor: car.Motor,
        propellant: car.Propellant,
        color: car.Color,
        price: car.Price,
        comment: car.Comment,
        type: car.Type,
        kmprl: car.KmPerLiter,
        equipment: car.EquipmentList,
      },

      comment: root.querySelector("#car-comment"),
      equipmentList: root.querySelector("#car-equipment-list"),
      image: root.querySelector("#car-image"),
      makeModel: root.querySelector("#car-make-model"),
      registration: root.querySelector("#car-registration"),
      mileage: root.querySelector("#car-mileage"),
      propellant: root.querySelector("#car-propellant"),
      swiperThumbnails: root.querySelector("#car-swiper-thumbnails"),
      variant: root.querySelector("#car-variant"),
      year: root.querySelector("#car-year"),
      type: root.querySelector("#car-type"),
      price: root.querySelector("#car-price"),
      motor: root.querySelector("#car-motor"),
      kmprl: root.querySelector("#car-km-pr-l"),
      carSpeclist: root.querySelector("#car-collapse-speclist"),

      specsList: [
        {
          title: "Generelt",
          specs: [
            {
              name: "1. reg.",
              value: car.RegistrationDate,
            },
            {
              name: "Type",
              value: car.Type,
            },
            {
              name: "Farve",
              value: car.Color,
            },
            {
              name: "Modelår",
              value: car.Year,
            },
            {
              name: "Antal døre",
              value: car.NumberOfDoors,
            },
          ],
        },
        {
          title: "Motor",
          specs: [
            {
              name: "Km.",
              value: car.Mileage,
            },
            {
              name: "Brændstof",
              value: car.Propellant,
            },
            {
              name: "Motor",
              value: car.Motor,
            },
            {
              name: "HK",
              value: car.Effect,
            },
            {
              name: "Antal gear",
              value: car.NumberOfGears,
            },
            {
              name: "Gear type",
              value: car.GearType,
            },
          ],
        },
      ],
    };

    this.insertCarData();
    this.insertThumbnails();
    this.insertEquipment();
    this.insertSpecs();
  }

  insertCarData() {
    this.el.makeModel.innerHTML = `${this.el.car.make} ${this.el.car.model}`;
    this.el.variant.innerHTML = `${this.el.car.variant}`;
    this.el.propellant.innerHTML = `${this.el.car.propellant}`;
    this.el.mileage.innerHTML = `${this.el.car.mileage}`;
    this.el.registration.innerHTML = `${this.el.car.registration}`;
    this.el.comment.innerHTML = `${this.el.car.comment}`;
    this.el.registration.innerHTML = `${this.el.car.registration}`;
    this.el.type.innerHTML = `${this.el.car.type}`;
    this.el.motor.innerHTML = `${this.el.car.motor}`;
    this.el.image.src = `${this.el.car.image}`;
    this.el.year.innerHTML = `${this.el.car.year}`;
    this.el.kmprl.innerHTML = `${this.el.car.kmprl}`;
    this.el.price.innerHTML = `<span class="mr-2 text-lg font-normal uppercase align-top">DKK</span>${this.el.car.price},-`;
    console.log(this.el.car);
  }

  insertThumbnails() {
    this.el.car.images.map((image) => {
      const img = document.createElement("img");
      const div = document.createElement("div");
      img.src = image.replace("S1600X1600", "S400X400");
      img.classList.add("object-cover", "w-full", "h-full");
      div.loading = "lazy";
      div.classList.add(
        "flex",
        "w-32",
        "h-16",
        "overflow-x-hidden",
        "border",
        "rounded-md",
        "cursor-pointer"
      );
      div.appendChild(img);
      this.el.swiperThumbnails.appendChild(div);
    });
  }

  insertEquipment() {
    this.el.car.equipment.map((item) => {
      const div = document.createElement("div");
      div.classList.add("equipItem");
      div.innerHTML = `<p>${item}</p><svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>`;
      this.el.equipmentList.appendChild(div);
    });
  }

  insertSpecs() {
    const general = document.querySelector(
      "#car-collapse-general .collapse-content"
    );

    this.el.specsList[0].specs.map((specList) => {
      const specBlock = document.createElement("div");
      specBlock.classList.add("spec-block");
      specBlock.innerHTML = `<p>${specList.name}</p><p>${specList.value}</p>`;
      general.appendChild(specBlock);
    });

    const motor = document.querySelector(
      "#car-collapse-motor .collapse-content"
    );

    this.el.specsList[1].specs.map((specList) => {
      const specBlock = document.createElement("div");
      specBlock.classList.add("spec-block");
      specBlock.innerHTML = `<p>${specList.name}</p><p>${specList.value}</p>`;
      motor.appendChild(specBlock);
    });

    // this.el.specsList.map((specList) => {
    //   console.log(specList);
    //   const top = document.createElement("div");
    //   top.classList.add("collapse-content", "sub-collapse", "bg-white");
    //   const collapse = document.createElement("div");
    //   collapse.classList.add("collapse", "bg-white");
    //   const heading = document.createElement("div");
    //   heading.innerHTML = `<input type="checkbox" /><div class="collapse-title flex justify-between"><p>${specList.title}</p><svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg></div>`;
    //   const content = document.createElement("div");
    //   content.classList.add("collapse-content", "px-0", "bg-white");
    //   specList.specs.map((spec) => {
    //     const specBlock = document.createElement("div");
    //     specBlock.classList.add("spec-block");
    //     specBlock.innerHTML = `<p>${spec.name}</p><p>${spec.value}</p>`;
    //     content.appendChild(specBlock);
    //   });
    //   collapse.appendChild(heading);
    //   collapse.appendChild(content);
    //   this.el.carSpeclist.appendChild(collapse);
    // });
  }

  addSwiper() {}

  static getHTML() {
    return `
    <div class="lg:flex lg:space-x-8">
    <div class="lg:w-7/12">
      <div>
        <div class="relative group">
          <div class="absolute cursor-pointer enlargeBtn top-4 right-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1"
                d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
              ></path>
            </svg>
          </div>

          <!--<video id="video" preload="auto" loop="loop" controls="controls" playsinline="" class="w-full border rounded-md ng-hide" style="width: 100%; height: auto;" autoplay="">
                      <source type="video/mp4">
                      Your browser does not support the video tag.
                  </video>-->

          <img id="car-image"
            class="w-full border rounded-md"
            loading="lazy"
            alt=""
            src="https://billeder.bilinfo.net/bilinfo/29cdfec0-3c1d-49cb-bb8d-3692191011ba.jpeg?class=S1600X1600"
          />
        </div>
        <div class="flex py-2">
          <a
            class="flex items-center justify-center w-8 rounded-md cursor-pointer bg-[#333] text-[#fff] text-light hover:bg-dark"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 19l-7-7 7-7"
              ></path>
            </svg>
          </a>
          <div class="flex w-full px-2 space-x-2 overflow-hidden">
            <div id="car-swiper-thumbnails" class="flex space-x-2"></div>
          </div>
          <a
            class="flex items-center justify-center w-8 rounded-md cursor-pointer bg-[#333] text-[#fff] text-light hover:bg-dark"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 5l7 7-7 7"
              ></path>
            </svg>
          </a>
        </div>
      </div>

      <div class="flex flex-col py-4 space-y-4">
 

        <div class="py-2">
          <h2 class="text-lg font-bold text-gray-900">Beskrivelse</h2>
          <p id="car-comment"
            class="text-base text-gray-500 line-clamp-4">
          </p>
          <a
            class="text-base font-bold cursor-pointer text-primary ng-binding"
            ng-click="currentCar.CommentExpanded = !currentCar.CommentExpanded"
            >Læs mere</a
          >
        </div>

        <div id="car-collapse-speclist" class="collapse bg-base-200">
          <input type="checkbox" /> 
          <div class="collapse-title">
            <div class="flex space-x-4 place-items-center">
              <div class="iconBox">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
              </div>
              <h3 class="text-xl font-bold">
                  Specifikationer
              </h3>
            </div>
          </div>

          <div>
          <!-- General collapse -->

          <div id="car-collapse-general" class="collapse sub-collapse bg-white border-b"> 
              <input type="checkbox" /> 
              <div class="collapse-title flex justify-between">
                <p>Generelt</p>
                <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
              </div>
              <div class="collapse-content px-0 bg-white"> 
              </div>
          </div>

          <!-- Motor collapse -->

          <div id="car-collapse-motor" class="collapse sub-collapse bg-white border-b"> 
              <input type="checkbox" /> 
              <div class="collapse-title flex justify-between">
                <p>Motor</p>
                <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
              </div>
              <div class="collapse-content px-0 bg-white"> 
              </div>
          </div></div>

        </div>

        <div class="collapse bg-base-200">
          <input type="checkbox" /> 
          <div class="collapse-title ">
            <div class="flex space-x-4 place-items-center">
              <div class="iconBox">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                  ></path>
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  ></path>
                </svg>
              </div>
              <h3 class="text-xl font-bold">Udstyr</h3>
            </div>
           </div>
          <div class="collapse-content bg-white"> 
            <div id="car-equipment-list"
              class="grid gap-4 py-4 md:grid-cols-3">
          </div>
        </div>
      </div>

      </div>
    </div>
    <div class="lg:w-5/12">
      <div class="sticky hidden top-8 lg:block">
        <div
          class="flex flex-wrap justify-end gap-2 py-4 lg:py-0 lg:pb-4"
        > 
            <a
              href="https://www.facebook.com/share.php?u=https%3A//www.brugtbilsmodulet.dk/bbmview/shareonfacebook%3Fqnumber%3D1244.917340730"
              class="flex items-center rounded-full px-4 py-1 bg-[rgb(229,231,235)] text-sm space-x-1"
            >
              <span>Del på Facebook</span>
              <i>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                  ></path>
                </svg>
              </i>
            </a>
        </div>

        <div class="flex justify-between py-3 space-x-4">
          <div class="space-y-1">
            <h2 id="car-make-model"
              class="text-2xl font-bold leading-none text-gray-900 md:text-2xl lg:text-3xl"
            >
              Audi e-tron GT
            </h2>
            <h3 id="car-variant" class="text-base leading-none text-gray-400">
              quattro
            </h3>
          </div>
          
        </div>

        <div class="custom-specgrid">
          
          <!-- Reg.Dato -->
          <div class="spec-block ">
            <p  class="">1.reg.</p>
            <p id="car-registration" class=""></p>
          </div>

          <!-- Type -->
          <div
            class="spec-block"
          >
            <p>Type</p>
            <p id="car-type">
              
            </p>
          </div>

          <!-- KM -->
          <div
            class="spec-block"
          >
            <p>Km.</p>
            <p id="car-mileage">

            </p>
          </div>

          <!-- Color -->
          <div
            class="spec-block"
          >
            <p>Farve</p>
            <p id="car-color">
              Koksmetal
            </p>
          </div>
          
          <!-- Propellant -->
          <div
            class="spec-block"
          >
            <p>Brændstof</p>
            <p id="car-propellant"></p>
          </div>

          <!-- Motor -->
          <div
            class="spec-block"
          >
            <p>Motor</p>
            <p id="car-motor"></p>
          </div>

          <!-- Model -->
          <div
            class="spec-block">
            <p>Modelår</p>
            <p id="car-year"></p>
          </div>

          <!-- KM.PR.L -->
          <div
            class="spec-block">
            <p>Km. pr. liter</p>
            <p id="car-km-pr-l"></p>
          </div>
        </div>

        <!-- PRICE -->
        <div class="flex justify-between py-3">
          <div class="py-6">
            <p id="car-price"
              class="text-4xl carCard_price"
            >
            </p>
         </div>
        </div>

        <div
          class="flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2"
        >
          <a
            class="w-full cursor-pointer button button--primary"
          >
            <span>Skriv på bil</span>
            <i>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 5l7 7-7 7"
                ></path>
              </svg>
            </i>
          </a>
          <a
            class="w-full button button--secondary"
            href="tel:75443800"
            bbmclickevent="Ring på bil"
            ng-modelid="1244"
          >
            <span>Ring på bil</span>
            <i>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 5l7 7-7 7"
                ></path>
              </svg>
            </i>
          </a>
        </div>

        <!-- ngInclude: 'santander' -->
        <div ng-include="'santander'" class="ng-scope">
          <div class="ng-scope">
            <!-- Own Santander Id -->
            <!-- ngIf: settings.santanderPartnerId != '' -->
            <div
              class="p-4 my-4 space-y-4 bg-gray-100 rounded-lg ng-scope"
              ng-if="settings.santanderPartnerId != ''"
            >
              <img
                class="w-full rounded-md"
                ng-src="https://www.brugtbilsmodulet.dk/Images/santander2.svg"
                alt=""
                src="https://www.brugtbilsmodulet.dk/Images/santander2.svg"
              />
              <a
                class="cursor-pointer button button--tertiary"
                ng-click="showSantanderClick()"
                bbmclickevent="Se finansieringsmuligheder (Santander)"
                ng-modelid="1244"
              >
                <span>Se finansiering</span
                ><i>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M9 5l7 7-7 7"
                    ></path>
                  </svg>
                </i>
              </a>
              <p class="text-gray-400">
                Finansiering på lån uden pant via Santander Consumer Bank.
                Etabl.omk. samt mdl. kontogebyr er medtaget i alle
                beregninger. Fortrydelsesret 14 dage.
              </p>
            </div>
            <!-- end ngIf: settings.santanderPartnerId != '' -->

            <!-- BilInfo Finans -->
            <!-- ngIf: !settings.hideFinance && finance != null -->
          </div>
        </div>
      </div>
    </div>
  </div>
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
    this.carMileage = [];
    this.carGearType = [];

    this.el.cars.innerHTML = "";
  }

  get getMake() {
    return this.carMake;
  }

  set getMake(value) {
    let tempList = [];

    if (filterList && filterList.length > 0) {
      filterList.map((car) => {
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

    if (filterList && filterList.length > 0) {
      filterList.map((car) => {
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

    if (filterList && filterList.length > 0) {
      filterList.map((car) => {
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

    if (filterList && filterList.length > 0) {
      filterList.map((car) => {
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
  get getMileage() {
    return this.carMileage;
  }

  set getMileage(value) {
    // let tempList = [];
    // if (filterList && filterList.length > 0) {
    //   filterList.map((car) => {
    //     Object.keys(car)
    //       .filter((key) => key === "Mileage")
    //       .reduce((cur, key) => {
    //         return tempList.push(car[key]);
    //       }, {});
    //   });
    //   console.log(tempList);
    //   const lowestNo = Math.min(...tempList);
    //   const highestNo = Math.max(...tempList);
    //   console.log(lowestNo, highestNo);
    //   this.carMileage = tempList;
    //   new FiltersUI(
    //     document.querySelector("#car-filters .mileage"),
    //     "mileage"
    //   ).populateFilter([...new Set(this.carMileage)], "mileage");
    // } else {
    //   this.getCarsFeed().then((cars) => {
    //     cars.map((car) => {
    //       Object.keys(car)
    //         .filter((key) => key === "Mileage")
    //         .reduce((cur, key) => {
    //           return this.carMileage.push(car[key]);
    //         }, {});
    //     });
    //     new FiltersUI(
    //       document.querySelector("#car-filters .mileage"),
    //       "mileage"
    //     ).populateFilter([...new Set(this.carMileage)], "mileage");
    //   });
    // }
  }

  get getGearType() {
    return this.carGearType;
  }

  set getGearType(value) {
    let tempList = [];

    if (filterList && filterList.length > 0) {
      filterList.map((car) => {
        Object.keys(car)
          .filter((key) => key === "GearType")
          .reduce((cur, key) => {
            return tempList.push(car[key]);
          }, {});
      });

      this.carGearType = tempList;

      new FiltersUI(
        document.querySelector("#car-filters .geartype"),
        "geartype"
      ).populateFilter([...new Set(this.carGearType)], "geartype");
    } else {
      this.getCarsFeed().then((cars) => {
        cars.map((car) => {
          Object.keys(car)
            .filter((key) => key === "GearType")
            .reduce((cur, key) => {
              return this.carGearType.push(car[key]);
            }, {});
        });

        new FiltersUI(
          document.querySelector("#car-filters .geartype"),
          "geartype"
        ).populateFilter([...new Set(this.carGearType)], "geartype");
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
      case "mileage":
        carFilters.mileage = lort;
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
    filters.map((filter) => {
      if (/^\d+$/.test(filter.value)) {
        filter.value = parseInt(filter.value);
      }
    });

    const result = filterData(carList, filters);

    result.sort((a, b) => {
      return a.Price - b.Price;
    });

    result.map((car, index) => {
      this.article(index);
    });
    result.map((car, index) => {
      new Car(document.getElementById(`car-${index}`), car);
    });

    filterList = result;

    document.querySelectorAll(".car-count").forEach((el) => {
      el.innerHTML = result.length;
    });

    // localStorage.setItem("filtered-car-list", JSON.stringify(result));

    return result;
  }

  // filterByMake(make) {
  //   this.getCarsFeed().then((cars) => {
  //     const filtedList = cars.filter((car) => car.Make === make);

  //     filtedList.map((car, index) => {
  //       this.article(index);
  //     });
  //     filtedList.map((car, index) => {
  //       new Car(document.getElementById(`car-${index}`), car);
  //     });
  //   });
  // }

  resetFilters() {
    filterList = carList;
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

      new CarDetails(document.querySelector("#car-details"), car[0]);

      return car;
    });
  }

  getCars() {
    this.getCarsFeed().then((cars) => {
      document.querySelector("section#cars").innerHTML = "";

      cars.sort((a, b) => {
        return a.Price - b.Price;
      });

      cars.map((car, index) => {
        this.article(index);
      });
      cars.map((car, index) => {
        new Car(document.getElementById(`car-${index}`), car);
      });
      carList = cars;

      document.querySelectorAll(".car-count").forEach((el) => {
        el.innerHTML = cars.length;
      });

      return cars;
    });
  }

  getCarsFeed = async () => {
    const response = await fetch(
      "https://kring-nielsen.managed.supertest.dk/wp-json/getcars/all"
    );

    const cars = await response.json();
    return cars.Vehicles;
  };
}
