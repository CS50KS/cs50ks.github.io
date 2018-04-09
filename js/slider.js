(function() {
  
  // 1. Описание базовой функции управления слайдером
  function runSlider(selector) {
    
    var slider = document.querySelector(selector);
    if (!slider) {
      return;
    }
    
    var prevBtn = slider.querySelector(".slider_btn-prev");
    var nextBtn = slider.querySelector(".slider_btn-next");
    prevBtn.addEventListener("click", function() {
      showPrevSlide(selector);
    }, false);
    nextBtn.addEventListener("click", function() {
      showNextSlide(selector);
    }, false);
    
  }
  
  // 2. Описание функции определения текущего слайда
  function getCurrentSlideIndex(selector) {
    
    var sliderSwitch = document.querySelector(selector).querySelectorAll(".slider_switch");
    var switchSize = sliderSwitch.length;
    var currentSlideIndex;
    
    for (var i = 0; i < switchSize; i++) {
      
      if (sliderSwitch[i].checked) {
          
        currentSlideIndex = i;
        return currentSlideIndex;
          
      }
      
    }
    
    currentSlideIndex = 0;
    return currentSlideIndex;
    
  }
  
  // 3. Описание функции демонстрации предыдущего слайда
  function showPrevSlide(selector) {
    
    var sliderSwitch = document.querySelector(selector).querySelectorAll(".slider_switch");
    var switchSize = sliderSwitch.length;
    var currentSlideIndex = getCurrentSlideIndex(selector);
    
    if (currentSlideIndex == 0) {
      
      sliderSwitch[switchSize - 1].checked = true;
      
    } else {
      
      sliderSwitch[currentSlideIndex - 1].checked = true;
      
    }
    
  }
  
  // 4. Описание функции демонстрации следующего слайда
  function showNextSlide(selector) {
    
    var sliderSwitch = document.querySelector(selector).querySelectorAll(".slider_switch");
    var switchSize = sliderSwitch.length;
    var currentSlideIndex = getCurrentSlideIndex(selector);
    
    if (currentSlideIndex == switchSize - 1) {
      
      sliderSwitch[0].checked = true;
      
    } else {
      
      sliderSwitch[currentSlideIndex + 1].checked = true;
      
    }
    
  }
  
  // 5. Запуск базовой функции управления слайдером
  runSlider("#offers_slider");
  
})();