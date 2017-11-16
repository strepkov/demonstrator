import {Wall} from "./Wall";

export {WallCurved};

class WallCurved extends Wall {
    
    public getBuilder() {
        return new this.Builder();
    }

    public pointMiddle : number[];
    public pointLower : number[];
    public pointUpper : number[];
    public radius : number;

    public constructor (pointMiddle, radius, pointLower, pointUpper){
        
        super();
        this.pointMiddle = [0,0];
        this.radius = 0;
        this.pointLower = [0,0];
        this.pointUpper = [0,0];
    }

    public inBoundaries(point: number[]) {
        return super.inBoundaries(this.pointLower, point, this.pointUpper);
    }


    public Builder = class Builder {
        
        private pointMiddle : number[];
        private pointLower : number[];
        private pointUpper : number[];
        private radius : number;

        public constructor() {
            this.pointMiddle = [0,0];
            this.pointLower = [0,0];
            this.pointUpper = [0,0];
        }
        
        // Using setPointMiddle like an object ({x,y});
        public setPointMiddle(x : {x1 : number, y1 : number}) : WallCurved;
        // Using setPointMiddle like an Vector
        public setPointMiddle(x : number[]): WallCurved;
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
        public setPointUpper(x : {x1 : number, y1 : number}): WallCurved;
        // Using setPointUpper like an Vector
        public setPointUpper(x : number[]): WallCurved;
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
        public setPointLower(x : {x1 : number, y1 : number}): WallCurved;
        // Using setPointLower like an Vector
        public setPointLower(x : number[]): WallCurved;
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

        public build(): WallCurved  {
            return new WallCurved(this.pointMiddle, this.radius, this.pointLower, this.pointUpper);
        }
    }
}