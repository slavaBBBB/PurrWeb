const DOTS_MOUSE_OVER_BACKGROUND = [{background: '#ddd'},{background: 'rgb(127, 126, 126)'}];
const DOTS_MOUSE_OUT_BACKGROUND = [{background: 'rgb(127, 126, 126)'},{background: '#ddd'}];

let slider = document.getElementById('slider'),
    sliderItems = document.getElementById('slides'),
    prev = document.getElementById('prev'),
    next = document.getElementById('next');
    sliderButtons = document.querySelector('.slider-buttons'),
    sliderDots = document.querySelector('.slider-dots'),
    dots = document.getElementsByClassName("slider-dots_item");

function slide(items, prev, next) {
  let posInitial,
      slides = items.getElementsByClassName('slide'),
      slidesLength = slides.length,
      slideSize = items.getElementsByClassName('slide')[0].offsetWidth,
      firstSlide = slides[0],
      lastSlide = slides[slidesLength - 1],
      cloneFirst = firstSlide.cloneNode(true),
      cloneLast = lastSlide.cloneNode(true),
      index = 0,
      allowShift = true;

  // клонируем первый и последний слайд
  items.appendChild(cloneFirst);
  items.insertBefore(cloneLast, firstSlide);
  //производим стартовую анимацию точек
  dotsAnimate();

  // обработчик клика на предыдущий. слайд
  prev.onclick = function() {
    if (allowShift == false) { return }
    else {
      setTimeout(function() {
        allowShift = true;
      }, 1000);
      shiftSlide(-1);
    }
  }
  //обработчик клика на след. слайд
  next.onclick = function() {
    if (!allowShift) { return }
    else {
      setTimeout(function() {
        allowShift = true;
      }, 1000);
      shiftSlide(1);
    }
  }
  // обработчик клика на точки
  sliderDots.onclick = function(event) {
    if (allowShift == false) { return }
    else {
      posInitial = items.offsetLeft;
      if (event.target.closest('span')) {
        if (event.target.focused) {
          return;
        }
        for (let i = 0; i < sliderDots.children.length; i++) {
          if (event.target == sliderDots.children[i]) {
            items.animate([{left: posInitial + "px"}, {left: -((i + 1) * slideSize) + "px"}], {
              duration: 1000
            });
            index = i;
            items.style.left = -((i + 1) * slideSize) + "px";
          }
        }
        dotsAnimate();
      }
      allowShift = false;
      setTimeout(function() {
        allowShift = true;
      }, 1000);
    }
  }
  // обработчики наведения на кнопки след. и предыдущ. слайда
  sliderButtons.onmouseover = function(event) {
    if (event.target.closest('a')) {
      event.target.animate([{transform: 'scale(1)'}, {transform: 'scale(.8)'}], {
        duration: 100
      });
      event.target.style.transform = 'scale(.8)';
    }
  }

  sliderButtons.onmouseout = function(event) {
    if (event.target.closest('a')) {
      event.target.animate([{transform: 'scale(.8)'}, {transform: 'scale(1)'}], {
        duration: 100
      });
      event.target.style.transform = 'scale(1)';
    }
  }
  // обработчики наведения на точки
  sliderDots.onmouseover = function(event) {
    if (event.target.closest('span')) {
      if (event.target.focused) {      //.focused назначаем на точку текущего слайда в ф-ции showSlides() ниже
        return;
      }
      event.target.animate(DOTS_MOUSE_OVER_BACKGROUND, {
        duration: 300
      });
      event.target.style.backgroundColor = "rgb(127, 126, 126)";
    }
  }

  //обработчик уведения мыши с точек слайдов (обратный наведению)
  sliderDots.onmouseout = function(event) {
    if (event.target.closest('span')) {
      if (event.target.focused) {
        return;
      }
      event.target.animate(DOTS_MOUSE_OUT_BACKGROUND, {
        duration: 300
      });
      event.target.style.backgroundColor = "#ddd";
    }
  }
  // основная функция прокрутки слайдов
  function shiftSlide(dir) {
      posInitial = items.offsetLeft;
      if (dir == 1) {
        items.animate([{left: posInitial + "px"}, {left: posInitial - slideSize + "px"}], {
          duration: 1000,
          endDelay: 1000
        });
        if (index == slidesLength - 1) {
          items.style.left = -(1 * slideSize) + "px";
          index = 0;
        }
        else {
          items.style.left = (posInitial - slideSize) + "px";
          index++;
        }
      } else if (dir == -1) {
          items.animate([{left: posInitial + "px"}, {left: posInitial + slideSize + "px"}], {
            duration: 1000
          });
          if (index == 0) {
            items.style.left = -(slidesLength * slideSize) + "px";
            index = slidesLength - 1;
          }
          else {
            items.style.left = (posInitial + slideSize) + "px";
            index--;
          }
      }
      allowShift = false;
      dotsAnimate();
  }
  // функция смены анимации точек при перелистывании слайдера
  function dotsAnimate() {
    for (let i = 0; i < dots.length; i++) {
      if (dots[i].style.backgroundColor == "rgb(127, 126, 126)") {
        dots[i].style.backgroundColor = "#ddd";
      }
      if (dots[i].focused) {
        dots[i].focused = false;
      }
    }
    dots[index].focused = true;
    dots[index].style.backgroundColor = "rgb(127, 126, 126)";
  }
}

slide(sliderItems, prev, next);
