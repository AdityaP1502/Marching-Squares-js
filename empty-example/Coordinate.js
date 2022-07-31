// Coordinate
let coordinate;

class Coordinate {
  constructor (x_max=4) {
    this.x_max = x_max;
    this.y_max = aspectRatio.height / aspectRatio.width * x_max
    this.inc_x = 2 * this.x_max / (N_X);
    this.first_x = (N_X + 1) % 2 ? this.inc_x : this.inc_x / 2;
    this.inc_y = 2 * this.y_max / (N_Y);
    this.first_y = (N_Y + 1) % 2 ? this.inc_y : this.inc_y / 2;
    this.points = [];
    this.createPoints();
  };

  createPoint(i, j) {
    let y = 0;
    let x = 0;

    if (i >= 1) y = (i - 1) * this.inc_y + this.first_y;
    if (i <= -1) y = (i + 1) * this.inc_y - this.first_y;
    if (j >= 1) x = (j - 1) * this.inc_x + this.first_x;
    if (j <= -1) x = (j + 1) * this.inc_x - this.first_x;

    return new Point(x, y);
  }

  createPoints() {
    for (let i = N_UP; i >= -N_UP; i--) { 
      if (N_Y % 2 === 1 && i == 0) continue;
      for (let j = -N_LEFT; j <= N_LEFT; j++) {
        if (N_X % 2 === 1 && j == 0) continue;
        const point_ = this.createPoint(i, j);
        this.points.push(point_);
      }
    }
  }

  convert(x, y) {
    const pix_x = (x + this.x_max) * (dx / this.inc_x);
    const pix_y = (this.y_max - y) * (dy / this.inc_y);
    return [pix_x, pix_y];
  }
}