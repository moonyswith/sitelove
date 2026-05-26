// 1. Текущее время на экране блокировки
function updateClock() {
    const clockEl = document.getElementById('live-clock');
    if (clockEl) {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        clockEl.innerText = `${hours}:${minutes}`;
    }
}
setInterval(updateClock, 1000);
updateClock();

// 2. Анимация появления фото при скролле
const cards = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if(entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, { threshold: 0.1 });
cards.forEach(card => observer.observe(card));

// 3. Музыкальный плеер и караоке-тексты
const playlist = [
    { title: "Safe and sound", src: "track1.mp3" },
    { title: "mirrors demo", src: "track2.mp3" },
    { title: "Я вытащу тебя со дна", src: "track3.mp3" },
    { title: "Возвращайся..", src: "track4.mp3" },
    { title: "В клубе", src: "track5.mp3" }
];

// Тексты песен с таймингами (в секундах) — отредактируйте строчки под себя!
const lyricsData = {
    0: [
        { time: 0, text: " " },
        { time: 17.35, text: "I could lift you up" },
        { time: 20.98, text: "I could show you what you want to see" },
        { time: 23.41, text: "And take you where you want to be" },
        { time: 26.10, text: "You could be my luck" },
        { time: 29.31, text: "Even if the sky is falling down" },
        { time: 31.30, text: "I know that we'll be safe and sound" },
        { time: 36.42, text: "We're safe and sound" },
        { time: 41.87, text: "You know my river won't evaporate" },
        { time: 45.24, text: "You know my river won't evaporate" },
        { time: 47.61, text: "This world, we still appreciate" },
        { time: 50.39, text: "You could be my luck" },
        { time: 53.55, text: "Even in a hurricane of frowns" },
        { time: 55.94, text: "I know that we'll be safe and sound" },
        { time: 58.46, text: "We're safe and sound (safe and sound)" },
        { time: 65.00, text: "We're safe and sound (hold your ground)" },
        { time: 69.14, text: "We're safe and sound (safe and sound)" },
        { time: 74.95, text: "I could show you love" },
        { time: 78.09, text: "In a tidal wave of mystery" },
        { time: 80.52, text: "You'll still be standing next to me" },
        { time: 82.97, text: "You could be my luck" },
        { time: 115.25, text: "Even if we're six feet underground" },
        { time: 118.60, text: "I know that we'll be safe and sound" },
        { time: 119.65, text: "We're safe and sound" },
        { time: 123.68, text: "I could lift you up" },
        { time: 126.79, text: "I could show you what you want to see" },
        { time: 129.25, text: "And take you where you want to be" },
        { time: 131.85, text: "You could be my luck" },
        { time: 135.01, text: "Even if the sky is falling down" },
        { time: 137.33, text: "I know that we'll be safe and sound" },
        { time: 140.23, text: "I could lift you up" },
        { time: 143.08, text: "I could show you what you want to see" },
        { time: 145.45, text: "And take you where you want to be" },
        { time: 148.05, text: "You could be my luck" },
        { time: 151.28, text: "Even if the sky is falling down" },
        { time: 153.69, text: "I know that we'll be safe and sound" },
        { time: 158.72, text: "We're safe and sound" },
        { time: 162.72, text: "We're safe and sound" },
        { time: 166.86, text: "We're safe and sound" },
        { time: 171.01, text: "We're safe and sound (safe and sound)" },
        { time: 174.98, text: "We're safe and sound (safe and sound)" },
        { time: 179.02, text: "We're safe and sound (hold your ground)" },
        { time: 183.18, text: "We're safe and sound (safe and sound)" },
        { time: 187.12, text: "We're safe and sound" }
    ],
    1: [
        { time: 0, text: " " },
        { time: 0.22, text: "Take down all the mirrors in my house, I hate my nose, eyes and my mouth" },
        { time: 4.34, text: "I hate the jokes I laugh about, I hate the hoes I'm sad about" },
        { time: 8.21, text: "She calls up my phone, ringing, ringing, ringing, ringing" },
        { time: 11.42, text: "Baby, just leave me alone" },
        { time: 12.62, text: "She saw all my flaws" },
        { time: 14.25, text: "Baby, won't you tell me what the fuck I'm doing wrong?" },
        { time: 16.41, text: "Ooh, I hate the feeling of my doubts, so I wanna die on top of my couch" },
        { time: 20.55, text: "Oh well, oh well, oh well" },
        { time: 24.77, text: "What do you want from me?" },
        { time: 26.58, text: "I'm never ever good for anything" },
        { time: 28.38, text: "Why do you talk to me?" },
        { time: 30.33, text: "I'll never ever buy a wedding ring" },
        { time: 32.34, text: "Ooh, I have a question" },
        { time: 34.90, text: "I'm like, \"Ooh, I have a question\"" },
        { time: 36.37, text: "Ooh, I have a question" },
        { time: 38.12, text: "I'm like, \"Ooh I have a question for you, baby\"" },
        { time: 40.80, text: "How do I really even matter to you" },
        { time: 42.88, text: "When you was outside laughing with another dude?" },
        { time: 45.04, text: "Oh, oh, oh" },
        { time: 47.43, text: "You make me hate my face so much, oh" },
        { time: 49.29, text: "When will I ever feel that (oh shit, a ghost)" },
        { time: 53.23, text: "Take down all the mirrors in my house, I hate my nose, eyes and my mouth" },
        { time: 57.01, text: "I hate the jokes I laugh about, I hate the hoes I'm sad about" },
        { time: 60.95, text: "She calls up my phone, ringing, ringing, ringing, ringing" },
        { time: 64.25, text: "Baby, just leave me alone" },
        { time: 65.45, text: "She saw all my flaws" },
        { time: 66.60, text: "Baby, won't you tell me what the fuck I'm doing wrong?" },
        { time: 69.32, text: "Ooh, I hate the feeling of my doubts, so I wanna die on top of my couch" },
        { time: 73.45, text: "Oh well, oh well, oh well" },
        { time: 77.63, text: "What do you want from me?" },
        { time: 79.38, text: "I'm never ever good for anything" },
        { time: 81.02, text: "Why do you talk to me?" },
        { time: 83.26, text: "I'll never ever buy a wedding ring" },
        { time: 85.76, text: "Take down all the mirrors in my house, I hate my nose, eyes and my mouth" },
        { time: 90.13, text: "I hate the jokes I laugh about, I hate the hoes I'm sad about" },
        { time: 95.33, text: "She calls up my phone, ringing, ringing, ringing, ringing" },
        { time: 99.09, text: "Baby, just leave me alone" },
        { time: 100.38, text: "She saw all my flaws" },
        { time: 101.44, text: "Baby, won't you tell me what the fuck I'm doing wrong?" }
    ],
    2: [
        { time: 0, text: " " },
        { time: 17.71, text: "Ты прекрасней первых двух глотков холодного пивка" },
        { time: 21.64, text: "Но в твоей дурной голове проблем безумно дохуя" },
        { time: 26.02, text: "Что-то ломается внутри, ты девочка-авария" },
        { time: 30.33, text: "Ты даже до конца не веришь, дура, реален ли я" },
        { time: 35.20, text: "А я вытащу тебя со дна, ведь только лишь одна" },
        { time: 40.93, text: "Мне ты нужна, чтоб чувствовать себя живым, блять" },
        { time: 45.47, text: "Я сгорю до тла, лишь бы ты могла" },
        { time: 50.26, text: "Хоть на крупицу быть ещё со мной счастливей" },
        { time: 71.43, text: "На твоей белой, как мазик, коже блядские порезы" },
        { time: 75.69, text: "Дай мне время и я приручу всех твоих диких бесов" },
        { time: 80.20, text: "Если надо, стану твоим личным псом-поводырём" },
        { time: 84.49, text: "И если ты упадёшь в яму, в яме мы сгниём вдвоём" },
        { time: 88.98, text: "А я вытащу тебя со дна, ведь только лишь одна" },
        { time: 95.15, text: "Мне ты нужна, чтоб чувствовать себя живым, блять" },
        { time: 99.77, text: "Я сгорю до тла, лишь бы ты могла" },
        { time: 104.00, text: "Хоть на крупицу быть ещё со мной счастливей" },
        { time: 107.56, text: "Я спущу огонь с небес в твои потухшие глаза" },
        { time: 111.47, text: "Я за тебя хоть в пиздорез, хоть в Рай, хоть в Ад я тоже за" },
        { time: 115.90, text: "Поверну время вспять, отстрою все сожжённые мосты" },
        { time: 120.38, text: "Я научу тебя опять ждать от любимого цветы" },
        { time: 125.09, text: "А я вытащу тебя со дна, ведь только лишь одна" },
        { time: 131.06, text: "Мне ты нужна, чтоб чувствовать себя живым, блять" },
        { time: 135.70, text: "Я сгорю до тла, лишь бы ты могла" },
        { time: 140.33, text: "Хоть на крупицу быть ещё со мной счастливей" }
    ],
    3: [
        { time: 0, text: " " },
        { time: 16.28, text: "без тебя я не могу дышать," },
        { time: 19.90, text: "я не могу уснуть, я не могу..." },
        { time: 24.56, text: "...возвращайся" },
        { time: 27.11, text: "я не могу дышать," },
        { time: 29.18, text: "я не могу уснуть, я не могу без тебя" },
        { time: 36.03, text: "я не могу дышать," },
        { time: 38.73, text: "я не могу уснуть" },
        { time: 42.79, text: "я не могу дышать," },
        { time: 47.67, text: "я не могу уснуть" },
        { time: 51.43, text: "без тебя я не могу дышать," },
        { time: 56.79, text: "я не могу уснуть" },
        { time: 60.83, text: "без тебя я не могу дышать," },
        { time: 65.37, text: "я не могу уснуть" },
        { time: 86.21, text: "без тебя я не могу дышать," },
        { time: 89.97, text: "я не могу уснуть, я не могу..." },
        { time: 95.25, text: "...возвращайся" },
        { time: 96.93, text: "я не могу дышать," },
        { time: 98.88, text: "я не могу уснуть, я не могу без тебя" },
        { time: 105.94, text: "я не могу дышать," },
        { time: 109.55, text: "я не могу уснуть" },
        { time: 113.28, text: "я не могу дышать," },
        { time: 117.52, text: "я не могу уснуть" },
        { time: 122.27, text: "без тебя я не могу дышать," },
        { time: 126.68, text: "я не могу уснуть" },
        { time: 130.87, text: "без тебя я не могу дышать," },
        { time: 135.34, text: "я не могу уснуть" },
        { time: 156.15, text: "без тебя я не могу дышать," },
        { time: 159.87, text: "я не могу уснуть, я не могу..." },
        { time: 164.41, text: "...возвращайся" },
        { time: 166.70, text: "я не могу дышать," },
        { time: 168.80, text: "я не могу уснуть, я не могу без тебя" },
        { time: 175.37, text: "я не могу дышать," },
        { time: 179.49, text: "я не могу уснуть" },
        { time: 183.18, text: "я не могу дышать," },
        { time: 187.60, text: "я не могу уснуть" }
    ],
    4: [
        { time: 0, text: " " },
        { time: 1.34, text: "Клубняк, её запомнит туалет" },
        { time: 3.80, text: "Она останется на одной из сторок, воу" },
        { time: 6.29, text: "Концерт, её любимый человек" },
        { time: 8.66, text: "Уже тусуется с шалавой дома" },
        { time: 10.93, text: "В клубе её подруги" },
        { time: 12.44, text: "Говорят то, что я ублюдок на её фоне" },
        { time: 15.36, text: "Ты плачешь, я не беру трубки, а что такого?" },
        { time: 18.60, text: "Одна бессмысленная ночь у телефона" },
        { time: 21.30, text: "В клубе её подруги" },
        { time: 23.42, text: "Говорят то, что я ублюдок на её фоне" },
        { time: 26.43, text: "Ты плачешь, я не беру трубки, а что такого?" },
        { time: 29.75, text: "Ты снова плачешь на одно из моих фото" },
        { time: 32.52, text: "Ты ещё газлайтишь меня, мне строишь глаза" },
        { time: 35.04, text: "И отмечаешь меня под каждой сторис" },
        { time: 37.43, text: "И почему-то твои друзья ненавидят меня" },
        { time: 40.21, text: "Но каждый день заходят на профиль" },
        { time: 43.48, text: "Малыш, в джинсах ED Hardy, давай, не стесняйся" },
        { time: 46.85, text: "Сходи с ума, сходи с ума, сходи с ума" },
        { time: 49.12, text: "Малыш, не думай влюбляться, уже пора" },
        { time: 51.99, text: "Сходи с ума, сходи с ума, сходи с ума" },
        { time: 54.69, text: "В клубе её подруги" },
        { time: 56.36, text: "Говорят то, что я ублюдок на её фоне" },
        { time: 58.95, text: "Ты плачешь, я не беру трубки, а что такого?" },
        { time: 61.85, text: "Одна бессмысленная ночь у телефона" },
        { time: 65.08, text: "В клубе её подруги" },
        { time: 67.30, text: "Говорят то, что я ублюдок на её фоне" },
        { time: 69.94, text: "Ты плачешь, я не беру трубки, а что такого?" },
        { time: 72.88, text: "Ты снова плачешь на одно из моих фото" },
        { time: 76.85, text: "В клубе её подруги" },
        { time: 78.27, text: "Говорят то, что я ублюдок на её фоне" },
        { time: 80.96, text: "Ты плачешь, я не беру трубки, а что такого?" },
        { time: 84.22, text: "Одна бессмысленная ночь у телефона" },
        { time: 87.62, text: "В клубе её подруги" },
        { time: 89.36, text: "Говорят то, что я ублюдок на её фоне" },
        { time: 91.98, text: "Ты плачешь, я не беру трубки, а что такого?" },
        { time: 94.76, text: "Ты снова плачешь на одно из моих фото" }
   ]
};

