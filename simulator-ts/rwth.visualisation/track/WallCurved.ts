import {Wall} from "./Wall";

export {WallCurved};

class WallCurved extends Wall {
    
    public static getBuilder() {
        return new WallCurved.Builder();
    }


    public pointMiddle : number[];
    public radius : number;
    public pointLower : number[];
    public pointUpper : number[];

    public constructor (pointMiddle : number[], radius : number, pointLower : number[], pointUpper : number[]) {
        
        super();
        this.pointMiddle = pointMiddle;
        this.radius = radius;
        this.pointLower = pointLower;
        this.pointUpper = pointUpper;
    }

    public inBoundaries(point : number[]) {
        return super.inBoundaries(this.pointLower, point, this.pointUpper);
    }


    public static Builder = class Builder {
        
        private pointMiddle : number[];
        private radius : number;
        private pointLower : number[];
        private pointUpper : number[];

        Builder() {
            this.pointMiddle = [0,0];
            this.pointLower = [0,0];
            this.pointUpper = [0,0];
        }
        
        // Using setPointMiddle like an object ({x,y});
        public setPointMiddle(x : {x1 : number, y1 : number});
        // Using setPointMiddle like an Array
        public setPointMiddle(x : number[]);
        public setPointMiddle(x) : any{
            
            if (typeof x == "object"){
                
                this.pointMiddle[0] = x.x1;
                this.pointMiddle[1] = x.y1;
                return this;
            }
            else if (x instanceof Array)
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
        // Using setPointUpper like an Array
        public setPointUpper(x : number[]);
        public setPointUpper(x) : any {
        
            if (typeof x == "object"){

                this.pointUpper[0] = x.x1;
                this.pointUpper[1] = x.y1;
                return this;
            }
            else if(x instanceof Array){
                
                this.pointUpper = x;
                return this;
            }
        }

        // Using setPointLower like an object ({x,y});
        public setPointLower(x : {x1 : number, y1 : number});
        // Using setPointLower like an Array
        public setPointLower(x : number[]);
        public setPointLower(x) : any {
        
            if (typeof x == "object"){
                
                this.pointLower[0] = x.x1;
                this.pointLower[1] = x.y1;
                return this;
            }
            else if (x instanceof Array)
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