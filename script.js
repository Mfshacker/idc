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


/* --------------------------------
   SCREEN 1
-------------------------------- */

document.getElementById("next1").addEventListener("click", () => {

    showScreen(1);

});


/* --------------------------------
   SCREEN 2
-------------------------------- */

document.getElementById("yes2").addEventListener("click", () => {

    // Yes doesn't let them escape the joke
    showScreen(2);

});


document.getElementById("no2").addEventListener("click", () => {

    showScreen(2);

});


/* --------------------------------
   SCREEN 3
-------------------------------- */

document.getElementById("continue3").addEventListener("click", () => {

    showScreen(3);

});


/* --------------------------------
   SLIDER
-------------------------------- */

const slider = document.getElementById("careSlider");
const dingBtn = document.getElementById("dingBtn");

slider.addEventListener("input", () => {

    const value = Number(slider.value);

    if (value >= 70) {

        dingBtn.textContent = "DING DING DING 🔔";

    } else {

        dingBtn.textContent = "DING DING DING 🔔";

    }

});


dingBtn.addEventListener("click", () => {

    showScreen(4);

});


/* --------------------------------
   SCREEN 5
-------------------------------- */

document.getElementById("yes5").addEventListener("click", () => {

    showScreen(5);

});


/* --------------------------------
   ESCAPING NO BUTTON
-------------------------------- */

const noButton = document.getElementById("no5");

function moveNoButton() {

    const padding = 20;

    const maxX =
        window.innerWidth -
        noButton.offsetWidth -
        padding;

    const maxY =
        window.innerHeight -
        noButton.offsetHeight -
        padding;

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


/* Desktop */

noButton.addEventListener("mouseenter", moveNoButton);


/* Mobile */

noButton.addEventListener("touchstart", (event) => {

    event.preventDefault();

    moveNoButton();

});


/* --------------------------------
   REPLAY
-------------------------------- */

document.getElementById("replayBtn").addEventListener("click", () => {

    noButton.style.position = "";
    noButton.style.left = "";
    noButton.style.top = "";

    showScreen(0);

});


/* --------------------------------
   SHARE
-------------------------------- */

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
