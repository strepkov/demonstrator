import {TrackPart} from "./TrackPart";

export {TrackPartCircle};

class TrackPartCircle extends TrackPart {
    
    public point : number[];
    public radiusInner : number;
    public radiusOuter : number;

    public TrackPartCircle(point: number[], radiusInner: number, radiusOuter: number) {
        
        this.point = point;
        this.radiusInner = radiusInner;
        this.radiusOuter = radiusOuter;
    }
}