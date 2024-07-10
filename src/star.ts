import * as P5 from "p5";

class Star {
  p5: P5;
  x: number;
  y: number;
  originX: number;
  originY: number;
  size: number;
  alpha: number;
  constructor(p5: P5, width: number, height: number) {
    this.p5 = p5;
    this.x = this.random(1, width);
    this.y = this.random(1, height);
    this.originX = this.x;
    this.originY = this.y;
    this.size = this.random(3, 5);
    this.alpha = this.random(100, 255);
  }

  private random(min: number, max: number) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  show() {
    this.p5.fill(255, this.alpha);
    this.p5.ellipse(this.x, this.y, this.size, this.size);
  }

  updatePosition(x: number, y: number) {
    let d = this.p5.dist(x, y, this.x, this.y);

    // 반경 50px 내에 별을 그리지 않는다
    if (d < 50) {
      this.x = x + 50;
      this.y = x + 50;
    } else {
      // 원상복구
      this.x = this.originX;
      this.y = this.originY;
    }
  }
}

export default Star;
