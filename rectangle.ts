interface Movable {
    move(x: number, y: number): void;
}

export class Point implements Movable {
    private x: number;
    private y: number;

    constructor(x: number, y: number) {
        if (isNaN(x) || isNaN(y)) {
            throw new Error("Invalid point coordinates");
        }

        this.x = x;
        this.y = y;
    }

    public move(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    public getX(): number {
        return this.x;
    }

    public getY(): number {
        return this.y;
    }

    public distance(other: Point): number {
        return Math.sqrt((this.x - other.x) ** 2 + (this.y - other.y) ** 2);
    }
}

export class Rectangle implements Movable {
    private readonly points: [Point, Point, Point, Point];

    constructor(points: [Point, Point, Point, Point]) {
        this.points = points;
    }

    public move(x: number, y: number) {
        this.points.forEach((point) => point.move(point.getX() + x, point.getY() + y));
    }

    public getArea(): number {
        const [a, b, c, d] = this.points;
        return Math.abs((a.getX() - c.getX()) * (a.getY() - c.getY()));
    }

    public rotate(angle: number): void {
        const [a, b, c, d] = this.points;
        const centerX = (a.getX() + c.getX()) / 2;
        const centerY = (a.getY() + c.getY()) / 2;
        this.points.forEach((point) => {
            const x = point.getX();
            const y = point.getY();
            point.move(
                centerX + (x - centerX) * Math.cos(angle) - (y - centerY) * Math.sin(angle),
                centerY + (x - centerX) * Math.sin(angle) + (y - centerY) * Math.cos(angle)
            );
        });
    }

    public scale(factor: number): void {
        const [a, b, c, d] = this.points;
        const centerX = (a.getX() + c.getX()) / 2;
        const centerY = (a.getY() + c.getY()) / 2;
        this.points.forEach((point) => {
            const x = point.getX();
            const y = point.getY();
            point.move(centerX + (x - centerX) * factor, centerY + (y - centerY) * factor);
        });
    }

    public getPerimeter(): number {
        const [a, b, c, d] = this.points;
        return a.distance(b) + b.distance(c) + c.distance(d) + d.distance(a);
    }

    public visualize(): void {
        const [a, b, c, d] = this.points;
        console.log(`A(${a.getX()}, ${a.getY()}) B(${b.getX()}, ${b.getY()}) C(${c.getX()}, ${c.getY()}) D(${d.getX()}, ${d.getY()})`);
        console.log(`Area: ${this.getArea()}`);
        console.log(`Perimeter: ${this.getPerimeter()}`);
        console.log();
    }
}

export class Square extends Rectangle {
    constructor(points: [Point, Point, Point, Point]) {
        const [a, b, c, d] = points;
        const side1 = a.distance(b);
        const side2 = b.distance(c);
        const side3 = c.distance(d);
        const side4 = d.distance(a);
        if (side1 !== side2 || side2 !== side3 || side3 !== side4) {
            throw new Error("Invalid square points");
        }

        super(points);
    }
}