let currentTrackIndex = 0;
const audio = document.getElementById('audio-element');
const playBtn = document.getElementById('play-btn');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const trackTitle = document.getElementById('track-title');
const lyricLine1 = document.getElementById('lyric-line-1');
const lyricLine2 = document.getElementById('lyric-line-2');

function loadTrack(index) {
    if (audio) {
        audio.src = playlist[index].src;
        trackTitle.innerText = playlist[index].title;
        updateLyrics();
    }
}

function playTrack() {
    audio.play().then(() => {
        const playIcon = document.getElementById('play-icon-svg');
        if (playIcon) {
            // Меняем рисунок на иконку Паузы (две вертикальные полоски)
            playIcon.innerHTML = '<path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>';
        }
    }).catch(err => console.log("Нужен клик по экрану для запуска звука"));
}

function pauseTrack() {
    audio.pause();
    const playIcon = document.getElementById('play-icon-svg');
    if (playIcon) {
        // Возвращаем рисунок треугольника (Плей)
        playIcon.innerHTML = '<path d="M8 5v14l11-7z"/>';
    }
}


if (audio) {
    audio.addEventListener('timeupdate', updateLyrics);
}

function updateLyrics() {
    if (!audio || !lyricLine1 || !lyricLine2) return;

    const currentTime = audio.currentTime;
    const progressBar = document.getElementById('progress-bar');
    const currentTimeEl = document.getElementById('current-time');
    const totalTimeEl = document.getElementById('total-time');

    // 1. Обновление ползунка и циферок времени
    if (progressBar && currentTimeEl && totalTimeEl && !isNaN(audio.duration)) {
        const progressPercentage = (currentTime / audio.duration) * 100;
        progressBar.value = progressPercentage;

        const curMin = Math.floor(currentTime / 60);
        const curSec = Math.floor(currentTime % 60).toString().padStart(2, '0');
        currentTimeEl.innerText = `${curMin}:${curSec}`;

        const totMin = Math.floor(audio.duration / 60);
        const totSec = Math.floor(audio.duration % 60).toString().padStart(2, '0');
        totalTimeEl.innerText = `${totMin}:${totSec}`;
    }

    // 2. Логика караоке (Бегущие строки текста)
    const currentLyrics = lyricsData[currentTrackIndex] || [{ time: 0, text: " " }];

    let activeIndex = 0;
    for (let i = 0; i < currentLyrics.length; i++) {
        if (currentTime >= currentLyrics[i].time) {
            activeIndex = i;
        }
    }

    // Проверяем, если песня на самом старте и первая строка пустая
    if (currentTime === 0 || currentLyrics[activeIndex].text === " ") {
        lyricLine1.classList.remove('active');
        lyricLine1.style.color = "#8e8e93"; // Красим в серый, пока не началась
        lyricLine1.innerText = " ";

        if (currentLyrics[1]) {
            lyricLine2.innerText = currentLyrics[1].text;
            lyricLine2.style.display = "block";
        }
    } else {
        // Когда песня реально дошла до нужной секунды
        lyricLine1.style.color = ""; // Возвращаем яркий цвет из CSS
        lyricLine1.classList.add('active');
        lyricLine1.innerText = currentLyrics[activeIndex].text;

        if (activeIndex + 1 < currentLyrics.length) {
            lyricLine2.innerText = currentLyrics[activeIndex + 1].text;
            lyricLine2.style.display = "block";
            lyricLine2.classList.add('next');
        } else {
            lyricLine2.style.display = "none";
        }
    }
}

