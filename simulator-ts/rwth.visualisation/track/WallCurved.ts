import {Wall} from "./Wall";
import {Vector} from 'ts-vector';

export {WallCurved};

class WallCurved extends Wall {
    
    public static getBuilder() {
        return new WallCurved.Builder();
    }


    public pointMiddle : Vector;
    public radius : number;
    public pointLower : Vector;
    public pointUpper : Vector;

    public constructor (pointMiddle : Vector, radius : number, pointLower : Vector, pointUpper : Vector) {
        
        super();
        this.pointMiddle = pointMiddle;
        this.radius = radius;
        this.pointLower = pointLower;
        this.pointUpper = pointUpper;
    }

    public inBoundaries(point : Vector) {
        return super.inBoundaries(this.pointLower, point, this.pointUpper);
    }


    public static Builder = class Builder {
        
        private pointMiddle : Vector;
        private radius : number;
        private pointLower : Vector;
        private pointUpper : Vector;

        Builder() {
            this.pointMiddle = new Vector(2);
            this.pointLower = new Vector(2);
            this.pointUpper = new Vector(2);
        }
        
        // Using setPointMiddle like an object ({x,y});
        public setPointMiddle(x : {x1 : number, y1 : number});
        // Using setPointMiddle like an Vector
        public setPointMiddle(x : Vector);
        public setPointMiddle(x) : any{
            
            if (typeof x == "object"){
                
                this.pointMiddle[0] = x.x1;
                this.pointMiddle[1] = x.y1;
                return this;
            }
            else if (x instanceof Vector)
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
        public setPointUpper(x : Vector);
        public setPointUpper(x) : any {
        
            if (typeof x == "object"){

                this.pointUpper[0] = x.x1;
                this.pointUpper[1] = x.y1;
                return this;
            }
            else if(x instanceof Vector){
                
                this.pointUpper = x;
                return this;
            }
        }

        // Using setPointLower like an object ({x,y});
        public setPointLower(x : {x1 : number, y1 : number});
        // Using setPointLower like an Vector
        public setPointLower(x : Vector);
        public setPointLower(x) : any {
        
            if (typeof x == "object"){
                
                this.pointLower[0] = x.x1;
                this.pointLower[1] = x.y1;
                return this;
            }
            else if (x instanceof Vector)
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