import p5 from "p5";

class Fin {
  p5: p5;
  pos: p5.Vector;
  w: number;
  nextPos: p5.Vector;
  angle: number;

  constructor(p5: p5, x: number, y: number, size: number) {
    this.p5 = p5;
    this.pos = p5.createVector(x, y);
    this.nextPos = p5.createVector(0, 0);
    this.w = size;
    this.angle = 0;
  }
  draw() {
    this.p5.circle(this.pos.x, this.pos.y, this.w);
  }
  update(x: number, y: number) {
    // 현재 움직이는 위치와 fin위치간 거리의 차이를 구한다.
    const target = this.p5.createVector(x, y);
    const dir = p5.Vector.sub(target, this.pos);
    dir.setMag(this.w);
    dir.mult(-1);
    // 현재 움직이는 위치가 어디로 향하는지, 각도를 구한다.
    this.angle = dir.heading();

    this.pos = p5.Vector.add(target, dir);

    this.p5.circle(this.pos.x, this.pos.y, this.w);
  }

  calcNextPosition() {
    const dx = this.w * this.p5.cos(this.angle);
    const dy = this.w * this.p5.sin(this.angle);
    this.nextPos.set(this.pos.x + dx, this.pos.y + dy);
  }
}

export default Fin;
