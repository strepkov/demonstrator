import {Sensor} from "../rwth.visualisation/car/Sensor";
import {Car} from "../rwth.visualisation/car/Car";
import {Orientation} from "../rwth.visualisation/coord/Orientation";
import {WallLinear} from "../rwth.visualisation/track/WallLinear";
import * as math from "../libs/math.js";
import {MatrixToArray} from "../rwth.visualisation/MatrixToArray";

describe('The sensors test', () => {

    let car = new Car(0,0);

    it('should return FRONT_LEFT', () => {

        let sensor = car.getSensor(Orientation.FRONT_LEFT);
        
        expect(sensor.getDirection(car)).toEqual([1,0]);
    });

    it('should return FRONT_LEFT_SIDE', () => {

        let sensor = car.getSensor(Orientation.FRONT_LEFT_SIDE);
        
        expect(sensor.getDirection(car)).toEqual([0,1]);
    });

    it('should return BACK_LEFT', () => {

        let sensor = car.getSensor(Orientation.BACK_LEFT);
        
        expect(sensor.getDirection(car)).toEqual([-1,0]);
    });

    it('should return BACK_LEFT_SIDE', () => {

        let sensor = car.getSensor(Orientation.BACK_LEFT_SIDE);
        
        expect(sensor.getDirection(car)).toEqual([0,1]);
    });

    it('should return GET POSITION', () => {

        let sensor = car.getSensor(Orientation.BACK_LEFT_SIDE);
        
        expect(sensor.getPosition(car)).toEqual([-4.15, 1.85]);
    });


    it('should return intersections points', () => {

        let car2 = new Car(0,0);
        let sensor = car2.getSensor(Orientation.FRONT_RIGHT_SIDE);
        let wall = new WallLinear([-50, -20], [50, -20]);

        let sensor_offset = [4.15,-20];
        
        // Take in account only sensor's offset because of the initial postition of the car(0,0) 
        expect(sensor.getIntersections(wall, car2)).toEqual([sensor_offset]);
    });

});