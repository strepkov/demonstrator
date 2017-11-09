import {Wall} from "./Wall";

export {WallLinear};

class WallLinear extends Wall {
    
    public static getBuilder() {
        
        return new WallLinear.Builder();
    }

    public pointLeft : number[];
    public pointRight : number[];

    public constructor (pointLeft : number[], pointRight : number[]) {
        
        super();
        this.pointLeft = pointLeft;
        this.pointRight = pointRight;
    }

    public inBoundaries(point : number[]) {
        
        return super.inBoundaries(this.pointLeft, point, this.pointRight);
    }

    public static Builder = class Builder {
        
        private pointLeft : number[];
        private pointRight : number[];

        Builder() {
            this.pointLeft = [0,0];
            this.pointRight = [0,0];
        }

        // Using setPointLeft({x,y});
        public setPointLeft(x: {x1 : number, y1 : number}) : Builder;
        // Using setPointLeft(point);
        public setPointLeft(x : number[]) : Builder;
        public setPointLeft(x) : any{
            if (typeof x == "object")
                {
                    this.pointLeft[0] = x.x1;
                    this.pointLeft[1] = x.y1;
                    return this;
                }
            else if (x instanceof Array)
                {
                    this.pointLeft = x;
                    return this;
                }
        }
        
        // Using setPointRight({x,y});
        public setPointRight(x: {x1 : number, y1 : number}) : Builder;
        // Using setPointRight(point);
        public setPointRight(x : number[]) : Builder;
        public setPointRight(x) : any{
            if (typeof x == "object")
                {
                    this.pointRight[0] = x.x1;
                    this.pointRight[1] = x.y1;
                    return this;
                }
            else if (x instanceof Array)
                {
                    this.pointRight = x;
                    return this;
                }
        }

        public build() {
            
            return new WallLinear(this.pointLeft, this.pointRight);
        }
    }
}