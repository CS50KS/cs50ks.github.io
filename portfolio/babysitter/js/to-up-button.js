// TO UP BUTTON

class ToUpButton {
  
  constructor(id) {
    
    this.id = id || "to-up-btn";
    this.button = document.getElementById(this.id);
    this.screenHeight = this.getScreenHeight();
    
  }
  
  ini() {
    
    window.addEventListener("load", () => {
      this.iniToUpButton();
    });
    window.addEventListener("scroll", () => {
      this.iniToUpButton();
    });
    this.button.addEventListener("click", (evt) => {
      evt.preventDefault();
      this.scrollToUp();
    })
    
  }
  
  getScreenHeight() {
    
    return document.documentElement.clientHeight;
    
  }
  
  getScrollTop() {
    
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return scrollTop;
    
  }
  
  iniToUpButton() {
    if (this.getScrollTop() > this.screenHeight && !this.button.classList.contains("visible")) {
      this.button.classList.add("visible");
      this.button.classList.remove("invisible");
    } else if (this.getScrollTop() <= this.screenHeight && !this.button.classList.contains("invisible")) {
      this.button.classList.add("invisible");
      this.button.classList.remove("visible");
    };
  }
  
  scrollToUp() {
    const step = 50;
    const speed = 5;
    let path = this.getScrollTop();
    let timer = setInterval(() => {
      path = path - step;
      if (path > 0) {
        window.scrollTo(0, path);
      } else {
        window.scrollTo(0, 0);
        clearInterval(timer);
      }
    }, speed);
  }
  
}