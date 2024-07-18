import p5 from "p5";
import P5 from "p5";
import { random } from ".";
let shieldR = 90;
let starTriW = 12;

class Star {
  p5: P5;

  idx: number;

  pos: P5.Vector;

  originPos: P5.Vector;

  size: number;

  color: number;

  alpha: number;

  constructor(p5: P5, width: number, height: number, index: number) {
    this.p5 = p5;
    this.idx = index;
    this.pos = p5.createVector(random(1, width), random(1, height));
    this.originPos = p5.createVector(this.pos.x, this.pos.y);
    this.size = random(3, 5);
    this.color = random(0, 255);
    this.alpha = random(100, 255); // 투명도를 랜덤으로 설정
  }

  show() {
    this.p5.fill(255);

    if (this.idx % 61 === 0) {
      starVertices(this.p5, this.pos.x, this.pos.y, random(1, 3));
    } else {
      this.p5.ellipse(this.pos.x, this.pos.y, this.size, this.size);
    }
  }

  updatePosition(x: number, y: number) {
    // 고래와 별 사이의 거리 계산
    let dx = x - this.pos.x;
    let dy = y - this.pos.y;

    // 유클리드
    // 두 점 사이의 x 좌표와 y 좌표의 차이를 제곱하여 더한 후, 그 결과에 제곱근
    let distance = this.p5.sqrt(dx * dx + dy * dy);

    // 반경 50px 내에 별을 그리지 않는다
    if (distance < shieldR) {
      // 공에서 별로 향하는 벡터의 단위벡터
      let unitX = dx / distance;
      let unitY = dy / distance;
      // 별의 위치를 공과 반대 방향으로 조정
      this.pos.sub(unitX * 2, unitY * 2);
    } else {
      // 원상복구
      this.pos.add(
        (this.originPos.x - this.pos.x) * 0.05,
        (this.originPos.y - this.pos.y) * 0.05
      );
    }
  }
}

// 4각형 별 그리기
const starVertices = (p5: p5, x: number, y: number, starCenterW: number) => {
  // p5.textSize(random(30, 40));
  // p5.text("ㅋ", this.pos.x, this.pos.y);

  p5.push();
  p5.translate(x, y);
  p5.fill(255);
  p5.noStroke();

  p5.beginShape();

  // 중심 사각형의 꼭짓점 좌표
  const vertices = [
    p5.createVector(-starCenterW, starCenterW),
    p5.createVector(starCenterW, starCenterW),
    p5.createVector(starCenterW, -starCenterW),
    p5.createVector(-starCenterW, -starCenterW),
  ];

  // 삼각형을 위한  좌표
  const middlePoints = [
    p5.createVector(0, starTriW), // 아래쪽 삼각형
    p5.createVector(starTriW, 0), // 오른쪽 삼각형
    p5.createVector(0, -starTriW), // 위쪽 삼각형
    p5.createVector(-starTriW, 0), // 왼쪽 삼각형
  ];

  // 첫 번째 꼭짓점
  p5.vertex(vertices[0].x, vertices[0].y);

  // 각 꼭짓점과 중앙 좌표를 연결
  for (let i = 0; i < vertices.length; i++) {
    let nextIndex = (i + 1) % vertices.length;
    let mid = middlePoints[i];
    let nextVertex = vertices[nextIndex];

    p5.vertex(mid.x, mid.y);
    p5.vertex(nextVertex.x, nextVertex.y);
  }

  p5.endShape(p5.CLOSE);

  p5.pop();
};

export default Star;
