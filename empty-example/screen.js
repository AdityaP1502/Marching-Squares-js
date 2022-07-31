// Screen
const width = window.innerWidth;
const height = window.innerHeight;

console.log(width, height);

const aspectRatio = {
  width:16,
  height: 9,
}

// Images Resolution
const multiplier = 2;
const N_X = aspectRatio.width * multiplier;
const N_Y = aspectRatio.height * multiplier;

const N_LEFT = Math.floor((N_X + 1) / 2);
const N_UP = Math.floor((N_Y + 1) / 2);

console.log(N_LEFT, N_UP);

const dx = width / N_X;
const dy = height / N_Y;

console.log(dx, dy);

const MID_X = N_LEFT * dx + (((N_X + 1) % 2) - 1) * (0.5 * dx);
const MID_Y = N_UP * dy + (((N_Y + 1) % 2) - 1) * (0.5 * dy);