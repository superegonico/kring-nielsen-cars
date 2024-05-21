import { Cars } from "./car";
import { filterData, SearchType } from "filter-data";

export class Filter {
  constructor() {
    this.filter = [];
  }
  get filterObj() {
    return this.filter;
  }
  set filterObj(value) {
    console.log(value);
    this.filter.push(value);
    // Object.assign(this.filter, value);

    // this.filter = [{ key: ["Make"], value: value, type: SearchType.LK }];

    new Cars().filterBy(this.filter);
  }
  get filterSearch() {
    return this.filter;
  }
  set filterSearch(value) {
    this.filter = [
      { key: ["Make", "Model", "Variant"], value: value, type: SearchType.LK },
    ];

    new Cars().filterBy(this.filter);
    localStorage.setItem("filtered-car-list", new Cars().filterBy(this.filter));
  }
}

export class FiltersUI {
  constructor(root, theFilter) {
    root.innerHTML = FiltersUI.getHTML(theFilter);

    this.el = {
      filter: document.getElementById(`${theFilter}`),
    };
  }

  populateFilter(arr, filter) {
    const options = arr.sort().map((filter) => {
      // let value = null;
      // if (Array.isArray(filter)) {
      //   value = filter[0].toLowerCase();
      // } else {
      //   value = filter.toLowerCase();
      // }
      const value = filter;
      return `<option value="${value}">${filter}</option>`;
    });
    this.el.filter.innerHTML = options;
  }

  static getHTML(theFilter) {
    return `
    <select name="${theFilter}" id="${theFilter}">
      <option value="">Vælg</option>
    </select>`;
  }
}
