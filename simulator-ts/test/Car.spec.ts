import {Car} from "../rwth.visualisation/car/Car";

describe('create instance of Car class', () => {

    let car = new Car(0,0);

    afterEach(function(){
        
        car = null;
        car = new Car(0,0);
    });
    
    it('should return the initialized class', () => {

        expect(car).not.toBeNull();
    });

    it('should return the initial position', () => {

        expect(car.getPosition()).toEqual([0,0]);
    });

    it('should return the correct position', () => {

        car.setPosition([1,1]);

        expect(car.getPosition()).toEqual([1,1]);
    });

    it('should return the initial angle', () => {

        expect(car.getDegree()).toEqual(0);
    });

    it('should return the correct angle', () => {

        car.setDegree(10);

        expect(car.getDegree()).toEqual(10);
    });

});