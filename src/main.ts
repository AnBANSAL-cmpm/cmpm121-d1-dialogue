import exampleIconUrl from "./noun-paperclip-7598668-00449F.png";
import "./style.css";

// Track game state
let counter = 0;
let growthRate = 0;

// Create UI elements
const button = document.createElement("button");
button.textContent = "📎 Talk to AI";

const counterDisplay = document.createElement("div");
counterDisplay.textContent = `Paperclips: ${counter}`;

const upgradeButton = document.createElement("button");
upgradeButton.textContent = "Buy Auto-Clipper (10)";
upgradeButton.disabled = true;

// Append to page
document.body.innerHTML = `<p>Example image: <img src="${exampleIconUrl}" class="icon" /></p>`;
document.body.appendChild(button);
document.body.appendChild(counterDisplay);
document.body.appendChild(upgradeButton);

// Update display
const updateDisplay = () => {
  counterDisplay.textContent = `Paperclips: ${counter}`;
  upgradeButton.disabled = counter < 10;
};

// Click handler
button.addEventListener("click", () => {
  counter++;
  updateDisplay();
});

// Upgrade handler
upgradeButton.addEventListener("click", () => {
  if (counter >= 10) {
    counter -= 10;
    growthRate++;
    updateDisplay();
  }
});

// Animation loop with accurate timing
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
