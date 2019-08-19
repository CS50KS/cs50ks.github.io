// MY PRODUCT LIST VIEW

"use strict"

class MPLView {
  
  // CONSTRUCTOR
  
  constructor(id) {
    
    this.id = id;
    this.container = document.getElementById(id);
    this.filters = this.container.getElementsByClassName("productlist__filters")[0];
    this.filtersForm = this.filters.querySelector("[name='productlist-filters']");
    this.filtersWrapper = this.filtersForm.querySelector(".wrapper");
    this.filtersInfo = this.filtersForm.querySelector("[name='info']");
    this.filtersPrice = this.filtersForm.querySelector("[name='price']");
    this.clearFiltersBtn = this.filtersInfo.querySelector("[name='clear']");
    this.screen = this.container.getElementsByClassName("productlist__screen")[0];
    this.viewsForm = this.screen.querySelector("[name='productlist-views']");
    this.viewsSorting = this.viewsForm.querySelector("[name='productlist-sorting']");
    this.viewsPag = this.viewsForm.querySelector("[name='productlist-pagination']");
    this.viewsPresentation = this.viewsForm.querySelector("[name='productlist-presentation']");
    this.viewBox = this.screen.querySelector(".productlist__viewbox");
    this.viewList = this.viewBox.querySelector(".productlist__list");
    this.pagination = this.screen.querySelector(".productlist__pagination");
    this.templates = Array.from(this.container.querySelectorAll(".productlist__tpl"));
    
  }
  
  // --ACCESSORS
  
  get presentationWay() {
    return this.viewsPresentation.querySelector("[name='presentation']:checked").value;
  }
  
  // --METHODS
  
