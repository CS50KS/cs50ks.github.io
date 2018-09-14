// TOUPBUTTON OBJECT CONSTRUCTOR

function ToUpButton(id) {
  
  // ToUpButton Scope
  var ToUpButton = this;
  
  // ToUpButton Variables
  var viewportHeight = document.documentElement.clientHeight;
  
  
  // ToUpButton Properties
  this.id = id || "toup__button";
  this.button = document.getElementById(this.id);
  this.width = this.button.offsetWidth;
  this.height = this.button.offsetHeight;
  
  // ToUpButton Methods
  
  this.showButton = function() {
    this.button.classList.remove("hidden");
  };
  
  this.hiddenButton = function() {
    this.button.classList.add("hidden");
  };
  
  this.backToUp = function() {
    var scrollHeight = window.pageYOffset;
    if (scrollHeight > 10) {
      scrollHeight -= 10;
      window.scrollTo(0, scrollHeight);
      setTimeout(ToUpButton.backToUp, 1);
    } else {
      window.scrollTo(0, 0);
    }
  };
  
  this.ini = function() {
    if (window.pageYOffset >= viewportHeight && this.button.classList.contains("hidden")) {
      ToUpButton.showButton();
    } else if (window.pageYOffset < viewportHeight && !this.button.classList.contains("hidden")) {
      ToUpButton.hiddenButton();
    }
  };
  
  
  this.run = function() {
    
    window.addEventListener("scroll", function() {
      ToUpButton.ini();
    });
    
    ToUpButton.button.addEventListener("click", function(event) {
      event = event || window.event;
      event.preventDefault();
      ToUpButton.backToUp();
    });
    
  };
  
  // ToUpButton Initialisation
  
  this.ini();
  
} 