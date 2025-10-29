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

// State
let counter = 0;
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
counterDisplay.textContent = `Clips: ${counter}`;

const growthDisplay = document.createElement("div");
growthDisplay.textContent = `Growth rate: ${growthRate}`;

// Helper Functions
const updateItemButton = (button: HTMLButtonElement, item: Item) => {
  button.textContent = `Buy ${item.name} (${item.price})`;
  button.disabled = counter < item.price;
};

// To hold each item’s button + display elements
const itemElements: {
  button: HTMLButtonElement;
  display: HTMLDivElement;
}[] = [];

// Updates all UI elements to reflect current game state; called on each animation frame
const updateDisplay = () => {
  counterDisplay.textContent = `Clips: ${counter}`;
  growthDisplay.textContent = `Growth rate: ${growthRate}`;
  itemElements.forEach((el, i) => {
    const item = availableItems[i];
    el.display.textContent = `${item.name}s: ${item.count}`;
    updateItemButton(el.button, item);
  });
};

// Build Page Content
document.body.innerHTML =
  `<p>Example image asset: <img src="${exampleIconUrl}" class="icon" /></p>`;
document.body.appendChild(clickButton);
document.body.appendChild(counterDisplay);
document.body.appendChild(growthDisplay);

// Create all item buttons and displays dynamically
availableItems.forEach((item) => {
  const button = document.createElement("button");
  const display = document.createElement("div");

  // Initialize text
  updateItemButton(button, item);
  display.textContent = `${item.name}s: ${item.count}`;

  // Purchase event
  button.addEventListener("click", () => {
    if (counter >= item.price) {
      counter -= item.price;
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
  counter++;
  updateDisplay();
});

// Passive income loop
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
