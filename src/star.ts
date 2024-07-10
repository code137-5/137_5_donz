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
    // 고래와 별 사이의 거리 계산
    let dx = x - this.x;
    let dy = y - this.y;
    let distance = this.p5.sqrt(dx * dx + dy * dy);

    // 반경 50px 내에 별을 그리지 않는다
    if (distance < 80) {
      // 공에서 별로 향하는 벡터의 단위벡터를 구합니다.
      let unitX = dx / distance;
      let unitY = dy / distance;
      // 별의 위치를 공과 반대 방향으로 조정합니다.
      this.x -= unitX * 2;
      this.y -= unitY * 2;
    } else {
      // 원상복구
      this.x += (this.originX - this.x) * 0.05;
      this.y += (this.originY - this.y) * 0.05;
    }
  }
}

export default Star;
