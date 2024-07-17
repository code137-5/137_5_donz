import * as p5 from "p5";
import Fin from "./fin";

let segSizes = [50, 70, 65, 20, 18, 6, 6, 3].reverse();
let marginSizes = [2, 2, 2, 2, 2];

export default class Whale {
  p5: p5;

  _size: number;

  wPos: p5.Vector;

  speedX: number;

  speedY: number;

  tailDirection: number;

  fins: Fin[];

  numFin: number;

  boundary: number;

  constructor(p5: p5) {
    this.p5 = p5;
    this._size = 50;
    this.wPos = p5.createVector(100, 100);
    this.speedX = 0.5;
    this.speedY = 1;

    this.tailDirection = 1;

    this.fins = [new Fin(this.p5, this.wPos.x, this.wPos.y, this._size)];

    this.numFin = 4;

    this.boundary = 10;
  }

  draw() {
    this.p5.noStroke();
    this.updatePosition();
  }

  getFins() {
    for (let i = 1; i < this.numFin; i++) {
      const { p5, pos, w } = this.fins[i - 1];
      const prevSize = i === 1 ? 0 : w;

      this.fins.push(
        new Fin(p5, pos.x + prevSize, pos.y + prevSize, this._size + i * i)
      );
    }

    this.fins.reverse();
    this.setSizes();
  }

  setSizes() {
    // set sizes for segments
    let trapCounter = 0;
    for (let i = this.numFin - 1; i >= 0; i--) {
      this.fins[i].setMargin(marginSizes[i]);

      this.fins[i].setFrontW(segSizes[trapCounter++]);
      this.fins[i].setBackW(segSizes[trapCounter++]);
    }
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
        const prevFin = this.fins[i - 1];
        f.update(prevFin.pos.x, prevFin.pos.y);
      } else {
        this.fins[0].update(this.wPos.x, this.wPos.y);
      }
    });
  }
}
