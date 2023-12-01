export const header = () => {
    const header = document.querySelector('.main-header__overview');
    const navigation = document.querySelector('.main-header__navigation');
    let lastScrollY = window.scrollY;

    const toggleHeaderClass = () => {
        const currentScrollY = window.scrollY;
        const isScrollingDown = currentScrollY > lastScrollY;

        header.classList.toggle('expanded', currentScrollY !== 0);
        navigation.classList.toggle('collapsed', isScrollingDown);

        lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', toggleHeaderClass);
};
