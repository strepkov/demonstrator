import {TrackPart} from "./TrackPart";
import {Vector} from 'ts-vector';

export {TrackPartLinear};

class TrackPartLinear extends TrackPart {
    
    public pointUpperLeft : Vector;
    public pointUpperRight : Vector;
    public pointLowerLeft : Vector;
    public pointLowerRight : Vector;

    public constructor (pointUpperLeft : Vector, pointUpperRight : Vector
                        , pointLowerLeft : Vector, pointLowerRight : Vector) {
        
        super();
        this.pointUpperLeft = pointUpperLeft;
        this.pointUpperRight = pointUpperRight;
        this.pointLowerLeft = pointLowerLeft;
        this.pointLowerRight = pointLowerRight;
    }
}