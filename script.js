const moon = document.getElementById("moon");
const glow = document.getElementById("glow");
const screenWidth = window.innerWidth;
const screenHeight = window.innerHeight;

const directions = ["left-right", "right-left", "top-down", "bottom-up"];
const direction = directions[Math.floor(Math.random() * directions.length)];

let startX, startY, deltaX, deltaY;

switch (direction) {
  case "left-right":
    startX = -100;
    startY = screenHeight / 2;
    deltaX = 2;
    deltaY = 0;
    break;
  case "right-left":
    startX = screenWidth + 100;
    startY = screenHeight / 2;
    deltaX = -2;
    deltaY = 0;
    break;
  case "top-down":
    startX = screenWidth / 2;
    startY = -100;
    deltaX = 0;
    deltaY = 2;
    break;
  case "bottom-up":
    startX = screenWidth / 2;
    startY = screenHeight + 100;
    deltaX = 0;
    deltaY = -2;
    break;
}

let x = startX;
let y = startY;

function animateMoonLoop() {
  x += deltaX;
  y += deltaY;

  moon.style.transform = `translate(${x}px, ${y}px)`;
  glow.style.transform = `translate(${x}px, ${y}px)`;

  const offScreen =
    x < -150 || x > screenWidth + 150 ||
    y < -150 || y > screenHeight + 150;

  if (offScreen) {
    x = startX;
    y = startY;
  }

  requestAnimationFrame(animateMoonLoop);
}

animateMoonLoop();

////////////////////////
// Shooting Stars 🎇 //
////////////////////////
const canvas = document.getElementById("shooting-stars");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

const shootingStars = [];

function createShootingStar() {
  const x = Math.random() * canvas.width;
  const y = Math.random() * canvas.height / 2;
  const length = Math.random() * 100 + 50;
  const speed = Math.random() * 4 + 4;

  shootingStars.push({ x, y, length, speed, opacity: 1 });
}

function drawShootingStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  shootingStars.forEach((star, index) => {
    ctx.beginPath();
    ctx.moveTo(star.x, star.y);
    ctx.lineTo(star.x + star.length, star.y + star.length / 2);
    ctx.strokeStyle = `rgba(255, 255, 255, ${star.opacity})`;
    ctx.lineWidth = 2;
    ctx.stroke();

    star.x += star.speed;
    star.y += star.speed / 2;
    star.opacity -= 0.01;

    if (star.opacity <= 0) {
      shootingStars.splice(index, 1);
    }
  });

  requestAnimationFrame(drawShootingStars);
}

setInterval(createShootingStar, 1000);
drawShootingStars();
