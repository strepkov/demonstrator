import {Wall} from "./Wall";
import {Vector} from 'ts-vector';

export {WallLinear};

class WallLinear extends Wall {
    
    public static getBuilder() {
        
        return new WallLinear.Builder();
    }

    public pointLeft : Vector;
    public pointRight : Vector;

    public constructor (pointLeft : Vector, pointRight : Vector) {
        
        super();
        this.pointLeft = pointLeft;
        this.pointRight = pointRight;
    }

    public inBoundaries(point : Vector) {
        
        return super.inBoundaries(this.pointLeft, point, this.pointRight);
    }

    public static Builder = class Builder {
        
        private pointLeft : Vector;
        private pointRight : Vector;

        Builder() {
            this.pointLeft = new Vector(2);
            this.pointRight = new Vector(2);
        }

        // Using setPointLeft({x,y});
        public setPointLeft(x: {x1 : number, y1 : number}) : Builder;
        // Using setPointLeft(point);
        public setPointLeft(x : Vector) : Builder;
        public setPointLeft(x) : any{
            if (typeof x == "object")
                {
                    this.pointLeft[0] = x.x1;
                    this.pointLeft[1] = x.y1;
                    return this;
                }
            else if (x instanceof Vector)
                {
                    this.pointLeft = x;
                    return this;
                }
        }
        
        // Using setPointRight({x,y});
        public setPointRight(x: {x1 : number, y1 : number}) : Builder;
        // Using setPointRight(point);
        public setPointRight(x : Vector) : Builder;
        public setPointRight(x) : any{
            if (typeof x == "object")
                {
                    this.pointRight[0] = x.x1;
                    this.pointRight[1] = x.y1;
                    return this;
                }
            else if (x instanceof Vector)
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