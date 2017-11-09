//import de.CoordHelper;
//import '../../libs/ts-vector-0.1.0.js';
import { Vector } from 'ts-vector';
import {Rotation} from "../coord/Rotation";
import {Track} from "../track/Track";
import {Wall} from "../track/Wall";
import {WallCurved} from "../track/WallCurved";
import {WallLinear} from "../track/WallLinear";

public class Sensor {
    private offset : Vector;
    private direction : Vector;

    public constructor (offset : Vector, direction : Vector) {
        this.offset = offset;
        this.direction = direction;
    }

    public getDirection() {
        
        let degree : number = Car.getDegree();
        let rotationMatrix : number[][] = Rotation.getMatrix(degree);
        let rotatedDirection : Vector = rotationMatrix.operate(this.direction);
        
        return rotatedDirection;
    }

    public getPosition() {

        let degree : number = Car.getDegree();
        let rotationMatrix : number[][]= Rotation.getMatrix(degree);
        let position : Vector = Car.getPosition();
        
        // type of offset ?
        let offset : Vector = position.add(this.offset).subtract(position);
        
        // Should be a vector, because we need to add vectors inside the vector
        let rotatedOffset :Vector = rotationMatrix.operate(offset);

        return rotatedOffset.add(position);
    }

    // @Override
    // public String toString() {
    //     return String.format("Sensor - Offset: %s - Direction: %s, %s - Position: %s",
    //             this.offset, this.direction, this.getDirection(), this.getPosition());
    // }

    // List<RealVector>
    public getIntersections(wall : Wall);
    public getIntersections(wall : WallLinear);
    public getIntersections(wall : WallCurved);
    public getIntersections(wall : any){
        
        // if (wall instanceof Wall){
        //     if(wall instanceof WallLinear) {
        //         return this.getIntersections((WallLinear)wall);
        //     } else if(wall instanceof WallCurved) {
        //         return this.getIntersections((WallCurved)wall);
        //     }
        //     return new ArrayList<>();
        // }
        // else 
        
        if (wall instanceof WallLinear){

            let result = new Array<Vector>();
            
            try {
                    let position : Vector = this.getPosition();
                    let direction : Vector = this.getDirection();
                    let intersection : Vector 
                        = CoordHelper.getIntersectionLine(wall.pointLeft, wall.pointRight, position, direction);
            
                    if(wall.inBoundaries(intersection)) {
            
                        result.push(intersection);
                    }
            
                    return result;   
                } 
                
            catch(exception : Exception) {
                    // need to add some log here
                    return result;
                }
        }
        else if (wall instanceof WallCurved){

            let result = new Array<Vector>();
            
            try {
                    let position : Vector = this.getPosition();
                    let direction : Vector = this.getDirection();
                    let intersections : Array<Vector>
                        = CoordHelper.getIntersectionCircle(position, direction, wall.pointMiddle, wall.radius);
            
                    for( let intersection of intersections) {
                            
                        if(wall.inBoundaries(intersection)) {
                                
                            result.push(intersection);
                        }
                    }
                       
                    return result;
                } 
                
            catch(exception : Exception) {
                    // add extra logging
                    return result;
                }
        }   
    }

    // get the parameter of the line of the sensor to intersection point
    // if the parameter is positive than the intersection point is in correct direction
    public getParameters(wall : Wall) {
        
        let parameters = new Array<number>();
        let intersections : Array<Vector> = this.getIntersections(wall);

        for(let intersection of intersections) {

            let position : Vector = this.getPosition();
            let direction : Vector = this.getDirection();

            // Add a constant 
            let scalar : number = (direction[0] < 0.0001 && direction[0]>-0.0001) ?
                    (intersection[1] - position[1]) / direction[1] :
                    (intersection[0] - position[0]) / direction[0];

            parameters.push(scalar);
        }

        return parameters;
    }

    public getDistances(wall : Wall) {

        let distances = new Array<number>();
        let intersections : Array<Vector> = this.getIntersections(wall);

        for(let intersection of intersections) {
            
            //Should be a vector
            let position : Vector = this.getPosition();
            // TODO: distance between vectors
            let distance : number = position. getDistance(intersection);

            distances.push(distance);
        }

        return distances;
    }

    public getAllDistances() {
        
        let allDistances = new Array<number>();
        let walls : Array<Wall>  = Track.walls;

        let wallIndex : number = 0;

        // System.out.println("====Walls====");
        // System.out.println(this);

        for(let wall of walls) {
            
            wallIndex++;

            let parameters : Array<number> = this.getParameters(wall);
            let distances : Array<number> = this.getDistances(wall);

            for(let i : number = 0; i < parameters.length; i++) {
                
                let parameter : number = parameters[i];

                if(parameter >= 0) {
                    
                    let distance : number = distances[i];
                    // System.out.println("Index: " + wallIndex);
                    allDistances.push(distance);
                }
            }
        }

        return allDistances;
    }

    // Gets the correct distance of the sensor to the track
    public getMinDistance() : number {

        let distances : number[] = this.getAllDistances();
        let minDistance : number = Number.MAX_VALUE;

        for(let distance of distances) {

            minDistance = Math.min(minDistance, distance);
        }

        // System.out.println("====Min Distances====");
        // System.out.println(this);
        // System.out.println("minDistance: " + minDistance);
        return minDistance;
    }
}