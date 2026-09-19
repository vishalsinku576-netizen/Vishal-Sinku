
/* =========================================
   INTRO 3 → 2 → 1
========================================= */

const intro = document.getElementById("intro");
const introNumber = document.getElementById("introNumber");
const mainContent = document.getElementById("mainContent");

let number = 3;

const introTimer = setInterval(() => {

    number--;

    if (number > 0) {

        introNumber.textContent = number;

        introNumber.style.transform = "scale(1.2)";

        setTimeout(() => {
            introNumber.style.transform = "scale(1)";
        }, 180);

    } else {

        clearInterval(introTimer);

        introNumber.textContent = "❤️";

        setTimeout(() => {

            intro.classList.add("fade-out");

            setTimeout(() => {

                intro.style.display = "none";

                mainContent.classList.remove("hidden");

                typeName();

                createCelebration();

            }, 900);

        }, 700);

    }

}, 1000);


/* =========================================
   NAME TYPING
========================================= */

const personName = "Saipallavi";

const typedName = document.getElementById("typedName");
const finalName = document.getElementById("finalName");

function typeName() {

    let index = 0;

    const typing = setInterval(() => {

        typedName.textContent =
            personName.substring(0, index + 1);

        index++;

        if (index === personName.length) {

            clearInterval(typing);

        }

    }, 150);

    finalName.textContent = personName;
}


/* =========================================
   SMOOTH START BUTTON
========================================= */

document.getElementById("startButton")
    .addEventListener("click", () => {

        document.getElementById("message")
            .scrollIntoView({
                behavior: "smooth"
            });

    });


/* =========================================
   BIRTHDAY COUNTDOWN
========================================= */

const birthdayMonth = 5; // May = 5
const birthdayDay = 9;

function updateCountdown() {

    const now = new Date();

    let birthday =
        new Date(
            now.getFullYear(),
            birthdayMonth,
            birthdayDay,
            0,
            0,
            0
        );

    if (now > birthday) {

        birthday =
            new Date(
                now.getFullYear() + 1,
                birthdayMonth,
                birthdayDay,
                0,
                0,
                0
            );

    }

    const difference =
        birthday.getTime() - now.getTime();

    const days =
        Math.floor(
            difference /
            (1000 * 60 * 60 * 24)
        );

    const hours =
        Math.floor(
            (difference /
            (1000 * 60 * 60)) % 24
        );

    const minutes =
        Math.floor(
            (difference /
            (1000 * 60)) % 60
        );

    const seconds =
        Math.floor(
            (difference / 1000) % 60
        );

    document.getElementById("days")
        .textContent = String(days).padStart(2, "0");

    document.getElementById("hours")
        .textContent = String(hours).padStart(2, "0");

    document.getElementById("minutes")
        .textContent = String(minutes).padStart(2, "0");

    document.getElementById("seconds")
        .textContent = String(seconds).padStart(2, "0");

}

updateCountdown();

setInterval(updateCountdown, 1000);


/* =========================================
   MUSIC
========================================= */

const music =
    document.getElementById("birthdayMusic");

const musicButton =
    document.getElementById("musicButton");

let musicPlaying = false;

musicButton.addEventListener("click", () => {

    if (!musicPlaying) {

        music.play()
            .then(() => {

                musicPlaying = true;

                musicButton.textContent = "❚❚";

            })
            .catch(() => {

                alert(
                    "Please make sure birthday.mp3 exists inside the music folder."
                );

            });

    } else {

        music.pause();

        musicPlaying = false;

        musicButton.textContent = "♫";

    }

});


/* =========================================
   GALLERY LIGHTBOX
========================================= */

const photoCards =
    document.querySelectorAll(".photo-card img");

const lightbox =
    document.getElementById("lightbox");

const lightboxImage =
    document.getElementById("lightboxImage");

const closeLightbox =
    document.getElementById("closeLightbox");

const previousPhoto =
    document.getElementById("previousPhoto");

const nextPhoto =
    document.getElementById("nextPhoto");

const photoCounter =
    document.getElementById("photoCounter");

let currentPhoto = 0;


function showPhoto(index) {

    if (index < 0) {
        index = photoCards.length - 1;
    }

    if (index >= photoCards.length) {
        index = 0;
    }

    currentPhoto = index;

    lightboxImage.src =
        photoCards[currentPhoto].src;

    photoCounter.textContent =
        `${currentPhoto + 1} / ${photoCards.length}`;

    lightbox.classList.add("active");

}


photoCards.forEach((photo, index) => {

    photo.addEventListener("click", () => {

        showPhoto(index);

    });

});


nextPhoto.addEventListener("click", (event) => {

    event.stopPropagation();

    showPhoto(currentPhoto + 1);

});


previousPhoto.addEventListener("click", (event) => {

    event.stopPropagation();

    showPhoto(currentPhoto - 1);

});


closeLightbox.addEventListener("click", () => {

    lightbox.classList.remove("active");

});


lightbox.addEventListener("click", (event) => {

    if (event.target === lightbox) {

        lightbox.classList.remove("active");

    }

});


/* Keyboard navigation */

document.addEventListener("keydown", (event) => {

    if (!lightbox.classList.contains("active")) {
        return;
    }

    if (event.key === "Escape") {

        lightbox.classList.remove("active");

    }

    if (event.key === "ArrowRight") {

        showPhoto(currentPhoto + 1);

    }

    if (event.key === "ArrowLeft") {

        showPhoto(currentPhoto - 1);

    }

});


/* =========================================
   CONFETTI + HEART PARTICLES
========================================= */

function createCelebration() {

    const symbols = [
        "♥",
        "♡",
        "✦",
        "✧",
        "•"
    ];

    for (let i = 0; i < 70; i++) {

        const particle =
            document.createElement("div");

        particle.className = "particle";

        particle.textContent =
            symbols[
                Math.floor(
                    Math.random() * symbols.length
                )
            ];

        particle.style.left =
            Math.random() * 100 + "vw";

        particle.style.top = "-20px";

        particle.style.fontSize =
            (8 + Math.random() * 15) + "px";

        particle.style.animationDuration =
            (3 + Math.random() * 5) + "s";

        particle.style.opacity =
            .4 + Math.random() * .6;

        document.body.appendChild(particle);

        setTimeout(() => {

            particle.remove();

        }, 9000);

    }

}


/* =========================================
   TOUCH SWIPE FOR PHOTO VIEWER
========================================= */

let touchStartX = 0;

lightbox.addEventListener("touchstart", (event) => {

    touchStartX =
        event.touches[0].clientX;

});


lightbox.addEventListener("touchend", (event) => {

    const touchEndX =
        event.changedTouches[0].clientX;

    const distance =
        touchEndX - touchStartX;

    if (Math.abs(distance) < 50) {
        return;
    }

    if (distance < 0) {

        showPhoto(currentPhoto + 1);

    } else {

        showPhoto(currentPhoto - 1);

    }

});
