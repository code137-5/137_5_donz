import * as p5 from "p5";

export default class Whale {
  p5: p5;

  _size: number;

  x: number;

  y: number;

  speedX: number;

  speedY: number;

  constructor(p5: p5) {
    this.p5 = p5;
    this._size = 50;
    this.x = window.innerWidth / 2;
    this.y = window.innerHeight / 2;
    this.speedX = 0.5;
    this.speedY = 1;
  }

  draw() {
    this.p5.noStroke();
    this.p5.ellipse(this.x, this.y, 100, 100);
  }

  updatePosition() {
    // 공의 다음 위치 계산
    let nextX = this.x + this.speedX;
    let nextY = this.y + this.speedY;

    // 벽과의 충돌 체크
    if (nextX < 50 || nextX > window.innerWidth - 50) {
      this.speedX *= -1; // x축 방향 반전
    }

    if (nextY < 50 || nextY > window.innerHeight - 50) {
      this.speedY *= -1; // y축 방향 반전
    }

    // 공 위치 업데이트
    this.x += this.speedX;
    this.y += this.speedY;
  }
}
