document.addEventListener("DOMContentLoaded", function () {
    const music = document.getElementById("bg-music");
    const musicControl = document.getElementById("music-control");

    let isPlaying = false;

    // Try to autoplay music (may be blocked by browser)
    music.play().then(() => {
        isPlaying = true;
        musicControl.innerHTML = "🔇 Pause Music";
    }).catch(() => {
        // Autoplay failed, show play button
        musicControl.style.display = "block";
    });

    // Music Play/Pause Toggle
    musicControl.addEventListener("click", function () {
        if (isPlaying) {
            music.pause();
            musicControl.innerHTML = "🔊 Play Music";
        } else {
            music.play();
            musicControl.innerHTML = "🔇 Pause Music";
        }
        isPlaying = !isPlaying;
    });

    // Start music when user interacts with the page (if autoplay is blocked)
    document.addEventListener("click", function () {
        if (!isPlaying) {
            music.play();
            isPlaying = true;
            musicControl.innerHTML = "🔇 Pause Music";
        }
    }, { once: true });

    // Romantic messages for each image
    const messages = [
        "You are my first and last thought every day! ❤️",
        "Every heartbeat of mine whispers your name. 💞",
        "Your love is the sweetest melody in my heart. 🎶",
        "You are the light in my darkest days. ✨",
        "With you, every moment feels like magic. 💖",
        "You complete the missing pieces of my heart. 🧩",
        "Forever isn’t long enough with you. 💕"
    ];

    // Card Flip Effect (without affecting image styling)
    const cards = document.querySelectorAll(".card");

    cards.forEach((card, index) => {
        // Check if the card already contains a front and back (prevents duplication)
        if (!card.querySelector(".card-inner")) {
            const front = document.createElement("div");
            front.classList.add("front");
            front.appendChild(card.querySelector("img")); // Keep existing image

            const back = document.createElement("div");
            back.classList.add("back");
            back.innerText = messages[index % messages.length];

            const cardInner = document.createElement("div");
            cardInner.classList.add("card-inner");
            cardInner.appendChild(front);
            cardInner.appendChild(back);

            card.appendChild(cardInner);
        }

        // Flip effect on click
        card.addEventListener("click", function () {
            card.classList.toggle("flipped");
        });
    });

    // Love Letter Toggle
    function unrollLetter() {
        const rolledLetter = document.querySelector(".rolled-letter");
        const unrolledLetter = document.querySelector(".unrolled-letter");

        rolledLetter.classList.add("fade-out");

        setTimeout(() => {
            rolledLetter.style.display = "none";
            unrolledLetter.style.display = "block";
            unrolledLetter.classList.remove("fade-out");
            unrolledLetter.classList.add("fade-in");

            setTimeout(() => {
                window.scrollTo({
                    top: unrolledLetter.getBoundingClientRect().top + window.scrollY + 50,
                    behavior: "smooth"
                });
            }, 100);
        }, 300);

        if (!document.getElementById("close-letter")) {
            const closeButton = document.createElement("button");
            closeButton.id = "close-letter";
            closeButton.innerText = "Close";
            closeButton.classList.add("close-btn");

            closeButton.addEventListener("click", function () {
                rollLetter();
            });

            unrolledLetter.appendChild(closeButton);
        }
    }

    function rollLetter() {
        const rolledLetter = document.querySelector(".rolled-letter");
        const unrolledLetter = document.querySelector(".unrolled-letter");

        unrolledLetter.classList.add("fade-out");
        setTimeout(() => {
            unrolledLetter.style.display = "none";
            rolledLetter.style.display = "block";
            rolledLetter.classList.remove("fade-out");
            rolledLetter.classList.add("fade-in");

            // Scroll to the top when closing the letter
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        }, 300);
    }

    document.querySelector(".rolled-letter").addEventListener("click", function () {
        unrollLetter();
    });

    document.querySelector(".unrolled-letter").addEventListener("click", function (event) {
        if (event.target.id === "close-letter") {
            rollLetter();
        }
    });

    const unlockButton = document.getElementById("unlock-button");
    if (!unlockButton) {
        console.error("Unlock button not found.");
        return;
    }
    unlockButton.addEventListener("click", function () {
        checkAnswer(); // Ensure function call matches exact function name
    });
});

function checkAnswer() {
    console.log("Searching for input fields and elements...");
    const answerInput1 = document.getElementById("answer1");
    const answerInput2 = document.getElementById("answer2");
    const secretMessage = document.getElementById("secret-message");
    const errorMessage = document.getElementById("error-message");
    const unlockButton = document.getElementById("unlock-button");

    if (!answerInput1 || !answerInput2 || !secretMessage || !errorMessage) {
        console.error("One or more required elements (answer inputs, secret message, or error message) are missing.");
        errorMessage.innerText = "Something went wrong! Please refresh and try again.";
        errorMessage.style.display = "block";
        return;
    }

    const correctAnswer1 = "Blue mini dress";
    const correctAnswer2 = "12 dec"; 

    const userAnswer1 = answerInput1.value.trim().toLowerCase();
    const userAnswer2 = answerInput2.value.trim().toLowerCase();

    if (!userAnswer1 || !userAnswer2) {
        errorMessage.innerText = "Please enter both answers!";
        errorMessage.style.display = "block";
        unlockButton.innerText = "Unlock 💖";
        window.scrollTo({
            top: document.body.scrollHeight,
            behavior: "smooth"
        });
        return;
    }

    if (userAnswer1 === correctAnswer1.toLowerCase() && userAnswer2 === correctAnswer2.toLowerCase()) {
        secretMessage.style.display = "block";
        const musicButton = document.getElementById("music-control");
        if (musicButton) {
            musicButton.style.bottom = "60px"; // Adjust position to avoid overlap
        } else {
            console.warn("Music control button not found.");
        }
        errorMessage.style.display = "none";
    } else {
        errorMessage.innerText = "Nope! That's not it. Try again, love! 😘";
        errorMessage.style.display = "block";
        unlockButton.innerText = "Unlock 💖";
    }

    // Scroll to the bottom of the page in both cases
    window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth"
    });
}