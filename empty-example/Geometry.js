class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.color = [200, 0, 0];
    this.type = null;
  }

  setType(func, color) {
    if (func(this.x, this.y) < 1) {
      this.type = 'less';
      this.color = color;
    }
    if (func(this.x, this.y) >= 1) {
      this.type = 'bigger';
    }
  }

  static covertPositionToPixels(point, coordinate) {
    const [px, py] = coordinate.convert(point.x, point.y);
    point.x = px;
    point.y = py;
  }
}

class Square {
  constructor (Point1, Point2, Point3, Point4){
    // Point1 and Point2 is in the same y coordinates, where Point2.x > Point1.x
    // Point3 and Point4 is in the same y coordinates, where Point4.x > Point3.x
    // Point1.y > Point3.y
    this.points = [Point1, Point2, Point3, Point4];
    this.setCenterPoint();
    this.setGroup();
  }
  setGroup() {
    // Group 0 = all points either less or bigger
    // Group 1 = one less point
    // Group 2 = two less point on the same edge
    // Group 3 = two less point on opposite edge 
    // Group 4 = three less point
    let groupType;
    let lessIdx = [];
    const arr = [this.points[0].type, this.points[1].type, this.points[2].type, this.points[3].type];
    let less_count = 0;

    // Base case
    if (arr[0] === 'less') {
      less_count++;
      lessIdx.push(0);
    }
    
    // Check for same edge or opposite edge
    for (let i = 1; i < arr.length; i++) {
      if (arr[i] === 'less') {
        less_count++;
        lessIdx.push(i);
      }
    }

    // Check for less point count
    switch (less_count) {
      case 1:
        groupType = 1;
        break;
      case 2:
        groupType = (lessIdx[1] - lessIdx[0]) === 2 ? 3 : 2;
        break;
      case 3:
        groupType = 4;
        break;
      default:
        groupType = 0;
        break;
    }

    this.group = groupType;
    this.lessIdx = lessIdx;
  }

  setCenterPoint() {
    const center_x = this.points[0].x + (this.points[1].x - this.points[0].x) / 2;
    const center_y = this.points[2].y + (this.points[0].y - this.points[2].y) / 2;

    this.center = new Point(center_x, center_y);
    this.center.setType(circle);
  }
}