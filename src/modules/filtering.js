import { Cars } from "./car";

export default class Filter {
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
