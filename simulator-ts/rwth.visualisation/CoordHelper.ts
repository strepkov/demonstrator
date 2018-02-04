import * as math from "../libs/math.js";
export {CoordHelper}; 

class CoordHelper {

    public static test(): number{
        return 1;
    }

    public static getSensorBL(carPosition: Array<number[]>): Array<number[]> {
        
        let offset: number[] = [1.85, -4.15];

        carPosition.push(offset);

        return carPosition;
    }

    public static getSensorFL(carPosition: Array<number[]>): Array<number[]> {
        
        let offset: number[] = [0,0];

        offset[0] = 1.85;
        offset[1] = 4.15;

        carPosition.push(offset);

        return carPosition;
    }

    public static getSensorFR(carPosition: Array<number[]>): Array<number[]> {
        
        let offset: number[] = [0,0];

        offset[0] = -1.85;
        offset[1] = 4.15;

        carPosition.push(offset);

        return carPosition;
    }

    public static getSensorBR(carPosition: Array<number[]>): Array<number[]> {
        
        let offset: number[] = [0,0];

        offset[0] = -1.85;
        offset[1] = -4.15;

        carPosition.push(offset);

        return carPosition;
    }

    public static f(x: number): number {
        return 0.0;
    }

    /*public static static Vector<Double> getDistance1(double x1, double y1, double x2, double y2,
                                              double cx, double cy) {
                                              \\TODO
    }*/

    /*public static static Vector<Double> getDirectionFR(double cx, double cy, double degree, double lambda) {
        Vector<Double> s3 = CoordHelper.getSensorFR(cx, cy);

        double radians = Math.toRadians(degree);
        double x = s3.get(0) - lambda * Math.sin(radians);
        double y = s3.get(1) + lambda * Math.cos(radians);

        Vector<Double> vector = new Vector<>();

        vector.add(x);
        vector.add(y);

        return vector;
    }*/


    //Intersection between sensor and linear function; p1, p2 points of wall, (s)ensor and (d)irection.
    public static getIntersectionLine(p1: number[], p2: number[], s: number[], d: number[]): number[] {

        let scalar: number = (p1[0]*(p2[1]-p1[1])-p1[1]*(p2[0]-p1[0]) - s[0]*(p2[1]-p1[1])+s[1]*(p2[0]-p1[0])) /
                                    (d[0]*(p2[1]-p1[1])-d[1]*(p2[0]-p1[0]));
         
        let s_math = math.matrix(s);
        let d_math = math.matrix(d);
        
        let intersection: number[] = math.add(s_math, math.multiply(d_math, scalar));

        return intersection;
    }

    //Distance from sensor to intersection
    public static getDistanceLine(p1: number[], p2: number[], s: number[], r: number[]): number {
        
        try {

            let intersection: number[] = CoordHelper.getIntersectionLine(p1, p2, s, r);
            
            // TODO: get distance between two vectors
            let intersection_str = '[' + intersection.toString() + ']';
            let intersection_math = math.matrix(intersection_str);

            let s_str = '[' + s.toString() + ']';
            let s_math = math.matrix(s_str);

            let distance = math.distance(intersection_math, s_math);

            // TODO: check the types
            return distance;
        
        } catch {

            return Number.MAX_VALUE;
        }
    }

    public static getIntersectionCirclePlus(sensor: number[], direction: number[],
                                    middlePoint: number[], r: number, plus: boolean): number[] {

        let plusValue: number = plus ? 1.0 : -1.0;

        let a: number = direction[0];
        let b: number = direction[1];

        let m: number = middlePoint[0];
        let n: number = middlePoint[1];

        let x: number = sensor[0];
        let y: number = sensor[1];

        let as: number = Math.pow(a,2)+Math.pow(b,2);
        let xm: number = Math.pow(x-m,2)+Math.pow(y-n,2)-Math.pow(r,2);
        let za: number = Math.pow(2*a*(x-m)+2*b*(y-n), 2);
        let zaq: number = 2*Math.pow(a,2)+2*Math.pow(b,2);
        let sqrtValue: number = -4*as*xm+za;
        
        if(sqrtValue<0 && sqrtValue>= -0.0001){
                sqrtValue = 0;
        }

        let sqrt: number = plusValue*Math.sqrt(sqrtValue);
        let scalar: number = -1*(sqrt +2*a*(x-m)+2*b*(y-n))/zaq;

        let sensor_str = '[' + sensor.toString() + ']';
        let sensor_math = math.matrix(sensor_str);
        
        let direction_str = '[' + direction.toString() + ']';
        let direction_math = math.matrix(direction_str);

        let intersection = math.add(sensor_math, math.multiply(direction_math, scalar));
        
        // TODO: check the types
        return intersection;
    }

    public static getIntersectionCircle(s: number[], d: number[], m: number[], radius: number): Array<number[]> {
        
        let result = new Array<number[]>();

        let pointLower = CoordHelper.getIntersectionCirclePlus(s, d, m, radius, false);
        let pointUpper = CoordHelper.getIntersectionCirclePlus(s, d, m, radius, true);

        result.push(pointUpper);
        result.push(pointLower);

        return result;
    }

    public static getDistanceCircle(s : number[], d: number[], m: number[], radius: number, plus: boolean): number {
        
        try {
            
            // check the types
            let intersection: number[] = CoordHelper.getIntersectionCirclePlus(s, d, m, radius, plus);
            
            // TODO: get distance between two vectors
            let intersection_str = '[' + intersection.toString() + ']';
            let intersection_math = math.matrix(intersection_str);

            let s_str = '[' + s.toString() + ']';
            let s_math = math.matrix(s_str);

            let distance = math.distance(intersection_math, s_math);

            return distance;
        
        } catch {
            return Number.MAX_VALUE;
        }
    }

}