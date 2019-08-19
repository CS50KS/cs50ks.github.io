// MY PRODUCT LIST -- CONTROLLER

"use strict"

class MyProductList {
  
  // CONSTRUCTOR
  
  constructor(model, view) {
    
    this.model = model;
    this.view = view;
    this.dispatcher = this.view.container;
    this.model.dispatcher = this.dispatcher;
    
    this.dispatcher.addEventListener("datadounloaded", () => {
      this.view.renderFiltersForForm(this.model.getFiltersForRendering(this.filter_categories, this.filter_titles));
      this.model.sortProductList(this.view.getSortingParameter());
      this.view.renderProductList(this.view.getProductListForPage(this.model.productlist));
      this.view.publicInfoTotal(this.model.getProductsLenght());
      this.view.publicInfoSelected(this.model.getProductListLength());
      this.view.setPriceFilter(this.model.getMinPrice(), this.model.getMaxPrice());
    });
    this.view.viewsPresentation.addEventListener("change", () => {
      this.view.changeWayPresentation();
    });
    this.view.viewsSorting.addEventListener("change", () => {
      this.model.sortProductList(this.view.getSortingParameter());
      this.view.renderProductList(this.view.getProductListForPage(this.model.productlist));
    });
    this.view.viewsPag.addEventListener("change", () => {
      this.view.renderProductList(this.view.getProductListForPage(this.model.productlist));
    });
    this.view.filtersForm.addEventListener("change", () => {
      this.model.filterProductList(this.view.getFilteringOptions());
      this.model.sortProductList(this.view.getSortingParameter());
      this.view.renderProductList(this.view.getProductListForPage(this.model.productlist));
      this.view.publicInfoSelected(this.model.getProductListLength());
    });
    this.view.pagination.addEventListener("click", (evt) => {
      evt.preventDefault();
      const start = evt.target.dataset.start;
      const end = evt.target.dataset.end;
      if (end) {
        this.view.renderProductList(this.model.productlist.slice(start, end));
      } else {
        this.view.renderProductList(this.model.productlist.slice(start));
      };
    });
    this.view.clearFiltersBtn.addEventListener("click", () => {
      this.view.clearAllFilters();
    });
    
  }
  
  // --ACCESSORS
  
  get filter_categories() {
    return this._filter_categories;
  }
  set filter_categories(values) {
    if (Array.isArray(values)) {
      this._filter_categories = values;
    } else {
      this._filter_categories = values.split(" ");
    }
  }
  get filter_titles() {
    return this._filter_titles;
  }
  set filter_titles(values) {
    if (Array.isArray(values)) {
      this._filter_titles = values;
    } else {
      this._filter_titles = values.split(" ");
    }
  }
  
  // --METHODS
  
  ini(presets) {
    // set properties
    for (let property in presets) {
      this[property] = presets[property];
    };
    // ini properties
    this.view.product_type = this.product_type;
    // run methods
    this.model.downloadProductsFromServer(this.getDataURL());
  }
  getDataURL () {
    return `${this.server_url}${this.product_type}s.json`;
  }
  
}

const shop = new MyProductList(model, view);
shop.ini({
  server_url: "https://cs50ks.github.io/other/",
  product_type: "printer",
  filter_categories: ["brand", "type", "class", "technology", "palette", "format"],
  filter_titles: "Производитель Тип Класс Технология Цвет Формат",
});