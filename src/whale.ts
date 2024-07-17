import * as p5 from "p5";
import Fin from "./fin";

export default class Whale {
  p5: p5;

  _size: number;

  wPos: p5.Vector;

  speedX: number;

  speedY: number;

  tailDirection: number;

  fins: Fin[];

  boundary: number;

  constructor(p5: p5) {
    this.p5 = p5;
    this._size = 50;
    this.wPos = p5.createVector(100, 100);
    this.speedX = 0.5;
    this.speedY = 1;

    this.tailDirection = 1;

    this.fins = [new Fin(this.p5, this.wPos.x, this.wPos.y, this._size)];

    this.boundary = 10;
  }

  draw() {
    this.p5.noStroke();
    this.updatePosition();
  }

  getFins() {
    for (let i = 1; i < 4; i++) {
      const { p5, pos, w } = this.fins[i - 1];
      const prevSize = i === 1 ? 0 : w;

      this.fins.push(
        new Fin(p5, pos.x + prevSize, pos.y + prevSize, this._size + i * i)
      );
    }

    this.fins.reverse();
  }

  updatePosition() {
    // 공 위치 업데이트
    this.wPos.add(this.speedX, this.speedY);

    // 벽과의 충돌 체크
    if (
      this.wPos.x < this.boundary ||
      this.wPos.x > window.innerWidth - this.boundary
    ) {
      this.speedX *= -1; // x축 방향 반전
    }

    if (
      this.wPos.y < this.boundary ||
      this.wPos.y > window.innerHeight - this.boundary
    ) {
      this.speedY *= -1; // y축 방향 반전
    }

    this.fins.forEach((f, i) => {
      if (i > 0) {
        const frontFin = this.fins[i - 1];
        f.update(frontFin.pos.x, frontFin.pos.y);
      } else {
        this.fins[0].update(this.wPos.x, this.wPos.y);
      }
    });
  }
}
