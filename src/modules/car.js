export default class Car {
  constructor(root) {
    root.innerHTML = Car.getHTML();

    this.el = {
      makeModel: root.querySelector(".car__make-model"),
      variant: root.querySelector(".car__variant"),
      image: root.querySelector(".car__image"),
      registration: root.querySelector(".car__reg"),
      mileage: root.querySelector(".car__milage"),
      propellant: root.querySelector(".car__propellant"),
      color: root.querySelector(".car__color"),
      price: root.querySelector(".car__price"),
    };
  }

  static getHTML() {
    return `<article class="car pt-8 pb-4 shadow-lg bg-white">
    <div class="heading text-center">
        <h3 class="car__make-model text-[28px] leading-6 font-semibold">Mercedes C250</h3>
        <p class="car__variant text-[16px] leading-6 mt-2">2.0 AMG Line Stc. Aut.</p>
    </div>
    <div class="image mt-6">
        <img class="car__image w-full" src=""
            alt="">
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
    </div>
</article>`;
  }
}
