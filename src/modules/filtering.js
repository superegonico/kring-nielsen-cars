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
  constructor(root, theFilter) {
    root.innerHTML = FiltersUI.getHTML(theFilter);

    this.el = {
      filter: document.getElementById(`filters-${theFilter}`),
    };
  }

  populateFilter(arr, filter) {
    const options = arr.map((filter) => {
      let value = null;
      if (Array.isArray(filter)) {
        value = filter[0].toLowerCase();
      } else {
        value = filter.toLowerCase();
      }
      return `<option value="${value}">${filter}</option>`;
    });
    this.el.filter.innerHTML = options;
  }

  static getHTML(theFilter) {
    return `
    <select name="cars-${theFilter}" id="filters-${theFilter}">
      <option value="">Vælg</option>
    </select>`;
  }
}
