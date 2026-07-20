document.addEventListener("DOMContentLoaded", () => {

    new Swiper(".swiper", {
        loop: true,

        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },

        keyboard: {
            enabled: true,
        },

        speed: 700,
    });

});