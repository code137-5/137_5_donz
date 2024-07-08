import P5 from "p5";

class Star {
  p5: P5;
  x: number;
  y: number;
  size: number;
  alpha: number;
  constructor(p5: P5, width: number, height: number) {
    this.p5 = p5;
    this.x = this.random(1, width);
    this.y = this.random(1, height);
    this.size = this.random(3, 5);
    this.alpha = this.random(150, 255);
  }

  private random(min: number, max: number) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  show() {
    this.p5.fill(255, this.alpha);
    this.p5.ellipse(this.x, this.y, this.size, this.size);
  }
}

export default Star;
