import exampleIconUrl from "./noun-paperclip-7598668-00449F.png";
import "./style.css";

// Types
interface Item {
  name: string;
  baseCost: number;
  rate: number;
  count: number;
  price: number; // current price
  description: string;
}

// --- Breathing animation variables ---
let iconScale = 1;
let scaleRate = 0.0015;
const minScale = 1;
const maxScale = 1.1;

// State
let clipCount = 0;
let growthRate = 0;

// Items
const availableItems: Item[] = [
  {
    name: "Paper Clip",
    baseCost: 10,
    rate: 1,
    count: 0,
    price: 10,
    description: "Still holding on by a thread with the original",
  },
  {
    name: "Staple Clip",
    baseCost: 20,
    rate: 2,
    count: 0,
    price: 20,
    description: "More commitment to durability",
  },
  {
    name: "Magnetic Clip",
    baseCost: 30,
    rate: 3,
    count: 0,
    price: 30,
    description: "Magnetics are too cool",
  },
  {
    name: "Binder Clip",
    baseCost: 40,
    rate: 4,
    count: 0,
    price: 40,
    description: "Organizational Justice",
  },
  {
    name: "Claw Clip",
    baseCost: 50,
    rate: 5,
    count: 0,
    price: 50,
    description: "The beast that will attach way more",
  },
];

// UI Elements
const clickButton = document.createElement("button");
clickButton.textContent = "Click me to clip me!";

const counterDisplay = document.createElement("div");
counterDisplay.textContent = `Clips: ${clipCount}`;

const growthDisplay = document.createElement("div");
growthDisplay.textContent = `Growth rate: ${growthRate}`;

// Helper Functions
const updateItemButton = (button: HTMLButtonElement, item: Item) => {
  button.textContent = `Buy ${item.name} (${item.price})`;
  button.disabled = clipCount < item.price;
};

// To hold each item’s button + display elements
const itemElements: {
  button: HTMLButtonElement;
  display: HTMLDivElement;
}[] = [];

// Updates all UI elements to reflect current game state; called on each animation frame
const updateDisplay = () => {
  counterDisplay.textContent = `Clips: ${clipCount}`;
  growthDisplay.textContent = `Growth rate: ${growthRate}`;
  itemElements.forEach((el, i) => {
    const item = availableItems[i];
    el.display.textContent = `${item.name}s: ${item.count}`;
    updateItemButton(el.button, item);
  });
};

// Build Page Content
// Build Page Content
document.body.innerHTML = ""; // start clean
const imageContainer = document.createElement("div");
imageContainer.innerHTML =
  `<p>Example image asset: <img src="${exampleIconUrl}" class="icon" /></p>`;
document.body.appendChild(imageContainer);

document.body.appendChild(clickButton);
document.body.appendChild(counterDisplay);
document.body.appendChild(growthDisplay);

// Create all item buttons and displays dynamically
// Create all item buttons and displays dynamically
availableItems.forEach((item) => {
  const button = document.createElement("button");
  const display = document.createElement("div");

  // ✅ Add gray button styling
  button.classList.add("upgrade-btn");

  // Initialize text
  updateItemButton(button, item);
  display.textContent = `${item.name}s: ${item.count}`;

  // Purchase event
  button.addEventListener("click", () => {
    if (clipCount >= item.price) {
      clipCount -= item.price;
      growthRate += item.rate;
      item.count++;
      item.price *= 2;
      updateDisplay();
    }
  });

  // Add to page
  document.body.appendChild(button);
  document.body.appendChild(display);

  // Track for later updates
  itemElements.push({ button, display });
});

// Game Logic

// Clicking adds to counter manually
clickButton.addEventListener("click", () => {
  clipCount++;
  updateDisplay();
});

// Passive income loop
let lastTime = performance.now();

const animate = (currentTime: number) => {
  const deltaTime = currentTime - lastTime;
  if (deltaTime >= 1000) {
    clipCount += growthRate;
    updateDisplay();
    lastTime = currentTime;
  }

  // --- Add breathing animation to the main icon ---
  const iconElement = document.querySelector(".icon") as HTMLElement;
  if (iconElement) {
    iconScale += scaleRate * (deltaTime / 16.67); // normalize for smoothness
    if (iconScale > maxScale || iconScale < minScale) {
      scaleRate *= -1; // reverse direction when limits hit
    }
    iconElement.style.transform = `scale(${iconScale})`;
  }
  requestAnimationFrame(animate);
};

requestAnimationFrame(animate);
