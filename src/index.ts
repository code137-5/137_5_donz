import P5 from "p5";
import Mover from "./mover";

const sketch = (p5: P5) => {
  const test: Mover = new Mover(p5);
  // The sketch setup method
  p5.setup = () => {
    // Creating and positioning the canvas
    const canvas = p5.createCanvas(500, 500);
    canvas.parent("app");

    // Configuring the canvas
    p5.background("black");
  };

  // The sketch draw method
  p5.draw = () => {
    // DEMO: Let the circle instances draw themselves
    test.draw();
  };
};

new P5(sketch);
