import {CoordHelper} from '../rwth.visualisation/CoordHelper';
import * as math from "../libs/math.js";

describe('test CoordHelper\' functions', () => {

    it('should return an intersection point', () => {
        
        expect(CoordHelper.getIntersectionLine(
            [-50, -20], // point 1 of the wall
            [50, -20], // point 2 of the wall
            [0,0], // the sensor position
            [0,1])) // direction of the sensor
            .toEqual([0,-20]);
    });
});
