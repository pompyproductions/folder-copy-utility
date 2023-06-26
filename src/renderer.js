// import './index.css';
import "./sass/styles.scss"

console.log('👋 This message is being logged by "renderer.js", included via webpack');

const elem = document.createElement("p");
elem.textContent = "boppity bippity";

document.querySelector("body").append(elem)