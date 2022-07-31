const c1 = (x, y) => 2 * x**2 + y**2;
const c2 = (x, y) => 0.25 * (x ** 2 + y ** 2);
const c3 = (x, y) => x **2 + 2 ** y;

function grid() {
  let start_x = 0;
  let start_y = 0;

  for (let i = 0; i < N_Y; i++) {
    start_x = 0;
    for (let j = 0; j < N_X; j++) {
      fill(255);
      rect(start_x, start_y, dx, dy);
      stroke(0);
      strokeWeight(1);
      start_x += dx;
    }
    start_y += dy;
  }
  circle(MID_X, MID_Y, 10);
  stroke(0);
}

function drawPoints(coordinate) {
  let start_x = 0;
  let start_y = 0;
  let index = 0;
  for (let i = N_UP; i >= -N_UP; i--) {
    start_x = 0;
    if (N_Y % 2 === 1 && i == 0) continue;
    for (let j = -N_LEFT; j <= N_LEFT; j++) {
      if (N_X % 2 === 1 && j == 0) continue;
      const point_ = coordinate.points[index];
      fill(point_.color);
      circle(start_x, start_y, 10);
      start_x += dx;
      index += 1;
    }
    start_y += dy;
  }
}

function setup() {
  // put setup code here
  createCanvas(width, height);
  coordinate = new Coordinate();
  console.log(coordinate.points);
  background(255);
}

function draw() {
  // put drawing code here
  let funcs = [[c1, [100, 100, 0]], [c2, [0, 100, 0]], [c3, [0, 0, 100]]];
  console.log(funcs);
  grid(coordinate);
  drawPoints(coordinate);
  MarchingSquares.draw(coordinate.points, funcs);
}