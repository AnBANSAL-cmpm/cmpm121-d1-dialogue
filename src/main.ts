import exampleIconUrl from "./noun-paperclip-7598668-00449F.png";
import "./style.css";
document.body.innerHTML = <p>Example image asset: <img src="${exampleIconUrl}" class="icon" /></p>;
const button = document.createElement("button");
button.textContent = "Talk";
document.body.appendChild(button);

const button = document.createElement("button");
button.textContent = "Click me to clip me!";
document.body.appendChild(button);

let counter = 0;
const counterDisplay = document.createElement("div");
counterDisplay.textContent = `Clips: ${counter}`;
document.body.appendChild(counterDisplay);

button.addEventListener("click", () => {
  counter++;
  counterDisplay.textContent = `Clips: ${counter}`;
});
let lastTime = performance.now();

const animate = (currentTime: number) => {
  const deltaTime = currentTime - lastTime;
  if (deltaTime >= 1000) { // ~1 second passed
    counter++;
    counterDisplay.textContent = `Clips: ${counter}`;
    lastTime = currentTime;
  }
  requestAnimationFrame(animate);
};

requestAnimationFrame(animate);

let growthRate = 0; // units per second (starts at 0)
lastTime = performance.now(); // reset timer

// Upgrade button
const upgradeButton = document.createElement("button");
upgradeButton.textContent = "Buy Auto-Clipper ($10)";
upgradeButton.disabled = true; // disable if can't afford
document.body.appendChild(upgradeButton);

// Update display logic
const updateDisplay = () => {
  counterDisplay.textContent = `Clips: ${counter}`;
  upgradeButton.disabled = counter < 10;
};

// Reattach click listener with updated update logic
button.addEventListener("click", () => {
  counter++;
  updateDisplay();
});

// Upgrade click handler
upgradeButton.addEventListener("click", () => {
  if (counter >= 10) {
    counter -= 10;
    growthRate += 1;
    updateDisplay();
  }
});

// Replace previous animation loop:
requestAnimationFrame(function animate(currentTime) {
  const deltaTime = currentTime - lastTime;
  if (deltaTime >= 1000) {
    counter += growthRate; // now grows based on upgrades
    updateDisplay();
    lastTime = currentTime;
  }
  requestAnimationFrame(animate);
});
