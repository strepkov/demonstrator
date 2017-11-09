import de.CoordHelper;
import {Rotation} from "../coord/Rotation";
import {Track} from "../track/Track";
import {Wall} from "../track/Wall";
import {WallCurved} from "../track/WallCurved";
import {WallLinear} from "../track/WallLinear";

public class Sensor {
    private offset : number[];
    private direction : number[];

    public constructor (offset : number[], direction : number[]) {
        this.offset = offset;
        this.direction = direction;
    }

    public getDirection() {
        
        let degree : number = Car.getDegree();
        let rotationMatrix : number[][] = Rotation.getMatrix(degree);
        let rotatedDirection : number[] = rotationMatrix.operate(this.direction);
        
        return rotatedDirection;
    }

    public getPosition() {

        let degree : number = Car.getDegree();
        let rotationMatrix : number[][]= Rotation.getMatrix(degree);
        let position : number[] = Car.getPosition();
        let offset : number[] = position.add(this.offset).subtract(position);
        let rotatedOffset : number[][] = rotationMatrix.operate(offset);
        
        return rotatedOffset.push(position);
    }

    // @Override
    // public String toString() {
    //     return String.format("Sensor - Offset: %s - Direction: %s, %s - Position: %s",
    //             this.offset, this.direction, this.getDirection(), this.getPosition());
    // }

    public List<RealVector> getIntersections(wall : Wall) {
        if(wall instanceof WallLinear) {
            return this.getIntersections((WallLinear)wall);
        } else if(wall instanceof WallCurved) {
            return this.getIntersections((WallCurved)wall);
        }
        return new ArrayList<>();
    }

    public List<RealVector> getIntersections(wall : WallLinear) {
        
        let result = new Array<number[]>();

        try {
            let position = this.getPosition();
            let direction = this.getDirection();
            let intersection = CoordHelper.getIntersectionLine(wall.pointLeft, wall.pointRight, position, direction);

            if(wall.inBoundaries(intersection)) {

                result.push(intersection);
            }

            return result;

        } catch(Exception exception) {
            // need to add some log here
            return result;
        }
    }

    public List<RealVector> getIntersections(WallCurved wall) {
        List<RealVector> result = new ArrayList<>();

        try {
            let position = this.getPosition();
            let direction = this.getDirection();
            let intersections : Array<number[]> =
                    CoordHelper.getIntersectionCircle(position, direction, wall.pointMiddle, wall.radius);

            for(RealVector intersection : intersections) {
                if(wall.inBoundaries(intersection)) {
                    result.add(intersection);
                }
            }

            return result;
        } catch(Exception exception) {
            return result;
        }
    }

    // get the parameter of the line of the sensor to intersection point
    // if the parameter is positive than the intersection point is in correct direction
    public List<Double> getParameters(Wall wall) {
        List<Double> parameters = new ArrayList<>();
        List<RealVector> intersections = this.getIntersections(wall);

        for(RealVector intersection : intersections) {
            RealVector position = this.getPosition();
            RealVector direction = this.getDirection();

            double scalar = (direction.getEntry(0) < 0.0001 && direction.getEntry(0)>-0.0001) ?
                    (intersection.getEntry(1) - position.getEntry(1)) / direction.getEntry(1) :
                    (intersection.getEntry(0) - position.getEntry(0)) / direction.getEntry(0);

            parameters.add(scalar);
        }

        return parameters;
    }

    public List<Double> getDistances(Wall wall) {
        List<Double> distances = new ArrayList<>();
        List<RealVector> intersections = this.getIntersections(wall);

        for(RealVector intersection : intersections) {
            RealVector position = this.getPosition();
            double distance = position.getDistance(intersection);

            distances.add(distance);
        }

        return distances;
    }

    public List<Double> getAllDistances() {
        List<Double> allDistances = new ArrayList<>();
        List<Wall> walls = Track.walls;

        int wallIndex = 0;

        System.out.println("====Walls====");
        System.out.println(this);

        for(Wall wall : walls) {
            wallIndex++;
            List<Double> parameters = this.getParameters(wall);
            List<Double> distances = this.getDistances(wall);

            for(int i = 0; i < parameters.size(); i++) {
                double parameter = parameters.get(i);

                if(parameter >= 0) {
                    double distance = distances.get(i);

                    System.out.println("Index: " + wallIndex);
                    allDistances.add(distance);
                }
            }
        }

        return allDistances;
    }

    // Gets the correct distance of the sensor to the track
    public double getMinDistance() {
        List<Double> distances = this.getAllDistances();
        double minDistance = Double.MAX_VALUE;

        for(Double distance : distances) {
            minDistance = Math.min(minDistance, distance);
        }

        System.out.println("====Min Distances====");
        System.out.println(this);
        System.out.println("minDistance: " + minDistance);
        return minDistance;
    }
}