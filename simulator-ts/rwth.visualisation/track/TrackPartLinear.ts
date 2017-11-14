import {TrackPart} from "./TrackPart";
import * as math from "../../libs/math.js";

export {TrackPartLinear};

class TrackPartLinear extends TrackPart {
    
    public pointUpperLeft = math.matrix();
    public pointUpperRight = math.matrix();
    public pointLowerLeft = math.matrix();
    public pointLowerRight = math.matrix();

    public constructor (pointUpperLeft, pointUpperRight, pointLowerLeft, pointLowerRight) {

        super();
        
        this.pointUpperLeft = pointUpperLeft;
        this.pointUpperRight = pointUpperRight;
        this.pointLowerLeft = pointLowerLeft;
        this.pointLowerRight = pointLowerRight;
    }
}