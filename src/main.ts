import exampleIconUrl from "./noun-paperclip-7598668-00449F.png";
import "./style.css";

// Set initial game state
let counter = 0;
let growthRate = 0;
let numPaper = 0;
let numHair = 0;
let numBull = 0;
let paperPrice = 10;

// Create UI elements

const clickButton = document.createElement("button");
clickButton.textContent = "Click me to clip me!";

const counterDisplay = document.createElement("div");
counterDisplay.textContent = `Clips: ${counter}`;

const paperButton = document.createElement("button");
paperButton.textContent = `Buy Paper Clip (${paperPrice})`;
paperButton.disabled = true; // Start disabled

const hairButton = document.createElement("button");
hairButton.textContent = "Buy Hair Clip (20)";
hairButton.disabled = true; // Start disabled

const bullButton = document.createElement("button");
bullButton.textContent = "Buy Bulldog Clip (30)";
bullButton.disabled = true; // Start disabled

const growthDisplay = document.createElement("div");
growthDisplay.textContent = `Growth rate: ${growthRate}`;

const paperDisplay = document.createElement("div");
paperDisplay.textContent = `Paper Clips : ${numPaper}`;

const hairDisplay = document.createElement("div");
hairDisplay.textContent = `Hair Clips : ${numHair}`;

const bullDisplay = document.createElement("div");
bullDisplay.textContent = `Bull Clips : ${numBull}`;

// Add content to page
document.body.innerHTML =
  `<p>Example image asset: <img src="${exampleIconUrl}" class="icon" /></p>`;
document.body.appendChild(clickButton);
document.body.appendChild(counterDisplay);
document.body.appendChild(paperButton);
document.body.appendChild(hairButton);
document.body.appendChild(bullButton);
document.body.appendChild(growthDisplay);
document.body.appendChild(paperDisplay);
document.body.appendChild(hairDisplay);
document.body.appendChild(bullDisplay);

// Update display function
const updateDisplay = () => {
  counterDisplay.textContent = `Clips: ${counter}`;
  growthDisplay.textContent = `Growth rate: ${growthRate}`;
  paperDisplay.textContent = `Paper Clips : ${numPaper}`;
  hairDisplay.textContent = `Hair Clips : ${numHair}`;
  bullDisplay.textContent = `Bull Clips : ${numBull}`;
  paperButton.disabled = counter < paperPrice;
  hairButton.disabled = counter < 20;
  bullButton.disabled = counter < 30;
  paperButton.textContent = `Buy Paper Clip (${paperPrice})`;
};

// Click to increase counter
clickButton.addEventListener("click", () => {
  counter++;
  updateDisplay();
});

// increment
paperButton.addEventListener("click", () => {
  if (counter >= paperPrice) {
    counter -= paperPrice;
    growthRate++;
    numPaper++;
    paperPrice *= 2;
    updateDisplay();
  }
});

hairButton.addEventListener("click", () => {
  if (counter >= 20) {
    counter -= 20;
    growthRate += 2;
    numHair++;
    updateDisplay();
  }
});

bullButton.addEventListener("click", () => {
  if (counter >= 30) {
    counter -= 30;
    growthRate += 3;
    numBull++;
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
