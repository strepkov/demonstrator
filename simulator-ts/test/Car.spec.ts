import {Car} from "../rwth.visualisation/car/Car";

describe('create instance of Car class', () => {
    it('should return the initialized class', () => {
        
        let car = new Car(0,0);

        expect(car).not.toBeNull();
    });
});