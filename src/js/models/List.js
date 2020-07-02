import uniqid from 'uniqid';

export default class List {
  constructor() {
    this.items = [];
  }
  addItem (count, unit, ingredient) {
    const item = {
      id: uniqid(),
      count,
      unit,
      ingredient
    }
    this.items.push(item);
    return item;
  }

  
