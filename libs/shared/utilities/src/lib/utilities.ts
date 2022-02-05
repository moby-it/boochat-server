interface Array<T> {
  filterByUniqueValues<T, K>(property: keyof T): K[];
}

Array.prototype.filterByUniqueValues = function <T, K>(property: keyof T): K[] {
  if (property) {
    const mappedArray = this.map(v => v[property]);
    return Array.from(new Set(mappedArray)) as K[];
  } else {
    return Array.from(new Set(this)) as K[];
  }
};
