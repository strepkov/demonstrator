import {Sensor} from "../rwth.visualisation/car/Sensor";

describe('The sensors test', () => {

    let sensor = new Sensor([1,1],[1,1]);
    
    afterEach(function(){
            
        sensor = null;
        sensor = new Sensor([1,1],[1,1]);
    });

    it('should return 1', () => {
        
        expect(1).toEqual(1);
    });
});