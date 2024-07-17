import * as p5 from "p5";
import Fin from "./fin";

export default class Whale {
  p5: p5;

  _size: number;

  x: number;

  y: number;

  speedX: number;

  speedY: number;

  tailDirection: number;

  fins: Fin[];

  boundary: number;

  constructor(p5: p5) {
    this.p5 = p5;
    this._size = 50;
    this.x = window.innerWidth / 2;
    this.y = window.innerHeight / 2;
    this.speedX = 0.5;
    this.speedY = 1;

    this.tailDirection = 1;

    this.fins = [];

    this.boundary = 30;
  }

  draw() {
    this.p5.noStroke();

    this.fins.forEach((f, i) => {
      let tailX = this.x - this.speedX * 40 * i;
      let tailY = this.y - this.speedY * 40 * i;
      f.draw(tailX, tailY);
    });
  }

  getFins() {
    for (let i = 1; i < 5; i++) {
      let tailX = this.x - this.speedX * 40 * i;
      let tailY = this.y - this.speedY * 40 * i;

      const f = new Fin(this.p5, tailX, tailY, i);
      this.fins.push(f);
    }
  }

  updatePosition() {
    // 공의 다음 위치 계산
    let nextX = this.x + this.speedX;
    let nextY = this.y + this.speedY;

    // 벽과의 충돌 체크
    if (nextX < this.boundary || nextX > window.innerWidth - this.boundary) {
      this.speedX *= -1; // x축 방향 반전
    }

    if (nextY < this.boundary || nextY > window.innerHeight - this.boundary) {
      this.speedY *= -1; // y축 방향 반전
    }

    // 공 위치 업데이트
    this.x += this.speedX;
    this.y += this.speedY;
  }
}
