import { Cars } from "./car";

export class Filter {
  constructor() {
    this.filter = {};
  }
  get filterObj() {
    return this.filter;
  }
  set filterObj(value) {
    Object.assign(this.filter, value);
    console.log(this.filter);
    new Cars().filterBy(this.filter);
  }
}

export class FiltersUI {
  constructor(root) {
    root.innerHTML = FiltersUI.getHTML();

    this.el = {
      filtersMake: document.getElementById("filters-make"),
      filtersModel: document.getElementById("filters-model"),
      filtersType: document.getElementById("filters-type"),
      filtersPropellant: document.getElementById("filters-propellant"),
    };
  }

  populateFilter(arr, filter) {
    const options = arr.map((filter) => {
      const value = filter.toLowerCase();
      return `<option value="${value}">${filter}</option>`;
    });
    switch (filter) {
      case "make":
        this.el.filtersMake.innerHTML = options;
        break;
      case "model":
        this.el.filtersModel.innerHTML = options;
        break;
      case "type":
        this.el.filtersType.innerHTML = options;
        break;
      case "propellant":
        this.el.filtersPropellant.innerHTML = options;
        break;
      default:
        break;
    }
  }

  static getHTML() {
    return `
    <select name="cars" id="filters-make">
      <option value="">Vælg fabrikant</option>
    </select>
  <select name="cars" id="filters-model">
    <option value="">Vælg model</option>
  </select>
  <select name="cars" id="filters-type">
    <option value="">Vælg type</option>
  </select>
  <select name="cars" id="filters-propellant">
    <option value="">Vælg brændstof</option>
  </select>`;
  }
}
