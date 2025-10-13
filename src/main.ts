import exampleIconUrl from "./noun-paperclip-7598668-00449F.png";
import "./style.css";

// Set initial game state
let counter = 0;
let growthRate = 0;

// Create UI elements

const clickButton = document.createElement("button");
clickButton.textContent = "Click me to clip me!";

const counterDisplay = document.createElement("div");
counterDisplay.textContent = `Clips: ${counter}`;

const upgradeButton = document.createElement("button");
upgradeButton.textContent = "Buy Auto-Clipper (10)";
upgradeButton.disabled = true; // Start disabled

const hairButton = document.createElement("button");
hairButton.textContent = "Buy Hair-Clipper (20)";
hairButton.disabled = true; // Start disabled

const bullButton = document.createElement("button");
bullButton.textContent = "Buy Bulldog-Clipper (30)";
bullButton.disabled = true; // Start disabled

const growthDisplay = document.createElement("div");
growthDisplay.textContent = `Growth rate: ${growthRate}`;

// Add content to page
document.body.innerHTML =
  `<p>Example image asset: <img src="${exampleIconUrl}" class="icon" /></p>`;
document.body.appendChild(clickButton);
document.body.appendChild(counterDisplay);
document.body.appendChild(upgradeButton);
document.body.appendChild(hairButton);
document.body.appendChild(bullButton);
document.body.appendChild(growthDisplay);

// Update display function
const updateDisplay = () => {
  counterDisplay.textContent = `Clips: ${counter}`;
  growthDisplay.textContent = `Growth rate: ${growthRate}`;
  upgradeButton.disabled = counter < 10;
  hairButton.disabled = counter < 20;
  bullButton.disabled = counter < 30;
};

// Click to increase counter
clickButton.addEventListener("click", () => {
  counter++;
  updateDisplay();
});

// Purchase auto-increment upgrade
upgradeButton.addEventListener("click", () => {
  if (counter >= 10) {
    counter -= 10;
    growthRate++;
    updateDisplay();
  }
});

hairButton.addEventListener("click", () => {
  if (counter >= 20) {
    counter -= 20;
    growthRate += 2;
    updateDisplay();
  }
});

bullButton.addEventListener("click", () => {
  if (counter >= 30) {
    counter -= 30;
    growthRate += 3;
    updateDisplay();
  }
});

// Animation loop with delta time
let lastTime = performance.now();

const animate = (currentTime: number) => {
  const deltaTime = currentTime - lastTime;
  if (deltaTime >= 1000) {
    counter += growthRate;
    updateDisplay();
    lastTime = currentTime;
  }
  requestAnimationFrame(animate);
};

requestAnimationFrame(animate);
