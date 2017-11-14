import {Wall} from "./Wall";
import * as math from '../../libs/math';

export {WallLinear};

class WallLinear extends Wall {
    
    public getBuilder() {
        
        return new this.Builder();
    }

    public pointLeft  = math.matrix();
    public pointRight = math.matrix();

    public constructor (pointLeft, pointRight) {
        
        super();
        this.pointLeft = pointLeft;
        this.pointRight = pointRight;
    }

    public inBoundaries(point) {
        
        return super.inBoundaries(this.pointLeft, point, this.pointRight);
    }

    public Builder = class Builder {
        
        private pointLeft = math.matrix();
        private pointRight = math.matrix();

        public constructor() {
            this.pointLeft = math.matrix();
            this.pointRight = math.matrix();
        }

        // Using setPointLeft({x,y});
        public setPointLeft(x: {x1 : number, y1 : number}) : Builder;
        // Using setPointLeft(point);
        public setPointLeft(x) : any{
            if (typeof x == "object")
                {
                    this.pointLeft[0] = x.x1;
                    this.pointLeft[1] = x.y1;
                    return this;
                }
            else if (x instanceof math.matrix)
                {
                    this.pointLeft = x;
                    return this;
                }
        }
        
        // Using setPointRight({x,y});
        public setPointRight(x: {x1 : number, y1 : number}) : Builder;
        // Using setPointRight(point);
        public setPointRight(x) : any{
            if (typeof x == "object")
                {
                    this.pointRight[0] = x.x1;
                    this.pointRight[1] = x.y1;
                    return this;
                }
            else if (x instanceof math.matrix)
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