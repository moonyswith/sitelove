// 1. Текущее время
function updateClock() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    document.getElementById('live-clock').innerText = `${hours}:${minutes}`;
}
setInterval(updateClock, 1000);
updateClock();

// 2. Анимация появления фото с боков
const cards = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if(entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, { threshold: 0.1 });

cards.forEach(card => observer.observe(card));

// 3. Расчет времени отношений
const startDate = new Date('2025-11-28T00:00:00');

document.getElementById('counter-btn').addEventListener('click', function() {
    const resultDiv = document.getElementById('counter-result');

    function updateCounter() {
        const diff = new Date() - startDate;

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / 1000 / 60) % 60);
        const seconds = Math.floor((diff / 1000) % 60);

        resultDiv.innerHTML = `
            Мы счастливы вместе:<br>
            💖 <strong>${days}</strong> дн.
            <strong>${hours}</strong> ч.
            <strong>${minutes}</strong> мин.
            <strong>${seconds}</strong> сек.
        `;
    }

    updateCounter();
    setInterval(updateCounter, 1000);
    this.style.display = 'none';
});

// 4. Музыкальный плеер
const playlist = [
    { title: "Safe And Sound", src: "track1.mp3" },
    { title: "mirrors demo", src: "track2.mp3" },
    { title: "Я вытащу тебя со дна", src: "track3.mp3" },
    { title: "In and out of Love", src: "track4.mp3" }
];

let currentTrackIndex = 0;
const audio = document.getElementById('audio-element');
const playBtn = document.getElementById('play-btn');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const trackTitle = document.getElementById('track-title');

function loadTrack(index) {
    audio.src = playlist[index].src;
    trackTitle.innerText = playlist[index].title;
}

function playTrack() {
    audio.play().then(() => {
        playBtn.innerText = "⏸️";
    }).catch(err => {
        console.log("Браузер заблокировал автовоспроизведение, нужен клик.");
    });
}

function pauseTrack() {
    audio.pause();
    playBtn.innerText = "▶️";
}

playBtn.addEventListener('click', () => {
    if (audio.paused) {
        playTrack();
    } else {
        pauseTrack();
    }
});

nextBtn.addEventListener('click', () => {
    currentTrackIndex = (currentTrackIndex + 1) % playlist.length;
    loadTrack(currentTrackIndex);
    playTrack();
});

prevBtn.addEventListener('click', () => {
    currentTrackIndex = (currentTrackIndex - 1 + playlist.length) % playlist.length;
    loadTrack(currentTrackIndex);
    playTrack();
});

// Инициализация первого трека при загрузке
loadTrack(currentTrackIndex);

// 5. Мини-игра "Поймай сердце"
const heart = document.getElementById('heart-target');
const winMsg = document.getElementById('game-win-msg');
let clicks = 0;

heart.addEventListener('mouseenter', moveHeart);
heart.addEventListener('click', () => {
    clicks++;
    if (clicks < 5) {
        moveHeart();
    } else {
        heart.style.display = 'none';
        winMsg.classList.remove('hidden-info');
        winMsg.style.display = 'block';
    }
});

function moveHeart() {
    if (clicks >= 5) return;
    const x = Math.random() * 80;
    const y = Math.random() * 60;
    heart.style.left = `${x}%`;
    heart.style.top = `${y}%`;
}
