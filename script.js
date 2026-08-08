const screens = document.querySelectorAll(".screen");
const dots = document.querySelectorAll(".dot");

let currentScreen = 0;

function showScreen(number) {

    screens.forEach(screen => {
        screen.classList.remove("active");
    });

    dots.forEach(dot => {
        dot.classList.remove("active");
    });

    screens[number].classList.add("active");

    if (dots[number]) {
        dots[number].classList.add("active");
    }

    currentScreen = number;

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


/* =========================================
   SCREEN 1
========================================= */

document.getElementById("next1").addEventListener("click", () => {
    showScreen(1);
});


/* =========================================
   SCREEN 2
   YES BUTTON RUNS AWAY
========================================= */

const yes2 = document.getElementById("yes2");

function moveYesButton() {

    const padding = 20;

    const buttonWidth = yes2.offsetWidth;
    const buttonHeight = yes2.offsetHeight;

    const maxX = window.innerWidth - buttonWidth - padding;
    const maxY = window.innerHeight - buttonHeight - padding;

    const x =
        padding +
        Math.random() * Math.max(0, maxX - padding);

    const y =
        padding +
        Math.random() * Math.max(0, maxY - padding);

    yes2.style.position = "fixed";
    yes2.style.left = `${x}px`;
    yes2.style.top = `${y}px`;

    yes2.style.zIndex = "9999";
}


/*
   Desktop:
   The YES button moves when the mouse
   gets close to it.
*/

yes2.addEventListener("mouseenter", moveYesButton);


/*
   Also detect the mouse getting close,
   instead of requiring an actual hover.
*/

document.addEventListener("mousemove", (event) => {

    if (!screens[1].classList.contains("active")) {
        return;
    }

    const rect = yes2.getBoundingClientRect();

    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const distance = Math.sqrt(
        Math.pow(event.clientX - centerX, 2) +
        Math.pow(event.clientY - centerY, 2)
    );

    /*
       100px = escape distance.
       Increase this if you want it harder to catch.
    */

    if (distance < 100) {
        moveYesButton();
    }

});


/*
   Mobile:
   Move the button when the user tries
   to touch it.
*/

yes2.addEventListener("touchstart", (event) => {

    event.preventDefault();

    moveYesButton();

});


/*
   If somehow clicked, move it again.
*/

yes2.addEventListener("click", (event) => {

    event.preventDefault();

    moveYesButton();

});


/* =========================================
   SCREEN 2 NO
========================================= */

document.getElementById("no2").addEventListener("click", () => {

    /*
       Reset the YES button before leaving
       the screen.
    */

    yes2.style.position = "";
    yes2.style.left = "";
    yes2.style.top = "";
    yes2.style.zIndex = "";

    showScreen(2);

});


/* =========================================
   SCREEN 3
========================================= */

document.getElementById("continue3").addEventListener("click", () => {

    showScreen(3);

});


/* =========================================
   SCALE
========================================= */

const slider = document.getElementById("careSlider");
const dingBtn = document.getElementById("dingBtn");


/*
   Always keep the slider at the bottom.

   Whenever someone tries to drag it upward,
   immediately return it to 0.
*/

slider.value = 0;

slider.addEventListener("input", () => {

    if (Number(slider.value) > 0) {

        slider.value = 0;

        /*
           Small visual "bounce" effect.
        */

        slider.classList.remove("slider-bounce");

        void slider.offsetWidth;

        slider.classList.add("slider-bounce");
    }

});


/*
   Also catch mouse/touch attempts.
*/

slider.addEventListener("change", () => {

    slider.value = 0;

});


/*
   Keep it at zero when clicked.
*/

slider.addEventListener("mousedown", () => {

    setTimeout(() => {
        slider.value = 0;
    }, 50);

});


slider.addEventListener("touchstart", () => {

    setTimeout(() => {
        slider.value = 0;
    }, 50);

});


/* =========================================
   DING DING DING
========================================= */

dingBtn.addEventListener("click", () => {

    showScreen(4);

});


/* =========================================
   SCREEN 5
========================================= */

document.getElementById("yes5").addEventListener("click", () => {

    showScreen(5);

});


/* =========================================
   SCREEN 5 NO BUTTON
========================================= */

const noButton = document.getElementById("no5");

function moveNoButton() {

    const padding = 20;

    const buttonWidth = noButton.offsetWidth;
    const buttonHeight = noButton.offsetHeight;

    const maxX = window.innerWidth - buttonWidth - padding;
    const maxY = window.innerHeight - buttonHeight - padding;

    const x =
        padding +
        Math.random() * Math.max(0, maxX - padding);

    const y =
        padding +
        Math.random() * Math.max(0, maxY - padding);

    noButton.style.position = "fixed";

    noButton.style.left = `${x}px`;

    noButton.style.top = `${y}px`;

    noButton.style.zIndex = "9999";
}


/*
   Desktop
*/

noButton.addEventListener("mouseenter", moveNoButton);


/*
   Mobile
*/

noButton.addEventListener("touchstart", (event) => {

    event.preventDefault();

    moveNoButton();

});


/*
   If clicked, escape again.
*/

noButton.addEventListener("click", (event) => {

    event.preventDefault();

    moveNoButton();

});


/* =========================================
   REPLAY
========================================= */

document.getElementById("replayBtn").addEventListener("click", () => {

    yes2.style.position = "";
    yes2.style.left = "";
    yes2.style.top = "";
    yes2.style.zIndex = "";

    noButton.style.position = "";
    noButton.style.left = "";
    noButton.style.top = "";
    noButton.style.zIndex = "";

    slider.value = 0;

    showScreen(0);

});


/* =========================================
   SHARE
========================================= */

document.getElementById("shareBtn").addEventListener("click", async () => {

    const shareData = {
        title: "idc.",
        text: "I found something you need to see 👀",
        url: window.location.href
    };

    try {

        if (navigator.share) {

            await navigator.share(shareData);

        } else {

            await navigator.clipboard.writeText(window.location.href);

            alert("Link copied! 💗");

        }

    } catch (error) {

        console.log("Share cancelled.");

    }

});
