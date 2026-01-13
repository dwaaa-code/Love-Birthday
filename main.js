// === NAVIGASI (GLOBAL) ===
function enterSite() {
  location.href = 'loader/loading-page.html';
}

// === DOM ===
document.addEventListener('DOMContentLoaded', () => {
  const welcomeCard = document.querySelector('.welcome-card');
  if (!welcomeCard) return;

  welcomeCard.addEventListener('mousemove', (e) => {
    const rect = welcomeCard.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;

    welcomeCard.style.transform =
      `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
  });

  welcomeCard.addEventListener('mouseleave', () => {
    welcomeCard.style.transform =
      'perspective(1000px) rotateX(3deg) rotateY(0deg) scale(1)';
  });
});
