(function() {
  
  var pageHeader = document.querySelector(".page_header");
  var pageHeaderHeight = pageHeader.getBoundingClientRect().bottom + window.pageYOffset;
  
  window.addEventListener("scroll", function() {
    
    if (pageHeader.classList.contains("page_header-sticky") && (window.pageYOffset < pageHeaderHeight)) {
        
      pageHeader.classList.remove("page_header-sticky");
        
    } else if (window.pageYOffset > pageHeaderHeight) {
        
      pageHeader.classList.add("page_header-sticky");
        
    }
    
  }, false);
  
})();