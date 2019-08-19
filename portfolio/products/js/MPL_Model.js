// MY PRODUCT LIST MODEL

"use strict"

class MPLModel {
  
  // CONSTRUCTOR
  
  constructor() {
    
    this._productlist = undefined;
    
  }
  
  // --ACCESSORS
  
  get productlist() {
    if (this._productlist == undefined) this._productlist = this.getProducts();
    return this._productlist;
  }
  set productlist(products) {
    this._productlist = products;
  }
  
  // --METHODS
  
  downloadProductsFromServer(url) {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
      if (xhr.readyState == 4 && xhr.status == 200) {
        sessionStorage.setItem("products", xhr.responseText);
        const evt = new Event("datadounloaded");
        this.dispatcher.dispatchEvent(evt);
      } else {
        // error event
      };
    };
    xhr.open("GET", url);
    xhr.send();
  }
  getProducts() {
    return JSON.parse(sessionStorage.getItem("products"));
  }
  getProductsLenght() {
    return this.getProducts().length;
  }
  getProductListLength() {
    return this.productlist.length;
  }
  getMinPrice() {
    const prices = this.productlist.map(product => product.price);
    return Math.min(...prices);
  }
  getMaxPrice() {
    const prices = this.productlist.map(product => product.price);
    return Math.max(...prices);
  }
  getFiltersForRendering(categories, titles) {
    const SCOPE = this;
    const filters = [];
    const len = categories.length;
    for (let i = 0; i < len; i++) {
      const filter = {};
      filter.category = categories[i];
      filter.title = titles[i];
      filter.values = getFiltersForCategory(filter.category);
      filters.push(filter);
    };
    return filters;
    
    function getFiltersForCategory(category) {
      const values = {};
      SCOPE.getProducts().forEach(product => {
        values[product[category]] = true;
      });
      return Object.keys(values).sort();
    }
  }
  getCompareFn(parameter) {
    let property, compare;
    switch (parseInt(parameter)) {
      case 1:
        property = "price";
        compare = (x, y) => x[property] - y[property];
        break;
      case 2:
        property = "price";
        compare = (x, y) => y[property] - x[property];
        break;
      case 4:
        property = "rating";
        compare = (x, y) => y[property] - x[property];
        break;
      default:
        property = "model";
        compare = (a, b) => a[property].localeCompare(b[property]);
    };
    return compare;
  }
  sortProductList(parameter) {
    const compare = this.getCompareFn(parameter);
    this.productlist.sort(compare);
  }
  filterProductList(filters) {
    const SCOPE = this;
    const _products = filterByPrice(this.getProducts());
    if (Object.keys(filters).length == 0) {
      this.productlist = _products;
    } else {
      let inter = [];
      for (let category in filters) {
        inter.push(filterByCategory(category, filters[category]));
      };
      let len = inter.length;
      for (let i = 1; i < len; i++) {
        inter[i] = interSect(inter[i-1], inter[i]);
      };
      this.productlist = inter[len-1];
    };
    
    function filterByPrice(products) {
      products = products.filter(product => {
        return (product.price >= filters.price[0] && product.price <= filters.price[1]);
      });
      delete filters.price;
      return products;
    }
    function filterByValue(category, value) {
      return _products.slice().filter(product => product[category] == value);
    }
    function filterByCategory(category, values) {
      if (values.length == 0) return _products.slice();
      let products = [];
      values.forEach(value => {
        products = products.concat(filterByValue(category, value));
      });
      return products;
    }
    function interSect(alfa, beta) {
      return alfa.filter(el => beta.indexOf(el) != -1);
    }
  }
  
}

const model = new MPLModel();