import {Wall} from "./Wall";
import {WallCurved} from "./WallCurved";
import {WallLinear} from "./WallLinear";
import * as math from "../../libs/math.js";

export {Track}

//abstract ?
class Track {
    
    public walls = new Array<Wall>();

    public constructor() {
        this.init();
    }
    
    private init() {

        this.addWall1();
        this.addWall2();
        this.addWall3();
        this.addWall4();
        this.addWall5();
        this.addWall6();
        this.addWall7();
        this.addWall8();
        this.addWall9();
        this.addWall10();
        this.addWall11();
        this.addWall12();
        this.addWall13();
        this.addWall14();
        this.addWall15();
        this.addWall16();
        this.addWall17();
        this.addWall18();
    }

    private addWall1(){

        let pointLeft = math.matrix();;
        let pointRight = math.matrix();;

        pointLeft[1] = -9.5;
        pointLeft[0] = 58;

        pointRight[1] = -9.5;
        pointRight[0] = 122;

        this.walls.push(new WallLinear(pointLeft, pointRight));
    }

    private addWall2() {
        let pointLeft = math.matrix();
        let pointRight = math.matrix();

        pointLeft[1] = 10;
        pointLeft[0] = 58;

        pointRight[1] = 10;
        pointRight[0] = -122;

        this.walls.push(new WallLinear(pointLeft, pointRight));
    }

    private addWall3() {
        let pointLeft = math.matrix();
        let pointRight = math.matrix();

        pointLeft[1] = -36;
        pointLeft[0] = 109;

        pointRight[1] = -9.5;
        pointRight[0] = 58;

        this.walls.push(new WallLinear(pointLeft, pointRight));
    }

    private addWall4() {
        let pointLeft = math.matrix();
        let pointRight = math.matrix();

        pointLeft[1] = -18;
        pointLeft[0] = 114;

        pointRight[1] = 10;
        pointRight[0] = 58;

        this.walls.push(new WallLinear(pointLeft, pointRight));
    }

    private addWall5() {
        let pointMiddle = math.matrix();
        let pointLower = math.matrix();
        let pointUpper = math.matrix();

        let radius = 60;

        pointMiddle[1] = 22;
        pointMiddle[0] = 123;

        pointLower[1] = 22;
        pointLower[0] = 184;

        pointUpper[1] = -36;
        pointUpper[0] = 109;

        this.walls.push(new WallCurved(pointMiddle, radius, pointLower, pointUpper));
    }

    private addWall6() {
        let pointMiddle = math.matrix();
        let pointLower = math.matrix();
        let pointUpper = math.matrix();

        let radius = 41;

        pointMiddle[1] = 22;
        pointMiddle[0] = 123;

        pointLower[1] = 22;
        pointLower[0] = 164;

        pointUpper[1] = -18;
        pointUpper[0] = 114;

        this.walls.push(new WallCurved(pointMiddle, radius, pointLower, pointUpper));
    }

    private addWall7() {
        let pointMiddle = math.matrix();
        let pointLower = math.matrix();
        let pointUpper = math.matrix();

        let radius = 60;

        pointMiddle[1] = 22;
        pointMiddle[0] = 123;

        pointLower[1] = 79;
        pointLower[0] = 137.6;

        pointUpper[1] = 22;
        pointUpper[0] = 184;

        this.walls.push(new WallCurved(pointMiddle, radius, pointLower, pointUpper));
    }

    private addWall8() {
        let pointMiddle = math.matrix();
        let pointLower = math.matrix();
        let pointUpper = math.matrix();

        let radius = 41;

        pointMiddle[1] = 22;
        pointMiddle[0] = 123;

        pointLower[1] = 60.6;
        pointLower[0] = 133;

        pointUpper[1] = 22;
        pointUpper[0] = 164;

        this.walls.push(new WallCurved(pointMiddle, radius, pointLower, pointUpper));
    }

    private addWall9() {
        let pointLeft = math.matrix();
        let pointRight = math.matrix();

        pointLeft[1] = 79;
        pointLeft[0] = 137.6;

        pointRight[1] = 83.5;
        pointRight[0] = 108;

        this.walls.push(new WallLinear(pointLeft, pointRight));
    }

    private addWall10() {
        let pointLeft = math.matrix();
        let pointRight = math.matrix();

        pointLeft[1] = 60.6;
        pointLeft[0] = 133;

        pointRight[1] = 65.8;
        pointRight[0] = 98.5;

        this.walls.push(new WallLinear(pointLeft, pointRight));
    }

    private addWall11() {
        let pointLeft = math.matrix();
        let pointRight = math.matrix();

        pointLeft[1] = 83.5;
        pointLeft[0] = 108;

        pointRight[1] = 110;
        pointRight[0] = 59;

        this.walls.push(new WallLinear(pointLeft, pointRight));
    }

    private addWall12() {
        let pointLeft = math.matrix();
        let pointRight = math.matrix();

        pointLeft[1] = 65.8;
        pointLeft[0] = 98.5;

        pointRight[1] = 90;
        pointRight[0] = 58;

        this.walls.push(new WallLinear(pointLeft, pointRight));
    }

    private addWall13() {
        let pointLeft = math.matrix();
        let pointRight = math.matrix();

        pointLeft[1] = 110;
        pointLeft[0] = 59;

        pointRight[1] = 110;
        pointRight[0] = -121;

        this.walls.push(new WallLinear(pointLeft, pointRight));
    }

    private addWall14() {
        let pointLeft = math.matrix();
        let pointRight = math.matrix();

        pointLeft[1] = 90;
        pointLeft[0] = 58;

        pointRight[1] = 90.8;
        pointRight[0] = -122;

        this.walls.push(new WallLinear(pointLeft, pointRight));
    }

    private addWall15() {
        let pointMiddle = math.matrix();
        let pointLower = math.matrix();
        let pointUpper = math.matrix();

        let radius = 61;

        pointMiddle[1] = 51.3;
        pointMiddle[0] =  -123;

        pointLower[1] = 110;
        pointLower[0] = -121;

        pointUpper[1] = 51.3;
        pointUpper[0] = -183;

        this.walls.push(new WallCurved(pointMiddle, radius, pointLower, pointUpper));
    }

    private addWall16() {
        let pointMiddle = math.matrix();
        let pointLower = math.matrix();
        let pointUpper = math.matrix();

        let radius = 41;

        pointMiddle[1] = 51.3;
        pointMiddle[0] = -123;

        pointLower[1] = 90.8;
        pointLower[0] = -123;

        pointUpper[1] = 51.3;
        pointUpper[0] = -164;

        this.walls.push(new WallCurved(pointMiddle, radius, pointLower, pointUpper));
    }

    private addWall17() {
        let pointMiddle = math.matrix();
        let pointLower = math.matrix();
        let pointUpper = math.matrix();

        let radius = 61;

        pointMiddle[1] = 51.3;
        pointMiddle[0] = -123;

        pointLower[1] = 51.3;
        pointLower[0] = -183;

        pointUpper[1] = -9.5;
        pointUpper[0] = -122;

        this.walls.push(new WallCurved(pointMiddle, radius, pointLower, pointUpper));
    }

    private addWall18() {
        let pointMiddle = math.matrix();
        let pointLower = math.matrix();
        let pointUpper = math.matrix();

        let radius = 41;

        pointMiddle[1] = 51.3;
        pointMiddle[0] = -123;

        pointLower[1] = 51.3;
        pointLower[0] = -164;

        pointUpper[1] = 10;
        pointUpper[0] -122;

        this.walls.push(new WallCurved(pointMiddle, radius, pointLower, pointUpper));
    }
}