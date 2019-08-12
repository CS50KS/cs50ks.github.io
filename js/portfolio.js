// PORTFOLIO JS

class PortfolioNavigation {
  
  constructor() {
    
    this.navContainer = document.querySelector("header .navigation");
    this.navToggle = this.navContainer.querySelector("input[name='navigation-toggle']");
    this.navList = this.navContainer.querySelector(".navigation__list");
    
  }
  
  ini() {
    
    this.navList.addEventListener("click", (evt) => {
      
      if (evt.target.classList.contains("navigation__link")) {
        this.navToggle.checked = false;
      } else {
        evt.preventDefault();
      }
      
    });
    
  }
  
}

new PortfolioNavigation().ini();