export const slider = () => {
    // eslint-disable-next-line no-undef
    const swiper = new Swiper('.swiper', {
        spaceBetween: 150,
        navigation: {
            nextEl: '.slider__right-arrow',
            prevEl: '.slider__left-arrow',
        },
        pagination: {
            el: '.slider__pagination',
        },
    });
};
