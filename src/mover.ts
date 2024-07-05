import P5 from "p5";

export default class Mover {
  _p5: P5;

  _size: number;

  constructor(p5: P5) {
    this._p5 = p5;
    this._size = 50;
  }

  draw() {
    const p5 = this._p5; // just for convenience

    p5.push();

    p5.noStroke();
    p5.fill("orange");
    p5.ellipse(0, 0, this._size);

    p5.pop();
  }
}
