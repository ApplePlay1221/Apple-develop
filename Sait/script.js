// script.js
const canvas = document.getElementById('starfield');
const ctx = canvas.getContext('2d');

let stars = [];
const numStars = 200;

function init() {
    resizeCanvas();
    for (let i = 0; i < numStars; i++) {
        stars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 1.5,
            speed: Math.random() * 0.5 + 0.2,
            color: 'white',
            alpha: Math.random() * 0.5 + 0.5
        });
    }
    animate();
}

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Рисуем градиентный фон для космического эффекта
    const gradient = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, 0,
        canvas.width / 2, canvas.height / 2, Math.max(canvas.width, canvas.height) / 2
    );
    gradient.addColorStop(0, '#0f0c29');
    gradient.addColorStop(0.5, '#302b63');
    gradient.addColorStop(1, '#24243e');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Рисуем звёзды
    stars.forEach(star => {
        ctx.fillStyle = star.color;
        ctx.globalAlpha = star.alpha;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fill();

        star.y += star.speed;
        if (star.y > canvas.height) {
            star.y = 0;
            star.x = Math.random() * canvas.width;
            star.alpha = Math.random() * 0.5 + 0.5;
        }
    });
    ctx.globalAlpha = 1;

    requestAnimationFrame(animate);
}

window.addEventListener('resize', resizeCanvas);
init();

// Модальное окно
const modal = document.getElementById("modal");
const floatingButton = document.getElementById("floatingButton");
const closeButton = document.querySelector(".close");

floatingButton.onclick = function () {
    modal.style.display = "block";
}

closeButton.onclick = function () {
    modal.style.display = "none";
}

window.onclick = function (event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
}