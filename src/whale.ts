import * as p5 from "p5";
import Segment from "./segment";

let segSizes = [50, 70, 70, 60, 50, 30, 30, 20, 15, 5, 3, 50].reverse();
let marginSizes = [4, 2, 2, 1, 1, 2];

export default class Whale {
  p5: p5;

  _size: number;

  wPos: p5.Vector;

  speedX: number;

  speedY: number;

  segments: Segment[];

  numFin: number;

  boundary: number;

  // sine wave
  phase: number; // 사인파의 위상

  amplitude: number; // 사인파의 진폭

  frequency: number; // 사인파의 주파수

  constructor(p5: p5) {
    this.p5 = p5;
    this._size = 50;
    this.wPos = p5.createVector(100, 100);
    this.speedX = 0.5;
    this.speedY = 1;
    this.segments = [
      new Segment(this.p5, this.wPos.x, this.wPos.y, this._size),
    ];
    this.numFin = 6;
    this.boundary = -300;

    this.phase = 0;
    this.amplitude = 8;
    this.frequency = 0.02;
  }

  draw() {
    this.updatePosition();
  }

  getsegments() {
    for (let i = 1; i < this.numFin; i++) {
      const { p5, pos, w } = this.segments[i - 1];
      const prevSize = i === 1 ? 0 : w;

      this.segments.push(
        new Segment(p5, pos.x + prevSize, pos.y + prevSize, this._size + i * i)
      );
    }

    this.segments.reverse();
    this.setSizes();
  }

  setSizes() {
    // set sizes for segments
    let trapCounter = 0;
    for (let i = this.numFin - 1; i >= 0; i--) {
      this.segments[i].setMargin(marginSizes[i]);

      this.segments[i].setFrontW(segSizes[trapCounter++]);
      this.segments[i].setBackW(segSizes[trapCounter++]);
    }
  }

  updatePosition() {
    // 고래상어 위치 업데이트
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

    this.segments.forEach((f, i) => {
      const angleOffset = i * 10; // segment마다 사인파의 오프셋을 다르게 하여 서로 다른 위치에서 시작하게 함
      const offsetX = this.amplitude * this.p5.sin(this.phase + angleOffset);
      const offsetY = 0; // 여기서 수직 이동은 필요 없음
      if (i > 0) {
        const prevFin = this.segments[i - 1];
        f.update(
          prevFin.pos.x + offsetX,
          prevFin.pos.y + offsetY,
          i === this.numFin - 1,
          i
        );
      } else {
        this.segments[0].update(this.wPos.x, this.wPos.y);
      }
    });

    // sine 위상 업데이트
    this.phase += this.frequency;
  }
}
