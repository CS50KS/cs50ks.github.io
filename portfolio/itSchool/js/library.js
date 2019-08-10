// ANIME TEXT FOR HERO SECTION

class AnimeText {
  
  constructor(container) {
    
    this.container = container;
    this.field = this.container.querySelector(".animetext__field");
    this.content = Array
      .from(this.container.querySelectorAll(".animetext__content li"))
      .map(li => li.textContent);
    
  }
  
  animeText() {
    
    const scope = this;
    const wrapper = this.field.closest("p");
    let text = "";
    let direction = "forward";
    let str = 0;
    
    setInterval(() => {
      if (wrapper.offsetHeight > 0) {
        changeText();
        printText();
        changeStr();
        changeDirection();
      }
    }, 100);
    
    function printText() {
      scope.field.textContent = text + "|";
    }
    
    function changeDirection() {
      if (direction === "forward" && text.length === scope.content[str].length) direction = "back";
      if (direction === "back" && text.length === 0) direction = "forward";
    }
    
    function changeStr() {
      if (direction === "back" && text.length === 0) str++;
      if (str === scope.content.length) str = 0;
    }
    
    function changeText() {
      if (direction === "forward") {
        text += scope.content[str][text.length];
      } else {
        text = text.split("");
        text.pop();
        text = text.join("");
      };
    }
    
  }
  
}

function iniAnimeText() {
  
  const containers = Array.from(document.querySelectorAll(".animetext"));
  containers.forEach(container => {
    new AnimeText(container).animeText();
  });
  
}

// LANDING PAGE NAVIGATION

class LPNavigation {
  
  constructor(id) {
    this.id = id || "lp-navigation";
    this.navContainer = document.getElementById(this.id);
    this.navList = this.navContainer.querySelector(".navigation__list");
    this.navLinks = this.getNavLinks();
    this.sections = this.getSections();
  }
  
  ini() {
    
    let activeLink = getActiveLink(this.navList);
    let hash = getHash();
    if (!hash) hash = this.navLinks[0].getAttribute("href");
    if (activeLink) {
      if (activeLink.getAttribute("href") != hash) {
        clearActiveLinks(this.navList);
        setActiveLink(this.navList, hash);
      }
    } else {
      setActiveLink(this.navList, hash);
    }
    this.navList.addEventListener("click", (evt) => {
      let hash = evt.target.getAttribute("href");
      clearActiveLinks(this.navList);
      setActiveLink(this.navList, hash);
    });
    window.addEventListener("scroll", () => {
      this.sections.forEach(section => {
        let rect = section.getBoundingClientRect();
        let linkHash = getActiveLink(this.navList).getAttribute("href");
        let sectionHash = "#" + section.getAttribute("id");
        if (rect.top <= 0 && rect.bottom > 0 && linkHash != sectionHash) {
          // window.location.hash = sectionHash;
          clearActiveLinks(this.navList);
          setActiveLink(this.navList, sectionHash);
        }
      });
    });
    
    function getHash() {
      return window.location.hash;
    }
    function getActiveLink(list) {
      return list.querySelector(".navigation__link--active");
    }
    function setActiveLink(list, hash) {
      list.querySelector(`a[href="${hash}"]`).classList.add("navigation__link--active");
    }
    function clearActiveLinks(list) {
      let activeLinks = Array.from(list.querySelectorAll(".navigation__link--active"));
      activeLinks.forEach(link => {
        link.classList.remove("navigation__link--active");
      });
    }
  }
  getNavLinks() {
    return Array.from(this.navList.querySelectorAll("a.navigation__link[href^='#']"));
  }
  getSections() {
    const sections = [];
    this.navLinks.forEach(link => {
      let id = link.getAttribute("href").substring(1);
      let section = document.getElementById(id);
      sections.push(section);
    });
    return sections;
  }
  
}

// STICKY CONTAINER

class StickyContainer {
  
  constructor(id) {
    
    this.id = id;
    this.container = document.getElementById(this.id);
    this.containerWidth = this.container.offsetWidth;
    this.containerHeight = this.container.offsetHeight;
    this.spaceTop = this.container.offsetTop;
    this.breakpoint = this.containerHeight + this.spaceTop;
    
  }
  
  ini() {
    window.addEventListener("scroll", () => {
      if (this.container.classList.contains("sticky") && (window.pageYOffset < this.breakpoint)) {
        this.container.classList.remove("sticky");
      } else if (!this.container.classList.contains("sticky") && (window.pageYOffset >= this.breakpoint)) {
        this.container.classList.add("sticky");
      }
    });
  }
  
}