import exampleIconUrl from "./noun-paperclip-7598668-00449F.png";
import "./style.css";

document.body.innerHTML = `
  <p>Example image asset: <img src="${exampleIconUrl}" class="icon" /></p>
`;

// Now add the button (won't be wiped out because it's appended after)
const button = document.createElement('button');
button.textContent = 'Talk';
document.body.appendChild(button);
