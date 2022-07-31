let engine;
class MarchingSquares {
  constructor(points, func, color) {
    this.squares = [];
    this.setPoints(func, color);
    this.createGrid(points);
  }

  setPoints(func, color) {
    let index = 0;
    for (let i = N_UP; i >= -N_UP; i--) {
      if (N_Y % 2 === 1 && i == 0) continue;
      for (let j = -N_LEFT; j <= N_LEFT; j++) {
        if (N_X % 2 === 1 && j == 0) continue;
        const point_ = coordinate.points[index];
        point_.setType(func, color);
        index += 1;
      }
    }
  }

  createGrid(points) {
    for (let i = 0; i < N_Y; i++) {
      let start_x = 0;
      for (let j = 0; j < N_X; j++) {
        const point1 = points[i * (N_X + 1) + start_x];
        const point2 = points[i * (N_X + 1) + start_x + 1];
        const point3 = points[(i + 1) * (N_X + 1) + start_x + 1];
        const point4 = points[(i + 1) * (N_X + 1) + start_x];
        start_x += 1;
        this.squares.push(new Square(point1, point2, point3, point4));
      }
    }
  }

  linearInterpolate(point1, point2, func, edge) {
    if (edge === 'x') {
      const v1 = func(point1.x, point1.y);
      const v2 = func(point2.x, point2.y)
      const grad = (1 - v1) / (v2 - v1);
      const x = point1.x + grad * (point2.x - point1.x)
      return new Point(x, point1.y);
    } 
    if (edge === 'y') {
      const v1 = func(point1.x, point1.y);
      const v2 = func(point2.x, point2.y)
      const grad = (1 - v1) / (v2 - v1);
      const y = point1.y + grad * (point2.y - point1.y);
      return new Point(point1.x, y);
    }
  }

  findPointsEqualToOne(points, func) {
    // Points is an an array of array with length 2
    const pointEqToOne = points.map(([element, edge]) => {
      return this.linearInterpolate(...element, func, edge);
    })

    pointEqToOne.forEach(element => {
        Point.covertPositionToPixels(element, coordinate);
    });
    
    return pointEqToOne;
  }

  drawLine(points, squarePointTypes, group, centerType, func) {
    const pointEqToOne = this.findPointsEqualToOne(points, func);
    if (group === 3) {
      if (centerType === 'bigger') {
        if (squarePointTypes[0] === 'less') {
          line(pointEqToOne[3].x, pointEqToOne[3].y, pointEqToOne[0].x, pointEqToOne[0].y);
          stroke(0);
          strokeWeight(2);
          line(pointEqToOne[2].x, pointEqToOne[2].y, pointEqToOne[1].x, pointEqToOne[1].y);
          stroke(0);
          strokeWeight(2);
        } else if (squarePointTypes[0] === 'bigger') {
          line(pointEqToOne[1].x, pointEqToOne[1].y, pointEqToOne[0].x, pointEqToOne[0].y);
          stroke(0);
          strokeWeight(2);
          line(pointEqToOne[3].x, pointEqToOne[3].y, pointEqToOne[2].x, pointEqToOne[2].y);
          stroke(0);
          strokeWeight(2);
        } else {
          if (squarePointTypes[0] === 'less') {
            line(pointEqToOne[1].x, pointEqToOne[1].y, pointEqToOne[0].x, pointEqToOne[0].y);
            stroke(0);
            strokeWeight(2);
            line(pointEqToOne[3].x, pointEqToOne[3].y, pointEqToOne[2].x, pointEqToOne[2].y);
            stroke(0);
            strokeWeight(2);
          } else if (squarePointTypes[0] === 'bigger') {
            line(pointEqToOne[3].x, pointEqToOne[3].y, pointEqToOne[0].x, pointEqToOne[0].y);
            stroke(0);
            strokeWeight(2);
            line(pointEqToOne[2].x, pointEqToOne[2].y, pointEqToOne[1].x, pointEqToOne[1].y);
            stroke(0);
            strokeWeight(2);
          }
        }
      }
    } else {
      line(pointEqToOne[1].x, pointEqToOne[1].y, pointEqToOne[0].x, pointEqToOne[0].y);
      stroke(0);
      strokeWeight(2);
    }
  }

  pickEdge(square) {
    const temp = [];
    if (square.group === 1) {
      const edge = square.lessIdx[0] % 2 === 0 ? ['y', 'x'] : ['x', 'y'];
      
      const idx_1 = square.lessIdx[0] - 1 >= 0 ? square.lessIdx[0] - 1 : 3;
      const idx_2 = (square.lessIdx[0] + 1) % 4;

      temp.push([[square.points[idx_1], square.points[square.lessIdx[0]]], edge[0]]);
      temp.push([[square.points[square.lessIdx[0]], square.points[idx_2]], edge[1]]);
      

    } else if (square.group === 2) {
      if ((square.lessIdx[0] + square.lessIdx[1]) % 4 === 1) {
        const edge = 'y';
        temp.push([[square.points[0], square.points[3]], edge]);
        temp.push([[square.points[1], square.points[2]], edge]);
      } else {
        const edge = 'x';
        temp.push([[square.points[0], square.points[1]], edge]);
        temp.push([[square.points[2], square.points[3]], edge]);
      }
      
    } else if (square.group === 3) {
      const edge = ['x', 'y'];
      for (let i = 0; i < 4; i++) {
        temp.push([[square.points[i], square.points[(i + 1) % 4]], edge[i % 2]])
      }

    } else if (square.group === 4) {
      const sum = square.lessIdx.reduce((acc, idx) => {
        return acc + idx;
      }, 0);

      const bigIdx = 6 - sum;
      const idx_1 = bigIdx - 1 >= 0 ? bigIdx - 1 : 3;
      const idx_2 = (bigIdx + 1) % 4;

      const edge = bigIdx % 2 === 0 ? ['y', 'x'] : ['x', 'y'];

      temp.push([[square.points[idx_1], square.points[bigIdx]], edge[0]]);
      temp.push([[square.points[bigIdx], square.points[idx_2]], edge[1]]);
    }
    return temp;
  }

  static draw(points, funcs) {
    // Scan all of the squares
    for (let k = 0; k < funcs.length; k++) {
      // Create a new marchingsquares instances
      const [func, color] = funcs[k];
      const marchingSquares = new MarchingSquares(points, func, color);
      for (let i = 0; i < marchingSquares.squares.length; i++) {
        // Check square group, skip if group == 0
        const square = marchingSquares.squares[i];
        if (square.group === 0) continue;
        const interpolatePoints = marchingSquares.pickEdge(square);
        marchingSquares.drawLine(interpolatePoints, square.points.map((point) => point.type), square.group, square.center.type, func);
      }
    }
  }
}