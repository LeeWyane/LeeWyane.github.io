// PLANETARY MOTION
// Math-based animation using sine, cosine, angles, and a changing variable.
let centerX;
let centerY;
let orbitRadius = 165;
let planetAngle = 0;
let moonAngle = 0;
let animationSpeed = 0.025;
let isPaused = false;
let stars = [];

function setup() {
  const canvas = createCanvas(800, 600);
  canvas.parent("canvas-holder");

  // The sun stays at the center of the canvas.
  centerX = width / 2; // 400
  centerY = height / 2; // 300

  // Create fixed star positions once, instead of changing them every frame.
  for (let i = 0; i < 90; i++) {
    stars.push({
      x: random(width),
      y: random(height),
      size: random(1, 3)
    });
  }
}

function draw() {
  background(5, 9, 24);

  drawStars();

  // Draw the orbit path and the central sun.
  noFill();
  stroke(75, 99, 145);
  strokeWeight(1.5);
  circle(centerX, centerY, orbitRadius * 2);

  noStroke();
  fill(255, 190, 70);
  circle(centerX, centerY, 76);

  // A soft-looking inner circle gives the sun a little visual detail.
  fill(255, 225, 135);
  circle(centerX - 10, centerY - 10, 25);

  // Convert the angle into x and y coordinates using cosine and sine.
  // Cosine controls horizontal movement; sine controls vertical movement.
  const planetX = centerX + orbitRadius * cos(planetAngle); // horizontal
  const planetY = centerY + orbitRadius * sin(planetAngle); // vertical

  // Draw a small orbit around the planet for its moon.
  noFill();
  stroke(110, 160, 205, 130);
  circle(planetX, planetY, 58);

  // Calculate the moon's position relative to the moving planet.
  const moonRadius = 29;
  const moonX = planetX + moonRadius * cos(moonAngle);
  const moonY = planetY + moonRadius * sin(moonAngle);

  // Draw the planet and its moon.
  noStroke();
  fill(65, 155, 245);
  circle(planetX, planetY, 38);

  fill(155, 210, 255);
  circle(planetX - 7, planetY - 7, 12);

  fill(220, 230, 245);
  circle(moonX, moonY, 12);

  // Display the current state and speed on the canvas.
  fill(235);
  textAlign(LEFT, TOP);
  textSize(16);
  text("PLANETARY MOTION", 20, 18);
  text("Speed: " + nf(animationSpeed, 1, 3), 20, 43);
  text(isPaused ? "PAUSED" : "RUNNING", 20, 68);

  // Update the angles only while the animation is running.
  // Increasing an angle makes the calculated position move around the circle.
  if (!isPaused) {
    planetAngle += animationSpeed;
    moonAngle += animationSpeed * 2.2;
  }
}

function drawStars() {
  noStroke();
  fill(190, 205, 235);
  for (let star of stars) {
    circle(star.x, star.y, star.size);
  }
}

function keyPressed() {
  // SPACE pauses or resumes the animation.
  if (key === " ") {
    isPaused = !isPaused;
  }

  // The up and down arrow keys adjust the angle change per frame.
  if (keyCode === UP_ARROW) {
    animationSpeed = min(animationSpeed + 0.005, 0.10);
  }

  if (keyCode === DOWN_ARROW) {
    animationSpeed = max(animationSpeed - 0.005, 0.005);
  }
}
