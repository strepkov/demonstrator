import {TrackPart} from "./TrackPart";
import * as math from "../../libs/math.js";

export {TrackPartLinear};

class TrackPartLinear extends TrackPart {
    
    public pointUpperLeft : number[];
    public pointUpperRight : number[];
    public pointLowerLeft : number[];
    public pointLowerRight : number[];

    public constructor (pointUpperLeft : number[], pointUpperRight: number[],
        pointLowerLeft: number[], pointLowerRight: number[]) {

        super();
        
        this.pointUpperLeft = pointUpperLeft;
        this.pointUpperRight = pointUpperRight;
        this.pointLowerLeft = pointLowerLeft;
        this.pointLowerRight = pointLowerRight;
    }
}