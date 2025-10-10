import exampleIconUrl from "./noun-paperclip-7598668-00449F.png";
import "./style.css";

document.body.innerHTML = `
  <p>Example image asset: <img src="${exampleIconUrl}" class="icon" /></p>
`;

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
setInterval(() => {
  counter++;
  counterDisplay.textContent = `Clips: ${counter}`;
}, 1000);
