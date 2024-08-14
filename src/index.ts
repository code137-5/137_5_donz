import * as p5 from "p5";

import Star from "./star";
import Whale from "./whale";

let stars: Star[] = [];
let whale: Whale;

function drawStars(p5: p5, cnt: number) {
  for (let i = 0; i < cnt; i++) {
    const star: Star = new Star(p5, window.innerWidth, window.innerHeight, i);
    stars.push(star);
  }
}

function updateStars(x: number, y: number) {
  for (let star of stars) {
    star.updatePosition(x, y);
  }
}

export function random(min: number, max: number) {
  return Math.floor(Math.random() * (max - min)) + min;
}

const sketch = (p5: p5) => {
  p5.setup = () => {
    const canvas = p5.createCanvas(window.innerWidth, window.innerHeight);
    canvas.parent("app");

    p5.background("#041636"); // 어두운 파란색 배경 (밤 하늘)

    // 고래 생성
    whale = new Whale(p5);
    whale.getsegments();

    // 초기 별 생성
    drawStars(p5, window.innerWidth * 1.1);
  };

  p5.draw = () => {
    p5.background("#041636"); // 배경을 다시 그려 별들이 지워지지 않도록 함.

    for (let star of stars) {
      star.show();
    }

    whale.draw();
    whale.updatePosition();

    updateStars(whale.segments[0].pos.x, whale.segments[0].pos.y);
  };
};

new p5.default(sketch);
