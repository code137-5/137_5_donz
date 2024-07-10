import * as p5 from "p5";

export default class Whale {
  p5: p5;

  _size: number;

  start_point: number;

  constructor(p5: p5) {
    this.p5 = p5;
    this._size = 50;
    this.start_point = window.innerWidth / 3;
  }

  // 화면의 중앙에서 그린다.
  private makeHead() {
    this.p5.stroke("magenta");

    this.p5.beginShape();
    this.p5.vertex(this.start_point, 100); // Top-left
    this.p5.vertex(this.start_point + 150, 100); // Top-right
    this.p5.vertex(this.start_point + 200, 250); // Bottom-right
    this.p5.vertex(this.start_point - 50, 250); // Bottom-left
    this.p5.endShape();
  }

  private makeLeftPin() {
    this.p5.stroke("cyan");
    this.p5.beginShape();
    this.p5.vertex(this.start_point - 35, 300); // Bottom-right
    this.p5.vertex(this.start_point - 120, 380); // Bottom-left
    this.p5.vertex(this.start_point - 5, 400); // Top-left
    this.p5.endShape();
  }

  private makeRightPin() {
    this.p5.stroke("cyan");

    this.p5.beginShape();
    this.p5.vertex(this.start_point + 185, 300); // Bottom-right
    this.p5.vertex(this.start_point + 280, 380); // Bottom-left
    this.p5.vertex(this.start_point + 160, 400); // Top-left
    this.p5.endShape();
  }

  private makeAbdomen() {
    this.p5.stroke("lime");
    this.p5.beginShape();
    this.p5.vertex(this.start_point - 50, 250);
    this.p5.vertex(this.start_point + 200, 250);

    this.p5.vertex(this.start_point + 80, 700);
    this.p5.endShape();
  }

  private makeTail() {
    this.p5.stroke("yellow");
    this.p5.beginShape();
    this.p5.vertex(this.start_point + 80, 700);
    this.p5.vertex(this.start_point, 750);
    this.p5.vertex(this.start_point + 160, 750);
    this.p5.endShape();
  }

  draw() {
    // 고래의 꼬리 그리기

    this.makeHead();
    this.makeLeftPin();
    this.makeRightPin();
    this.makeAbdomen();
    this.makeTail();
  }
}
