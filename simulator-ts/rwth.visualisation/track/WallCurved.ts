import {Wall} from "./Wall";
import * as math from '../../libs/math';

export {WallCurved};

class WallCurved extends Wall {
    
    public getBuilder() {
        return new this.Builder();
    }


    public pointMiddle = math.matrix();
    public pointLower = math.matrix();
    public pointUpper = math.matrix();
    public radius : number;

    public constructor (pointMiddle, radius, pointLower, pointUpper) {
        
        super();
        this.pointMiddle = pointMiddle;
        this.radius = radius;
        this.pointLower = pointLower;
        this.pointUpper = pointUpper;
    }

    public inBoundaries(point) {
        return super.inBoundaries(this.pointLower, point, this.pointUpper);
    }


    public Builder = class Builder {
        
        private pointMiddle = math.matrix();
        private pointLower = math.matrix();
        private pointUpper = math.matrix();
        private radius : number;

        public constructor() {
            this.pointMiddle = math.matrix();
            this.pointLower = math.matrix();
            this.pointUpper = math.matrix();
        }
        
        // Using setPointMiddle like an object ({x,y});
        public setPointMiddle(x : {x1 : number, y1 : number});
        // Using setPointMiddle like an Vector
        public setPointMiddle(x) : any{
            
            if (typeof x == "object"){
                
                this.pointMiddle[0] = x.x1;
                this.pointMiddle[1] = x.y1;
                return this;
            }
            else if (x instanceof math.matrix)
            {
                this.pointMiddle = x;
                return this;
            }
        }

        public setRadius(radius : number) {
            this.radius = radius;
            return this;
        }

        // Using setPointUpper like an object ({x,y});
        public setPointUpper(x : {x1 : number, y1 : number});
        // Using setPointUpper like an Vector
        public setPointUpper(x) : any {
        
            if (typeof x == "object"){

                this.pointUpper[0] = x.x1;
                this.pointUpper[1] = x.y1;
                return this;
            }
            else if(x instanceof math.matrix){
                
                this.pointUpper = x;
                return this;
            }
        }

        // Using setPointLower like an object ({x,y});
        public setPointLower(x : {x1 : number, y1 : number});
        // Using setPointLower like an Vector
        public setPointLower(x) : any {
        
            if (typeof x == "object"){
                
                this.pointLower[0] = x.x1;
                this.pointLower[1] = x.y1;
                return this;
            }
            else if (x instanceof math.matrix)
            {
                this.pointLower = x;
                return this;
            }
        }

        public build() {
            return new WallCurved(this.pointMiddle, this.radius, this.pointLower, this.pointUpper);
        }
    }
}