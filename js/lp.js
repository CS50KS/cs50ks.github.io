// LANDING PAGE NAVIGATION OBJECT CONSTRUCTOR

function LPNavigation(id) {
  
  // LPN Scope
  var LPN = this;
  
  // LPN Properties
  this.id = id;
  this.container = document.getElementById(this.id);
  this.links = this.container.querySelectorAll("a[href^='#']");
  this.sections = getSectionsByID();
  
  // LPN Methods
  this.run = function() {
    var screenHeight;
    window.addEventListener("scroll", function() {
      screenHeight = document.documentElement.clientHeight;
      for (let i = 0, l = LPN.sections.length; i < l; i++) {
        var sectionID = LPN.sections[i].getAttribute("id");
        var sectionHeight = LPN.sections[i].offsetHeight;
        var sectionPosition = LPN.sections[i].getBoundingClientRect().bottom;
        var link = LPN.container.querySelector("a[href='#" + sectionID + "']");
        if ((sectionPosition > screenHeight / 2) && (sectionPosition < screenHeight / 2 + sectionHeight)) {
          if (!link.classList.contains("navigation__link--current")) link.classList.add("navigation__link--current");
        } else {
          if (link.classList.contains("navigation__link--current")) link.classList.remove("navigation__link--current");
        };
      };
    });
  }
  
  // LPN Functions
  function getSectionsByID() {
    var array = [];
    for (let i = 0, l = LPN.links.length; i < l; i++) {
      var str = LPN.links[i].getAttribute("href").substring(1);
      array[i] = document.getElementById(str);
    }
    return array;
  }
  
}