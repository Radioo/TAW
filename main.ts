import { Point, Rectangle, Square } from "./rectangle";

const point1 = new Point(2, 5);
console.log('X:', point1.getX(), 'Y:', point1.getY());

try {
    new Point(NaN, 7);
}
catch (e) {
    console.log(e);
}

const point2 = new Point(0, 0);
point2.move(1, 2);
console.log('X:', point2.getX(), 'Y:', point2.getY());

const rectangle = new Rectangle([new Point(0, 0), new Point(0, 2), new Point(3, 2), new Point(3, 0)]);
rectangle.visualize();

rectangle.scale(2);
rectangle.visualize();

rectangle.rotate(Math.PI / 2);
rectangle.visualize();

rectangle.move(10, 10);
rectangle.visualize();


const square = new Square([new Point(0, 0), new Point(0, 2), new Point(2, 2), new Point(2, 0)]);
square.visualize();

square.scale(2);
square.visualize();

square.rotate(Math.PI / 2);
square.visualize();

try {
    new Square([new Point(0, 0), new Point(0, 2), new Point(3, 2), new Point(3, 0)]);
}
catch (e) {
    console.log(e);
}
