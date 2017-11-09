import {TrackPart} from "./TrackPart";
import {Vector} from 'ts-vector';

export {TrackPartCircle};

class TrackPartCircle extends TrackPart {
    
    public point : Vector;
    public radiusInner : number;
    public radiusOuter : number;

    public TrackPartCircle(point : Vector, radiusInner : number, radiusOuter : number) {
        
        this.point = point;
        this.radiusInner = radiusInner;
        this.radiusOuter = radiusOuter;
    }
}