if (playBtn) {
    playBtn.addEventListener('click', () => {
        if (audio.paused) { playTrack(); } else { pauseTrack(); }
    });
}

if (nextBtn) {
    nextBtn.addEventListener('click', () => {
        currentTrackIndex = (currentTrackIndex + 1) % playlist.length;
        loadTrack(currentTrackIndex);
        playTrack();
    });
}

if (prevBtn) {
    prevBtn.addEventListener('click', () => {
        currentTrackIndex = (currentTrackIndex - 1 + playlist.length) % playlist.length;
        loadTrack(currentTrackIndex);
        playTrack();
    });
}

loadTrack(currentTrackIndex);

// 4. Расчет времени отношений
const startDate = new Date('2025-11-28T00:00:00');
const counterBtn = document.getElementById('counter-btn');

if (counterBtn) {
    counterBtn.addEventListener('click', function() {
        const resultDiv = document.getElementById('counter-result');

        function updateCounter() {
            const diff = new Date() - startDate;
            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
            const minutes = Math.floor((diff / 1000 / 60) % 60);
            const seconds = Math.floor((diff / 1000) % 60);

            if (resultDiv) {
                resultDiv.innerHTML = `
                    Мы счастливы вместе:<br>
                    💖 <strong>${days}</strong> дн.
                    <strong>${hours}</strong> ч.
                    <strong>${minutes}</strong> мин.
                    <strong>${seconds}</strong> сек.
                `;
            }
        }

        updateCounter();
        setInterval(updateCounter, 1000);
        this.style.display = 'none';
    });
}

// 5. Мини-игра "Поймай сердце"
const heart = document.getElementById('heart-target');
const winMsg = document.getElementById('game-win-msg');
let clicks = 0;

if (heart) {
    heart.addEventListener('mouseenter', moveHeart);
    heart.addEventListener('click', () => {
        clicks++;
        if (clicks < 5) {
            moveHeart();
        } else {
            heart.style.display = 'none';
            if (winMsg) {
                winMsg.style.display = 'block';
            }
        }
    });
}

function moveHeart() {
    if (clicks >= 5 || !heart) return;
    const x = Math.random() * 80;
    const y = Math.random() * 60;
    heart.style.left = `${x}%`;
    heart.style.top = `${y}%`;
}
// Перемотка песни при движении ползунка
const progressBar = document.getElementById('progress-bar');
if (progressBar) {
    progressBar.addEventListener('input', function() {
        if (audio && !isNaN(audio.duration)) {
            // Считаем секунды на основе сдвига ползунка (от 0 до 100)
            const newTime = (this.value / 100) * audio.duration;
            audio.currentTime = newTime;
        }
    });
}
