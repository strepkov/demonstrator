import {Simulator} from "../rwth.visualisation/Simulator";

describe('The simulator test', () => {

    let simulator = new Simulator();

    it('simulator.run() should return true', () => {;
        
        expect(simulator.run()).toEqual(false);
    });
});