  getSortingParameter() {
    const parameter = this.viewsSorting.querySelector("[name='sorting']").value;
    return parameter;
  }
  getFilteringOptions() {
    const filters = {};
    Array.from(this.filtersWrapper.querySelectorAll("fieldset"))
      .forEach(fieldset => {
        const list = fieldset.querySelectorAll("input[type='checkbox']:checked");
        if (list.length) {
          filters[list[0].name] = Array.from(list).map(el => el.value);
        }
      });
    filters.price = [];
    filters.price.push(this.filtersPrice.querySelector("[name='price-from']").value);
    filters.price.push(this.filtersPrice.querySelector("[name='price-to']").value);
    return filters;
  }
  renderProductList(productlist) {
    const SCOPE = this;
    const wrap = wrapProductToMarkup(this.product_type)
    this.viewList.innerHTML = null;
    productlist.forEach(product => {
      this.viewList.appendChild(wrap(product));
    });
    
    function wrapProductToMarkup(product_type) {
      let template, i = 0, len = SCOPE.templates.length;
      while (!template && i < len) {
        template = (SCOPE.templates[i].classList.contains(`productlist__tpl--${SCOPE.product_type}`)) ? SCOPE.templates[i] : undefined;
        i++;
      };
      return function(product) {
        const tpl = template.content.querySelector(".productlist__item");
        const markup = tpl.cloneNode(true);
        markup.querySelector(".product__link").href = product.product;
        markup.querySelector(".product__photo").src = product.photo;
        markup.querySelector(".product__photo").alt = `Фото ${product.type} ${product.brand} ${product.model}`;
        markup.querySelector(".product__title .product__link").href = product.product;
        markup.querySelector(".product__title .product__link").textContent = `${product.type} ${product.brand} ${product.model}`;
        markup.querySelector(".product__price").textContent = product.price;
        markup.querySelector(".product__class").textContent = `Класс: ${product.class}`;
        markup.querySelector(".product__technology").textContent = `Печать: ${product.palette} ${product.technology}`;
        return markup;
      }
    }
  }
  renderFiltersForForm(filters) {
    const SCOPE = this;
    this.filtersWrapper.innerHTML = null;
    filters.forEach(filter => {
      const fieldset = document.createElement("fieldset");
      const legend = document.createElement("legend");
      legend.innerHTML = filter.title + ": ";
      fieldset.appendChild(legend);
      fillFieldset(fieldset)(filter);
      this.filtersWrapper.appendChild(fieldset);
    });
    
    function fillFieldset(container) {
      let template, i = 0, len = SCOPE.templates.length;
      while (!template && i < len) {
        template = (SCOPE.templates[i].classList.contains("productlist__tpl--checkbox")) ? SCOPE.templates[i] : undefined;
        i++;
      }
      return function(filter) {
        const tpl = template.content.querySelector("label");
        filter.values.forEach(value => {
          const checkbox = tpl.cloneNode(true);
          checkbox.querySelector("[type='checkbox']").name = filter.category;
          checkbox.querySelector("[type='checkbox']").value = value;
          checkbox.querySelector("span").textContent = value;
          container.appendChild(checkbox);
        });
      };
    }
  }
  renderPagination(length, number) {
    const numPages = (length % number == 0) ? parseInt(length / number) : parseInt(length / number) + 1;
    this.pagination.innerHTML = null;
    this.pagination.appendChild(createFirstLastElements("first"));
    for (let i = 0; i < numPages; i++) {
      const el = document.createElement("a");
      el.href = "#";
      el.textContent = i + 1;
      el.dataset.start = i * number;
      if (i == numPages - 1) {
        el.dataset.end = "";
      } else {
        el.dataset.end = (i + 1) * number;
      };
      this.pagination.appendChild(el);
    };
    this.pagination.appendChild(createFirstLastElements("last"));
    
    function createFirstLastElements(str) {
      const el = document.createElement("a");
      el.href = "#";
      if (str == "first") {
        el.textContent = "<<";
        el.dataset.start = 0;
        el.dataset.end = number;
      } else if (str == "last") {
        el.textContent = ">>";
        el.dataset.start = (numPages - 1) * number;
        el.dataset.end = "";
      };
      return el;
    }
  }
  changeWayPresentation() {
    Array.from(this.viewsPresentation.querySelectorAll("[name='presentation']"))
      .map(input => input.value)
      .forEach(value => {
        this.viewList.classList.remove(`productlist__list--${value}`);
      });
    this.viewList.classList.add(`productlist__list--${this.presentationWay}`);
  }
  publicInfoTotal(value) {
    const info = this.filtersInfo.querySelector(".info__total span");
    info.innerHTML = null;
    info.textContent = value;
  }
  publicInfoSelected(value) {
    const info = this.filtersInfo.querySelector(".info__selected span");
    info.innerHTML = null;
    info.textContent = value;
  }
  clearAllFilters() {
    Array.from(this.filtersWrapper.querySelectorAll("[type='checkbox']:checked"))
    .forEach(checkbox => checkbox.checked = false);
    const priceFrom = this.filtersPrice.querySelector("[name='price-from']");
    const priceTo = this.filtersPrice.querySelector("[name='price-to']");
    priceFrom.value = priceFrom.min;
    priceTo.value = priceTo.max;
    const evt = new Event("change");
    this.filtersForm.dispatchEvent(evt);
  }
  setPriceFilter(min, max) {
    const priceFrom = this.filtersPrice.querySelector("[name='price-from']");
    const priceTo = this.filtersPrice.querySelector("[name='price-to']");
    [priceFrom, priceTo].forEach(el => {
      el.min = min;
      el.max = max;
    });
    priceFrom.value = priceFrom.min;
    priceTo.value = priceTo.max;
    priceFrom.addEventListener("change", () => {
      if (parseInt(priceFrom.value) > priceFrom.max) priceFrom.value = priceFrom.max;
      priceTo.min = priceFrom.value;
    });
    priceTo.addEventListener("change", () => {
      if (parseInt(priceTo.value) < priceTo.min) priceTo.value = priceTo.min;
      priceFrom.max = priceTo.value;
    });
  }
  getNumberProductsOnPage() {
    return parseInt(this.viewsPag.querySelector("[name='pagination']").value);
  }
  getProductListForPage(productlist) {
    const len = productlist.length, num = this.getNumberProductsOnPage();
    if (len <= num) {
      this.pagination.innerHTML = null;
      return productlist;
    };
    this.renderPagination(len, num);
    return productlist.slice(0, num);
  }
  
}

const view = new MPLView("shop");