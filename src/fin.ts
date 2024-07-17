import p5 from "p5";

class Fin {
  p5: p5;
  x: number;
  y: number;
  w: number;
  h: number;
  constructor(p5: p5, x: number, y: number, size: number) {
    this.p5 = p5;
    this.x = x;
    this.y = y;
    this.w = 50 / size;
    this.h = 50 / size;
  }
  draw(x: number, y: number) {
    this.p5.ellipse(x, y, this.w, this.h);
  }
  update(y: number) {
    this.y = y;
  }
}

export default Fin;
