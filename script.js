const COOKIE_ANIMATE_PROPERTIES = [{top: '100%'},{top: '87%'}];
const TEXT_ANIMATE_DOWN_POSITION = [{right: '0'},{right: '-50%'}];
const TEXT_ANIMATE_DOWN_OPACITY = [{opacity: '1'},{opacity: '0'}];
const TEXT_ANIMATE_UP_POSITION = [{right:'-50%'},{right: '0'}];                 //Массивы для анимации
const TEXT_ANIMATE_UP_OPACITY = [{opacity: '0'},{opacity: '1'}];
const IMAGE_ANIMATE_DOWN_POSITION = [{left: '-104%'},{left: '-35.5%'}];
const IMAGE_ANIMATE_DOWN_WIDTH = [{width: '0'},{width: '996px'}];
const IMAGE_ANIMATE_DOWN_HEIGHT = [{height: '0'},{height: '497px'}];
const IMAGE_ANIMATE_UP_POSITION = [{left: '-35.5%'},{left: '-104%'}];
const IMAGE_ANIMATE_UP_WIDTH = [{width: '996px'},{width: '0'}];
const IMAGE_ANIMATE_UP_HEIGHT = [{height: '497px'},{height: '0'}];
const formElements = document.querySelector('.feedback__form').elements;
const sendFormButton = document.querySelector('.form__button');
const text = document.querySelector('.mission__text');
const image = document.querySelector('.mission__image');
let textAnimateBan;

showCookie();

//ограничение на ввод пустой формы
sendFormButton.onclick = function(event) {
  for (let i = 0, element; element = formElements[i++];) {
      if ((element.tagName === "INPUT" || element.tagName === "TEXTAREA") && element.value === "") {
          element.style.border = "2px solid #FF0000";
        }
        else {
          element.style.border = "1px solid #5C5C5C";
        }
  }
  event.preventDefault();
}

//анимация показа уведомления о cookie
function showCookie() {
  const cookieElement = document.createElement('div');
  cookieElement.className = "cookie";
  cookieElement.innerHTML = '<p class="cookie__description">' +
  'We use cookie to improve your experience on our site. By using our site you consent cookies.</p>' +
  '<button class="cookie__submit">OK</button>';
  document.body.prepend(cookieElement);
  cookieElement.animate(COOKIE_ANIMATE_PROPERTIES, {
    duration: 2000
  });
  cookieElement.style.top = "87%";
  document.querySelector('.cookie__submit').onclick = function() {
    cookieElement.style.display = "none";
  }
}

//Анимация скролла на блоке "our mission and vision"
window.addEventListener('scroll', function(event) {
  if (document.body.clientWidth > 500) {
    if (pageYOffset >= 1450) {
      if (textAnimateBan == 0) {
        return;
      }
      text.animate(TEXT_ANIMATE_DOWN_POSITION, {
        duration: 2000
      });
      text.style.right = "-50%";
      text.animate(TEXT_ANIMATE_DOWN_OPACITY, {
        duration: 2000
      });
      text.style.opacity = "0";
      image.animate(IMAGE_ANIMATE_DOWN_POSITION, {
        duration: 2000
      });
      image.style.left = "-35.5%";
      image.animate(IMAGE_ANIMATE_DOWN_WIDTH, {
        duration: 2000
      });
      image.style.width = "996px";
      image.animate(IMAGE_ANIMATE_DOWN_HEIGHT, {
        duration: 2000
      });
      image.style.height = "497px";
      textAnimateBan = 0;
    }
    if (pageYOffset < 1450) {
      if (textAnimateBan == 1) {
        return;
      }
      if (text.style.right == "0") {
        return;
      }
      text.animate(TEXT_ANIMATE_UP_POSITION, {
        duration: 2000
      });
      text.style.right = "0";
      text.animate(TEXT_ANIMATE_UP_OPACITY, {
        duration: 2000
      });
      text.style.opacity = "1";
      image.animate(IMAGE_ANIMATE_UP_POSITION, {
        duration: 2000
      });
      image.style.left = "-104%";
      image.animate(IMAGE_ANIMATE_UP_WIDTH, {
        duration: 2000
      });
      image.style.width = "0";
      image.animate(IMAGE_ANIMATE_UP_HEIGHT, {
        duration: 2000
      });
      image.style.height = "0";
      textAnimateBan = 1;
    }
  }
  else {
    return;
  }
});
