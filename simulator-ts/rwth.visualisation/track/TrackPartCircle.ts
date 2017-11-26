import {TrackPart} from "./TrackPart";

export {TrackPartCircle};

class TrackPartCircle extends TrackPart {
    
    public point : number[];
    public radiusInner : number;
    public radiusOuter : number;

    public constructor(point: number[], radiusInner: number, radiusOuter: number) {
        super();

        this.point = point;
        this.radiusInner = radiusInner;
        this.radiusOuter = radiusOuter;
    }
}