import {TrackPart} from "./TrackPart";
import * as math from "../../libs/math.js";

export {TrackPartCircle};

class TrackPartCircle extends TrackPart {
    
    public point = math.matrix();
    public radiusInner : number;
    public radiusOuter : number;

    public TrackPartCircle(point, radiusInner, radiusOuter) {
        
        this.point = point;
        this.radiusInner = radiusInner;
        this.radiusOuter = radiusOuter;
    }
}