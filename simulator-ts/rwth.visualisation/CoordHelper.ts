// import javafx.geometry.Point2D;
// import org.apache.commons.math3.geometry.euclidean.twod.Vector2D;
// import org.apache.commons.math3.linear.ArrayRealVector;
// import org.apache.commons.math3.linear.RealVector;
// import org.apache.commons.math3.ml.distance.EuclideanDistance;

// import java.util.ArrayList;
// import java.util.List;
// import java.util.Vector;

class CoordHelper {

    public getSensorBL(carPosition: Array<number[]>): Array<number[]> {
        
        let offset: number[] = [0,0];

        offset[0] = 1.85;
        offset[1] = -4.15;

        carPosition.push(offset);

        return carPosition;
    }

    public getSensorFL(carPosition: Array<number[]>): Array<number[]> {
        
        let offset: number[] = [0,0];

        offset[0] = 1.85;
        offset[1] = 4.15;

        carPosition.push(offset);

        return carPosition;
    }

    public getSensorFR(carPosition: Array<number[]>): Array<number[]> {
        
        let offset: number[] = [0,0];

        offset[0] = -1.85;
        offset[1] = 4.15;

        carPosition.push(offset);

        return carPosition;
    }

    public getSensorBR(carPosition: Array<number[]>): Array<number[]> {
        
        let offset: number[] = [0,0];

        offset[0] = -1.85;
        offset[1] = -4.15;

        carPosition.push(offset);

        return carPosition;
    }

    public f(x: number): number {
        return 0.0;
    }

    /*public static Vector<Double> getDistance1(double x1, double y1, double x2, double y2,
                                              double cx, double cy) {
                                              \\TODO
    }*/

    /*public static Vector<Double> getDirectionFR(double cx, double cy, double degree, double lambda) {
        Vector<Double> s3 = CoordHelper.getSensorFR(cx, cy);

        double radians = Math.toRadians(degree);
        double x = s3.get(0) - lambda * Math.sin(radians);
        double y = s3.get(1) + lambda * Math.cos(radians);

        Vector<Double> vector = new Vector<>();

        vector.add(x);
        vector.add(y);

        return vector;
    }*/


    //Intersection between sensor and linear function
    public getIntersectionLine(p1: number[], p2: number[], s: number[], d: number[]): Array<number[]> {

        let scalar: number = (p1[0]*(p2[1]-p1[1])-p1[1]*(p2[0]-p1[0]) - 
                                s[0]*(p2[1]-p1[1])+s[1]*(p2[0]-p1[0])) /
                                    (d[0]*(p2[1]-p1[1])-d[1]*(p2[0]-p1[0]));
        
        //TODO: separate the line of operations: 
        // add - Compute the sum of this vector and in ().
        // mapMultiply - Multiply each entry by the argument.
        let intersection: Array<number[]> = s.add(d.mapMultiply(scalar));

        return intersection;
    }

    //Distance from sensor to intersection
    public getDistanceLine(p1: number[], p2: number[], s: number[], r: number[]): number {
        
        try {

            let intersection: Array<number[]> = this.getIntersectionLine(p1, p2, s, r);
            
            // TODO: get distance between two vectors
            return intersection.getDistance(s);
        
        } catch {

            return Number.MAX_VALUE;
        }
    }

    public getIntersectionCirclePlus(sensor: number[], direction: number[],
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

        //TODO: separate the line of operations 
        RealVector intersection = sensor.add(direction.mapMultiply(scalar));
        
        return intersection;
    }

    public getIntersectionCircle(s: number[], d: number[], m: number[], radius: number): Array<number[]> {
        
        let result = new Array<number[]>();

        let pointLower = this.getIntersectionCirclePlus(s, d, m, radius, false);
        let pointUpper = this.getIntersectionCirclePlus(s, d, m, radius, true);

        result.push(pointUpper);
        result.push(pointLower);

        return result;
    }

    public getDistanceCircle(s : number[], d: number[], m: number[], radius: number, plus: boolean): number {
        
        try {
            
            let intersection: Array<number[]> = this.getIntersectionCirclePlus(s, d, m, radius, plus);
            
            // TODO: get distance between two vectors
            return intersection.getDistance(s);
        
        } catch {
            return Number.MAX_VALUE;
        }
    }

}