import {Sensor} from "../rwth.visualisation/car/Sensor";
import {Car} from "../rwth.visualisation/car/Car";
import {Orientation} from "../rwth.visualisation/coord/Orientation";
import * as math from "../libs/math.js";

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
        let position = math.matrix([-4.15, 1.85]);
        
        expect(sensor.getPosition(car)).toEqual(position);
    });

});