import "./style.css";

const canvas = document.getElementById("my-canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth - 500; // leave room for controls
canvas.height = window.innerHeight ;

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth - 500; 
  canvas.height = window.innerHeight;
});

let connectionDistance = 250;
let circleCount = 30;
let speedMultiplier = 8;

const distanceSlider = document.getElementById("distanceSlider");
const distanceValue = document.getElementById("distanceValue");
distanceSlider.addEventListener("input", () => {
  connectionDistance = parseInt(distanceSlider.value);
  distanceValue.textContent = connectionDistance;
});

const circleSlider = document.getElementById("circleSlider");
const circleValue = document.getElementById("circleValue");
circleSlider.addEventListener("input", () => {
  circleCount = parseInt(circleSlider.value);
  circleValue.textContent = circleCount;
  resetCircles();
});

const speedSlider = document.getElementById("speedSlider");
const speedValue = document.getElementById("speedValue");
speedSlider.addEventListener("input", () => {
  speedMultiplier = parseInt(speedSlider.value);
  speedValue.textContent = speedMultiplier;
  circlesArray.forEach((c) => {
    c.speedX = (Math.random() * 2 - 1) * speedMultiplier;
    c.speedY = (Math.random() * 2 - 1) * speedMultiplier;
  });
});

class Circle {
  constructor() {
    this.y = Math.random() * canvas.height;
    this.x = Math.random() * canvas.width;
    this.radius = Math.random() * 10 + 5;
    this.speedX = (Math.random() * 2 - 1) * speedMultiplier;
    this.speedY = (Math.random() * 2 - 1) * speedMultiplier;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.x >= canvas.width || this.x <= 0) this.speedX *= -1;
    if (this.y >= canvas.height || this.y <= 0) this.speedY *= -1;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.lineWidth = 5;
    ctx.strokeStyle = "black";
    ctx.stroke();
    ctx.fillStyle = "white";
    ctx.fill();
  }
}

let circlesArray = [];
function resetCircles() {
  circlesArray = [];
  for (let i = 0; i < circleCount; i++) {
    circlesArray.push(new Circle());
  }
}

resetCircles();

function getDistance(x1, y1, x2, y2) {
  const a = x1 - x2;
  const b = y1 - y2;
  return Math.sqrt(a * a + b * b);
}

function animate() {
  ctx.fillStyle = "rgba(255, 255, 255, 0.1)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < circlesArray.length; i++) {
    const circle1 = circlesArray[i];
    for (let j = i + 1; j < circlesArray.length; j++) {
      const circle2 = circlesArray[j];
      const dist = getDistance(circle1.x, circle1.y, circle2.x, circle2.y);
      if (dist < connectionDistance) {
        ctx.beginPath();
        ctx.lineWidth = 10 - dist / 25;
        ctx.strokeStyle = "black";
        ctx.moveTo(circle1.x, circle1.y);
        ctx.lineTo(circle2.x, circle2.y);
        ctx.stroke();
      }
    }
  }

  circlesArray.forEach((c) => {
    c.update();
    c.draw();
  });

  requestAnimationFrame(animate);
}

animate();
