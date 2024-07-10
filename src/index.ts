import * as p5 from "p5";

import Star from "./star";
import Whale from "./whale";

let stars: Star[] = [];
let whale: Whale;

function drawStar(p5: p5, cnt: number) {
  for (let i = 0; i < cnt; i++) {
    const star: Star = new Star(p5, window.innerWidth, window.innerHeight);
    stars.push(star);
  }
}

const sketch = (p5: p5) => {
  p5.setup = () => {
    const canvas = p5.createCanvas(window.innerWidth, window.innerHeight);
    canvas.parent("app");

    p5.background("#041636"); // 어두운 파란색 배경 (밤 하늘)
    //p5.noLoop(); // draw 함수가 한 번만 실행되도록 설정

    whale = new Whale(p5);

    drawStar(p5, window.innerWidth);
  };

  p5.draw = () => {
    p5.background("#041636"); // 배경을 다시 그려 별들이 지워지지 않도록 함.

    for (let star of stars) {
      star.show();
    }

    whale.draw();
  };
};

new p5.default(sketch);
