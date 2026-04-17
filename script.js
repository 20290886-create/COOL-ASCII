const button = document.getElementById('magicBtn');
const text = document.getElementById('message');

button.addEventListener('click', () => {
    text.innerText = "✨ The JavaScript is working! ✨";
    text.style.color = "blue";
    text.style.fontWeight = "bold";
});
