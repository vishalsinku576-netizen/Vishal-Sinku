/* =====================================================
   PERSONAL DETAILS
===================================================== */

// CHANGE THESE DETAILS

const birthdayName = "Priya";

const senderName = "Vishal";

// Birthday date
// 17 September 2005

const birthdayDay = 17;
const birthdayMonth = 8; // September = 8 in JavaScript


/* =====================================================
   COUNTDOWN 3 → 2 → 1
===================================================== */

const intro = document.getElementById("intro");

const website = document.getElementById("website");

const countNumber =
    document.getElementById("countNumber");

const countText =
    document.getElementById("countText");

let count = 3;


function startIntroCountdown() {

    countNumber.textContent = count;

    if (count === 3) {
        countText.textContent = "Get Ready! 🎁";
    }

    if (count === 2) {
        countText.textContent = "Something Beautiful... ✨";
    }

    if (count === 1) {
        countText.textContent = "For Someone Special ❤️";
    }

    countNumber.style.animation = "none";

    void countNumber.offsetWidth;

    countNumber.style.animation =
        "numberPop .9s ease";

    count--;

    if (count >= 0) {

        setTimeout(
            startIntroCountdown,
            1000
        );

    } else {

        setTimeout(() => {

            intro.style.display = "none";

            website.style.display = "block";

            typeName();

            createParticles();

        }, 500);
    }
}

startIntroCountdown();


/* =====================================================
   NAME TYPING ANIMATION
===================================================== */

const typingName =
    document.getElementById("typingName");

const finalName =
    document.getElementById("finalName");

let nameIndex = 0;


function typeName() {

    if (nameIndex < birthdayName.length) {

        typingName.textContent +=
            birthdayName.charAt(nameIndex);

        nameIndex++;

        setTimeout(
            typeName,
            150
        );

    } else {

        typingName.innerHTML =
            birthdayName + " ❤️";

        finalName.textContent =
            birthdayName + " ❤️";
    }
}


/* =====================================================
   PARTICLES
===================================================== */

function createParticles() {

    const container =
        document.getElementById("particles");

    for (let i = 0; i < 70; i++) {

        const particle =
            document.createElement("div");

        particle.className =
            "particle";

        particle.style.left =
            Math.random() * 100 + "vw";

        particle.style.animationDuration =
            (5 + Math.random() * 10) + "s";

        particle.style.animationDelay =
            Math.random() * 8 + "s";

        const size =
            2 + Math.random() * 5;

        particle.style.width =
            size + "px";

        particle.style.height =
            size + "px";

        container.appendChild(particle);
    }
}


/* =====================================================
   MUSIC
===================================================== */

const music =
    document.getElementById("music");

const musicText =
    document.getElementById("musicText");


function toggleMusic() {

    if (music.paused) {

        music.play();

        musicText.textContent =
            "Pause Music";

    } else {

        music.pause();

        musicText.textContent =
            "Play Music";
    }
}


/* =====================================================
   CELEBRATION
===================================================== */

function startCelebration() {

    createConfetti();

    music.play()
        .then(() => {

            musicText.textContent =
                "Pause Music";

        })
        .catch(() => {});


    document
        .querySelector(".birthday-countdown")
        .scrollIntoView({
            behavior: "smooth"
        });
}


/* =====================================================
   CONFETTI
===================================================== */

function createConfetti() {

    const container =
        document.getElementById("confetti");

    const shapes = [
        "🎉",
        "🎊",
        "✨",
        "💖",
        "💕",
        "⭐",
        "🎈"
    ];

    for (let i = 0; i < 130; i++) {

        const piece =
            document.createElement("div");

        piece.className =
            "confetti";

        piece.textContent =
            shapes[
                Math.floor(
                    Math.random() *
                    shapes.length
                )
            ];

        piece.style.left =
            Math.random() * 100 + "vw";

        piece.style.fontSize =
            (10 + Math.random() * 20) + "px";

        piece.style.animationDuration =
            (2 + Math.random() * 3) + "s";

        piece.style.animationDelay =
            Math.random() * 1.5 + "s";

        container.appendChild(piece);

        setTimeout(() => {

            piece.remove();

        }, 6000);
    }
}


/* =====================================================
   BIRTHDAY COUNTDOWN
===================================================== */

function getNextBirthday() {

    const now = new Date();

    let year =
        now.getFullYear();

    let birthday =
        new Date(
            year,
            birthdayMonth,
            birthdayDay,
            0,
            0,
            0
        );

    // If birthday has already passed,
    // calculate next year's birthday.

    if (birthday <= now) {

        birthday =
            new Date(
                year + 1,
                birthdayMonth,
                birthdayDay,
                0,
                0,
                0
            );
    }

    return birthday;
}


function updateCountdown() {

    const now =
        new Date();

    const birthday =
        getNextBirthday();

    const difference =
        birthday - now;


    if (difference <= 0) {

        document.getElementById("days")
            .textContent = "00";

        document.getElementById("hours")
            .textContent = "00";

        document.getElementById("minutes")
            .textContent = "00";

        document.getElementById("seconds")
            .textContent = "00";

        return;
    }


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
            (difference /
                1000) % 60
        );


    document.getElementById("days")
        .textContent =
        String(days).padStart(2, "0");

    document.getElementById("hours")
        .textContent =
        String(hours).padStart(2, "0");

    document.getElementById("minutes")
        .textContent =
        String(minutes).padStart(2, "0");

    document.getElementById("seconds")
        .textContent =
        String(seconds).padStart(2, "0");
}


setInterval(
    updateCountdown,
    1000
);

updateCountdown();


/* =====================================================
   GALLERY LIGHTBOX
===================================================== */

const photos =
    document.querySelectorAll(".photo img");

const lightbox =
    document.getElementById("lightbox");

const lightboxImage =
    document.getElementById("lightboxImage");


photos.forEach(photo => {

    photo.addEventListener(
        "click",
        () => {

            lightbox.style.display =
                "flex";

            lightboxImage.src =
                photo.src;
        }
    );

});


function closeLightbox() {

    lightbox.style.display =
        "none";
}


/* =====================================================
   WHATSAPP SHARE
===================================================== */

function shareWhatsApp() {

    const message =
        `🎂 Happy Birthday ${birthdayName}! ❤️

Wishing you happiness, success,
love and beautiful memories. ✨

🎉 Have an amazing birthday!

— ${senderName}`;

    const url =
        "https://wa.me/?text=" +
        encodeURIComponent(message);

    window.open(
        url,
        "_blank"
    );
}


/* =====================================================
   AUTO CONFETTI
===================================================== */

setTimeout(() => {

    createConfetti();

}, 2500);