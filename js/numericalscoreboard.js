// NUMERICAL SCOREBOARD OBJECT CONSTRUCTOR

function NumericalScoreboard(selector) {
  
  // SCOREBOARD SCOPE
  var scoreboard = this;
  
  // SCOREBOARD VARIABLES
  // SCOREBOARD PROPERTIES
  this.id = selector;
  this.container = document.querySelector(selector);
  this.elements = this.container.querySelectorAll(selector + "_number");
  this.size = this.elements.length;
  this.values = getNumericalValues();
  
  // SCOREBOARD METHODS
  this.reset = function() {
    for (let i = 0; i < scoreboard.size; i++) {
      scoreboard.elements[i].textContent = "0";
    }
  }
  this.animate = function() {
    for (let i = 0; i < scoreboard.size; i++) {
      showAnimateValue(i);
    }
  }
  this.run = function() {
    var screenHeight = document.documentElement.clientHeight;
    var counter = true;
    scoreboard.reset();
    window.addEventListener("scroll", function() {
      if ((counter) && (scoreboard.container.getBoundingClientRect().top < screenHeight / 2)) {
        counter = false;
        scoreboard.animate();
      }
    });
  }
  
  // SCOREBOARD FUNCTIONS
  function getNumericalValues() {
    var array = [];
    for (let i = 0; i < scoreboard.size; i++) {
      array[i] = parseInt(scoreboard.elements[i].textContent);
    };
    return array;
  }
  
  function showAnimateValue(index) {
    var element = scoreboard.elements[index];
    var value = scoreboard.values[index];
    var step = parseInt(value / 100);
    if (step == 0) step = 1;
    function increaseNumber() {
      var number = parseInt(element.textContent);
      if (number + step < value) {
        number += step;
        element.textContent = number;
        setTimeout(increaseNumber, 1);
      } else {
        number = value;
        element.textContent = number;
      }
    }
    return increaseNumber();
  }
  
  // SCOREBOARD INI
  
  
}