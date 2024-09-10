document.addEventListener('DOMContentLoaded', function () {
    const triggerMenu = document.querySelector('.header__mob-triger');
    const mainMenu = document.querySelector('.header-nav');
    const mainMenuClose = document.querySelector('.header-nav__close');

    if (triggerMenu && mainMenu && mainMenuClose) {
        triggerMenu.addEventListener('click', function (event) {
            mainMenu.classList.add('open');
        })

        document.addEventListener('click', function (event) {
            if(!event.target.closest('.header-nav') && !event.target.closest('.header__mob-triger')) {
                mainMenu.classList.remove('open');
            }
        })

        mainMenuClose.addEventListener('click', function () {
            mainMenu.classList.remove('open');
        })
    }

    const swiperHero = new Swiper('.hero__swiper', {
        // loop: true,
        slidesPerView: 1,
        spaceBetween: 20,

        breakpoints: {
            320: {
              slidesPerView: 1,
            },
            992: {
                slidesPerView: 2,
            }
        }
    });
})