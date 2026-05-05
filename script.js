const openGateBtn = document.getElementById("openGateBtn");
const openInvitationBtn = document.getElementById("openInvitationBtn");
const gateWrap = document.getElementById("gateWrap");
const coverOne = document.getElementById("coverOne");
const coverTwo = document.getElementById("coverTwo");
const contentWrapper = document.getElementById("contentWrapper");
const bottomNav = document.getElementById("bottomNav");
const coverOneContent = document.querySelector(".cover-one-content");
const bgVideo = document.querySelector(".bg-video");

/* MUSIC */
const bgMusic = document.getElementById("bgMusic");
const musicToggle = document.getElementById("musicToggle");
const musicIcon = document.getElementById("musicIcon");

let isMusicPlaying = false;

function playMusic() {
  if (!bgMusic) return;

  bgMusic.play().then(() => {
    isMusicPlaying = true;

    if (musicToggle) {
      musicToggle.classList.remove("muted");
    }

    if (musicIcon) {
      musicIcon.innerHTML = `
        <path d="M12 3V13.5A3.5 3.5 0 1 1 10 10.34V6H18V3H12Z"/>
      `;
    }
  }).catch((error) => {
    console.log("Musik belum bisa diputar:", error);
    isMusicPlaying = false;
  });
}

function pauseMusic() {
  if (!bgMusic) return;

  bgMusic.pause();
  isMusicPlaying = false;

  if (musicToggle) {
    musicToggle.classList.add("muted");
  }

  if (musicIcon) {
    musicIcon.innerHTML = `
      <path d="M4.27 3L21 19.73L19.73 21L15.9 17.17A3.5 3.5 0 0 1 10 14.5A3.5 3.5 0 0 1 13.9 11.02L12 9.12V6H8.88L3 4.27L4.27 3Z"/>
    `;
  }
}

if (musicToggle) {
  musicToggle.addEventListener("click", () => {
    if (isMusicPlaying) {
      pauseMusic();
    } else {
      playMusic();
    }
  });
}

/* COVER 1: BUKA GERBANG */
openGateBtn.addEventListener("click", () => {
  if (bgVideo) {
    bgVideo.currentTime = 0;
    bgVideo.play().catch((error) => {
      console.log("Video belum bisa diputar:", error);
    });
  }

  playMusic();

  coverOneContent.classList.add("hide-cover-content");
  gateWrap.classList.add("open");

  setTimeout(() => {
    coverOne.classList.add("hidden");
    coverTwo.classList.remove("hidden");

    setTimeout(() => {
      coverTwo.classList.add("show-cover-two");
    }, 80);
  }, 1800);
});

/* COVER 2: MASUK ISI UNDANGAN */
openInvitationBtn.addEventListener("click", () => {
  coverTwo.classList.add("hidden");
  contentWrapper.classList.remove("hidden");
  bottomNav.classList.remove("hidden");
  window.scrollTo(0, 0);
});

/* COUNTDOWN */
const weddingDate = new Date("August 24, 2026 08:00:00").getTime();

function updateCountdown() {
  const now = new Date().getTime();
  const distance = weddingDate - now;

  if (distance <= 0) {
    document.getElementById("days").innerText = "00";
    document.getElementById("hours").innerText = "00";
    document.getElementById("minutes").innerText = "00";
    document.getElementById("seconds").innerText = "00";
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((distance / (1000 * 60)) % 60);
  const seconds = Math.floor((distance / 1000) % 60);

  document.getElementById("days").innerText = String(days).padStart(2, "0");
  document.getElementById("hours").innerText = String(hours).padStart(2, "0");
  document.getElementById("minutes").innerText = String(minutes).padStart(2, "0");
  document.getElementById("seconds").innerText = String(seconds).padStart(2, "0");
}

setInterval(updateCountdown, 1000);
updateCountdown();

/* RSVP */
const rsvpForm = document.getElementById("rsvpForm");

if (rsvpForm) {
  rsvpForm.addEventListener("submit", function(e) {
    e.preventDefault();
    alert("Terima kasih, RSVP Anda sudah terkirim.");
    rsvpForm.reset();
  });
}

/* FORM UCAPAN & DOA */
const wishForm = document.getElementById("wishForm");
const wishList = document.getElementById("wishList");

if (wishForm) {
  wishForm.addEventListener("submit", function(e) {
    e.preventDefault();

    const nama = document.getElementById("wishName").value;
    const pesan = document.getElementById("wishMessage").value;

    const wishCard = document.createElement("div");
    wishCard.className = "wish-card";
    wishCard.innerHTML = `
      <h4>${nama}</h4>
      <p>${pesan}</p>
    `;

    wishList.prepend(wishCard);
    wishForm.reset();

    alert("Terima kasih, ucapan dan doa Anda sudah terkirim.");
  });
}

/* COPY REKENING */
function copyText(text) {
  navigator.clipboard.writeText(text);
  alert("Berhasil disalin: " + text);
}

/* SCROLL ANIMATION */
const sections = document.querySelectorAll(".section");

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
}, {
  threshold: 0.2
});

sections.forEach(section => observer.observe(section));

/* NAVBAR ACTIVE */
/* NAVBAR ACTIVE SAAT DIKLIK */
const navItems = document.querySelectorAll(".nav-item:not(.music-nav)");

navItems.forEach(item => {
  item.addEventListener("click", () => {
    navItems.forEach(nav => nav.classList.remove("active"));
    item.classList.add("active");
  });
});

/* NAVBAR ACTIVE SAAT SCROLL */
const navSections = document.querySelectorAll(
  "#home, #mempelai, #acara, #galeri, #rsvp"
);

const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const activeId = entry.target.getAttribute("id");

      navItems.forEach(item => {
        item.classList.remove("active");

        if (item.getAttribute("href") === `#${activeId}`) {
          item.classList.add("active");
        }
      });
    }
  });
}, {
  threshold: 0.55
});

navSections.forEach(section => navObserver.observe(section));