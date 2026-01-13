// ==============================
// GLOBAL
// ==============================
let mediaItems = [];
let currentMediaIndex = 0;

// ==============================
// INIT
// ==============================
document.addEventListener('DOMContentLoaded', () => {
    setupSidebar();
    setupMenuNavigation();
    setupCakeInteraction();
    setupInfoModal();
    setupCountdown();
    setupRandomEffects();
    setupMediaModal();
    setupLetterVideoButton();
    initializeGallery();
});

// ==============================
// SIDEBAR
// ==============================
function setupSidebar() {
    const sidebar = document.getElementById('sidebar');
    const burger = document.getElementById('burgerMenu');
    const toggle = document.getElementById('sidebarToggle');
    if (!sidebar || !burger || !toggle) return;

    [burger, toggle].forEach(btn => {
        btn.onclick = e => {
            e.stopPropagation();
            sidebar.classList.toggle('active');
            document.body.style.overflow = sidebar.classList.contains('active') ? 'hidden' : '';
        };
    });

    document.addEventListener('click', e => {
        if (sidebar.classList.contains('active') && !sidebar.contains(e.target)) {
            sidebar.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// ==============================
// MENU
// ==============================
function setupMenuNavigation() {
    document.querySelectorAll('.menu-item').forEach(item => {
        item.onclick = () => {
            document.querySelectorAll('.menu-item').forEach(i => i.classList.remove('active'));
            document.querySelectorAll('.content-section').forEach(s => s.classList.remove('active'));
            item.classList.add('active');
            document.getElementById(item.dataset.section).classList.add('active');
        };
    });
}

// ==============================
// CAKE
// ==============================
function setupCakeInteraction() {
    const cake = document.getElementById('cake');
    const container = document.getElementById('heartsContainer');
    if (!cake || !container) return;

    // SINGLE CLICK → HEARTS
    cake.onclick = () => {
        for (let i = 0; i < 6; i++) {
            setTimeout(() => {
                const h = document.createElement('div');
                h.className = 'heart-particle';
                h.innerHTML = '💙';
                h.style.left = Math.random() * 100+'%';
                h.style.bottom = '0';
                container.appendChild(h);
                setTimeout(() => h.remove(), 10000);
            }, i * 120);
        }
    };

    // DOUBLE CLICK → FIREWORKS
    cake.ondblclick = () => {
        spawnFireworks();
    };
}

function spawnFireworks() {
    const fwContainer = document.body;

    for (let i = 0; i < 18; i++) {
        const f = document.createElement('div');
        f.className = 'firework-particle';
        f.innerHTML = '✨';

        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * 220 + 80;

        f.style.left = '50vw';
        f.style.top = '50vh';
        f.style.setProperty('--x', Math.cos(angle) * distance + 'px');
        f.style.setProperty('--y', Math.sin(angle) * distance + 'px');

        fwContainer.appendChild(f);
        setTimeout(() => f.remove(), 1400);
    }
}

// ==============================
// GALLERY (PHOTO + VIDEO EMOJI)
// ==============================
function initializeGallery() {
    const gallery = document.querySelector('.gallery-container');
    const count = document.querySelector('.count');
    gallery.innerHTML = '';
    mediaItems = [];

    // FOTO 1–100
 mediaItems = [];

// FOTO 1–83
for (let i = 1; i <= 83; i++) {
    mediaItems.push({
        type: 'photo',
        src: `media/${i}.webp`,
        title: 'Memory'
    });
}

// VIDEO 84–91
for (let i = 84; i <= 91; i++) {
    mediaItems.push({
        type: 'video',
        src: `media/${i}.mp4`,
        title: 'Video 📹'
    });
}

// FOTO 92–102
for (let i = 92; i <= 102; i++) {
    mediaItems.push({
        type: 'photo',
        src: `media/${i}.webp`,
        title: 'Memory'
    });
}

// VIDEO 103
mediaItems.push({
    type: 'video',
    src: `media/103.mp4`,
    title: 'Video 📹'
});

    count.textContent = `${mediaItems.length} memories`;

    const grid = document.createElement('div');
    grid.className = 'media-grid';
    gallery.appendChild(grid);

    mediaItems.forEach((item, index) => {
        const el = document.createElement('div');
        el.className = 'gallery-item';

        if (item.type === 'photo') {
            const img = document.createElement('img');
            img.src = item.src;
            img.loading = 'lazy';
            el.appendChild(img);
        } else {
            el.innerHTML = `
                <div style="
                    width:100%;
                    height:100%;
                    display:flex;
                    flex-direction:column;
                    align-items:center;
                    justify-content:center;
                    background:rgba(255,255,255,0.08);
                    border-radius:14px;
                    font-size:18px;
                    gap:8px;
                ">
                    <div style="font-size:38px;">📹</div>
                    <div>Video</div>
                </div>
            `;
        }

        el.onclick = () => openMediaModal(index);
        grid.appendChild(el);
    });
}

// ==============================
// MODAL
// ==============================
function setupMediaModal() {
    const modal = document.getElementById('mediaModal');
    const body = modal.querySelector('.modal-body');
    const close = modal.querySelector('.close');
    const prev = modal.querySelector('.prev-btn');
    const next = modal.querySelector('.next-btn');

    window.openMediaModal = index => {
        currentMediaIndex = index;
        body.innerHTML = '';
        const item = mediaItems[index];

        if (item.type === 'photo') {
            const img = document.createElement('img');
            img.src = item.src;
            body.appendChild(img);
        } else {
            const video = document.createElement('video');
            video.src = item.src;
            video.controls = true;
            video.autoplay = true;
            body.appendChild(video);
        }

        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    close.onclick = () => {
        modal.classList.remove('active');
        body.innerHTML = '';
        document.body.style.overflow = '';
    };

    prev.onclick = () =>
        openMediaModal((currentMediaIndex - 1 + mediaItems.length) % mediaItems.length);
    next.onclick = () =>
        openMediaModal((currentMediaIndex + 1) % mediaItems.length);
}

// ==============================
// COUNTDOWN (DAY / MINUTE / SECOND MODE)
// ==============================
function setupCountdown() {
    // target janji kalian (tetap 2035 sesuai cerita)
    const target = new Date('2035-01-01T00:00:00');

    // sembunyikan elemen Years & Hours (UI sesuai permintaan)
    try {
        const yearsEl = document.getElementById('years');
        const hoursEl = document.getElementById('hours');
        if (yearsEl) yearsEl.closest('.countdown-item').style.display = 'none';
        if (hoursEl) hoursEl.closest('.countdown-item').style.display = 'none';
    } catch (e) {
        // kalau closest gagal, ignore
    }

    // update setiap detik
    setInterval(() => {
        const now = new Date();
        let diff = target - now;
        if (diff < 0) diff = 0;

        // total days left (SEMUA hari tersisa sampai target)
        const dayMs = 1000 * 60 * 60 * 24;
        const totalDays = Math.floor(diff / dayMs);

        // sisa menit & detik di waktu sekarang (dalam menit & detik sisa jam)
        const minutes = Math.floor((diff / (1000 * 60)) % 60);
        const seconds = Math.floor((diff / 1000) % 60);

        // tampilkan ke UI
        const daysEl = document.getElementById('days');
        const minutesEl = document.getElementById('minutes');
        const secondsEl = document.getElementById('seconds');

        if (daysEl) daysEl.textContent = String(totalDays).padStart(1, '0');
        if (minutesEl) minutesEl.textContent = String(minutes).padStart(2, '0');
        if (secondsEl) secondsEl.textContent = String(seconds).padStart(2, '0');
    }, 1000);
}

function setupInfoModal() {
    const infoBtn = document.querySelector('.info-btn');
    const infoModal = document.getElementById('infoModal');
    if (!infoBtn || !infoModal) return;

    const closeBtn = infoModal.querySelector('.close');

    infoBtn.onclick = e => {
        e.stopPropagation();
        infoModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    closeBtn.onclick = () => {
        infoModal.classList.remove('active');
        document.body.style.overflow = '';
    };

    infoModal.onclick = e => {
        if (e.target === infoModal) {
            infoModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    };
}

function setupRandomEffects() {}

// ==============================
// LETTER: tambah tombol Video Ucapan & handler
// ==============================
function setupLetterVideoButton() {
    const letterBody = document.querySelector('.letter-body');
    if (!letterBody) return;

    // Cek kalau tombol sudah ada, hindari duplikat
    if (document.getElementById('playGreetingBtn')) return;

    // buat tombol
    const btn = document.createElement('button');
    btn.id = 'playGreetingBtn';
    btn.type = 'button';
    btn.textContent = 'Play Greeting Video';
    btn.style.cssText = `
        margin-top: 10px;
        padding: 10px 16px;
        background: linear-gradient(90deg,#ffe066,#ffcf40);
        color: #0d47a1;
        border: none;
        border-radius: 12px;
        font-weight: 700;
        cursor: pointer;
        box-shadow: 0 8px 20px rgba(0,0,0,0.15);
    `;

    // append ke bawah signature (atau di letterBody)
    letterBody.appendChild(btn);

    // event click: buka modal dan mainkan video
    btn.addEventListener('click', function (e) {
        e.preventDefault();
        const videoSrc = 'https://files.catbox.moe/2c4weq.mp4';
        openVideoModalWithSrc(videoSrc);
    });
}

// Helper: buka modal yg sama (mediaModal) dan isi dengan video src
function openVideoModalWithSrc(src) {
    const mediaModal = document.getElementById('mediaModal');
    if (!mediaModal) return;

    const modalBody = mediaModal.querySelector('.modal-body');
    if (!modalBody) return;

    // kosongkan dahulu
    modalBody.innerHTML = '';

    // buat video element
    const video = document.createElement('video');
    video.src = src;
    video.controls = true;
    video.autoplay = true; // autoplay akan berjalan karena user menekan tombol
    video.playsInline = true;
    video.style.width = '100%';
    video.style.height = 'auto';
    video.muted = false; // biarkan ada suara (user klik modal sehingga browser biasanya izinkan)
    video.setAttribute('preload', 'auto');

    modalBody.appendChild(video);

    // tampilkan modal
    mediaModal.classList.add('active');
    document.body.style.overflow = 'hidden';

    // berhenti & reset saat modal ditutup (modal close handler di setupMediaModal akan clear modal-body)
    video.focus();
}