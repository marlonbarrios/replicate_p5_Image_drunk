var img;
var startAnimation = true; // Variable to toggle animation
var noiseOffsetX = 0.0; // Offset for Perlin noise in X
var noiseOffsetY = 10.0; // Offset for Perlin noise in Y (different offset for Y to ensure variety)

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);

  generateImage();
  setInterval(generateImage, 20000); // 20 seconds
}

async function generateImage() {
  const response = await fetch('https://queer-cards-7n7zjm3eg-marlonbarrios.vercel.app/api/image', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ prompt: 'imagecreated by  wes anderson film art style of for saint valentine day, queer, realistic' }),
  });
  const data = await response.json();
  console.log(data);
  img = loadImage('data:image/png;base64,' + data.image, function() {
    redraw(); // Forces redraw when the image is loaded
  });
}

function draw() {
  background(0, 5);
  if (img && startAnimation) {
    var minTiles = 1;
    var maxTiles = 15;

    // Use Perlin noise for tile count variation
    var tileCountX = max(minTiles, min(maxTiles, noise(noiseOffsetX) * 10 + 1));
    var tileCountY = max(minTiles, min(maxTiles, noise(noiseOffsetY) * 10 + 1));

    var stepX = width / tileCountX;
    var stepY = height / tileCountY;

    for (var gridY = 0; gridY < height; gridY += stepY) {
      for (var gridX = 0; gridX < width; gridX += stepX) {
        image(img, gridX, gridY, stepX, stepY);
      }
    }

    // Increment noise offsets for continuous change
    noiseOffsetX += 0.01;
    noiseOffsetY += 0.01;
  }
}

function keyPressed() {
  // Toggle startAnimation when space bar is pressed
  if (key === ' ') {
    startAnimation = !startAnimation;
    if (startAnimation) {
      loop(); // Restart the draw loop
    } else {
      noLoop(); // Stop the draw loop
    }
  }
}
