console.log("SCRIPT VERSION: CLEAN ASCII RAMP LOADED");

const uploadInput = document.getElementById('upload');
const asciiContainer = document.getElementById('ascii-art');

// Your exact character set from Python
const ASCII_CHARS = " ░░▒▒▓▓██";

uploadInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
            renderToAscii(img);
        };
        img.src = event.target.result;
    };
    reader.readAsDataURL(file);
});

function renderToAscii(img) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    // Logic from your resize_image function
    const newWidth = 100;
    const ratio = img.height / img.width;
    // Using your 0.55 multiplier for height
    const newHeight = Math.floor(newWidth * ratio * 0.55);

    canvas.width = newWidth;
    canvas.height = newHeight;

    // Draw the uploaded image to our invisible canvas
    ctx.drawImage(img, 0, 0, newWidth, newHeight);

    // Get the raw pixel data (RGBA)
    const imageData = ctx.getImageData(0, 0, newWidth, newHeight);
    const pixels = imageData.data;

    let asciiResult = "";

    for (let y = 0; y < newHeight; y++) {
        for (let x = 0; x < newWidth; x++) {
            const index = (y * newWidth + x) * 4;
            const r = pixels[index];
            const g = pixels[index + 1];
            const b = pixels[index + 2];

            // grayify logic: standard luminance formula
            const brightness = (0.299 * r + 0.587 * g + 0.114 * b);

            // pixels_to_ascii logic: mapping 0-255 to your character string
            const charIndex = Math.floor((brightness * (ASCII_CHARS.length - 1)) / 255);
            const char = ASCII_CHARS[charIndex];

            // Color support: wrap character in a span with its original pixel color
            asciiResult += `<span style="color: rgb(${r},${g},${b})">${char}</span>`;
        }
        asciiResult += "\n";
    }

    asciiContainer.innerHTML = asciiResult;
}


<script src="script.js"></script>
