abstract class Track {
    
    //static ?
    public walls : Array<Wall>;

    // static {
    //     init();
    // }

    // inits the whole track,
    // the indices can be look up at Three.js/Self-Driving Car/images/racingtrack.gif
    private static init() {
        
        let walls = new Array<Wall>();

        addWall1();
        addWall2();
        addWall3();
        addWall4();
        addWall5();
        addWall6();
        addWall7();
        addWall8();
        addWall9();
        addWall10();
        addWall11();
        addWall12();
        addWall13();
        addWall14();
        addWall15();
        addWall16();
        addWall17();
        addWall18();
    }

    private static addWall1(){

        let pointLeft : number[] = [0,0];
        let pointRight : number[] = [0.0];

        pointLeft[1] = -9.5;
        pointLeft[0] = 58;

        pointRight[1] = -9.5;
        pointRight[0] = 122;

        this.walls.push(new WallLinear(pointLeft, pointRight));
    }

    private static addWall2() {
        let pointLeft : number[] = [0.0];
        let pointRight : number[] = [0.0];

        pointLeft[1] = 10;
        pointLeft[0] = 58;

        pointRight[1] = 10;
        pointRight[0] = -122;

        walls.add(new WallLinear(pointLeft, pointRight));
    }

    private static addWall3() {
        let pointLeft : number[] = [0.0];
        let pointRight : number[] = [0.0];

        pointLeft[1] = -36;
        pointLeft[0] = 109;

        pointRight[1] = -9.5;
        pointRight[0] = 58;

        walls.add(new WallLinear(pointLeft, pointRight));
    }

    private static addWall4() {
        let pointLeft : number[] = [0.0];
        let pointRight : number[] = [0.0];

        pointLeft[1] = -18;
        pointLeft[0] = 114;

        pointRight[1] = 10;
        pointRight[0] = 58;

        walls.add(new WallLinear(pointLeft, pointRight));
    }

    private static addWall5() {
        let pointMiddle : number[] = [0.0];
        let pointLower : number[] = [0.0];
        let pointUpper : number[] = [0.0];

        let radius = 60;

        pointMiddle[1] = 22;
        pointMiddle[0] = 123;

        pointLower[1] = 22;
        pointLower[0] = 184;

        pointUpper[1] = -36;
        pointUpper[0] = 109;

        walls.add(new WallCurved(pointMiddle, radius, pointLower, pointUpper));
    }

    private static addWall6() {
        let pointMiddle : number[] = [0.0];
        let pointLower : number[] = [0.0];
        let pointUpper : number[] = [0.0];

        let radius = 41;

        pointMiddle[1] = 22;
        pointMiddle[0] = 123;

        pointLower[1] = 22;
        pointLower[0] = 164;

        pointUpper[1] = -18;
        pointUpper[0] = 114;

        walls.add(new WallCurved(pointMiddle, radius, pointLower, pointUpper));
    }

    private static addWall7() {
        let pointMiddle : number[] = [0.0];
        let pointLower : number[] = [0.0];
        let pointUpper : number[] = [0.0];

        let radius = 60;

        pointMiddle[1] = 22;
        pointMiddle[0] = 123;

        pointLower[1] = 79;
        pointLower[0] = 137.6;

        pointUpper[1] = 22;
        pointUpper[0] = 184;

        walls.add(new WallCurved(pointMiddle, radius, pointLower, pointUpper));
    }

    private static addWall8() {
        let pointMiddle : number[] = [0.0];
        let pointLower : number[] = [0.0];
        let pointUpper : number[] = [0.0];

        let radius = 41;

        pointMiddle[1] = 22;
        pointMiddle[0] = 123;

        pointLower[1] = 60.6;
        pointLower[0] = 133;

        pointUpper[1] = 22;
        pointUpper[0] = 164;

        walls.add(new WallCurved(pointMiddle, radius, pointLower, pointUpper));
    }

    private static addWall9() {
        let pointLeft : number[] = [0.0];
        let pointRight : number[] = [0.0];

        pointLeft[1] = 79;
        pointLeft[0] = 137.6;

        pointRight[1] = 83.5;
        pointRight[0] = 108;

        walls.add(new WallLinear(pointLeft, pointRight));
    }

    private static addWall10() {
        let pointLeft : number[] = [0.0];
        let pointRight : number[] = [0.0];

        pointLeft[1] = 60.6;
        pointLeft[0] = 133;

        pointRight[1] = 65.8;
        pointRight[0] = 98.5;

        walls.add(new WallLinear(pointLeft, pointRight));
    }

    private static addWall11() {
        let pointLeft : number[] = [0.0];
        let pointRight : number[] = [0.0];

        pointLeft[1] = 83.5;
        pointLeft[0] = 108;

        pointRight[1] = 110;
        pointRight[0] = 59;

        walls.add(new WallLinear(pointLeft, pointRight));
    }

    private static addWall12() {
        let pointLeft : number[] = [0.0];
        let pointRight : number[] = [0.0];

        pointLeft[1] = 65.8;
        pointLeft[0] = 98.5;

        pointRight[1] = 90;
        pointRight[0] = 58;

        walls.add(new WallLinear(pointLeft, pointRight));
    }

    private static addWall13() {
        let pointLeft : number[] = [0.0];
        let pointRight : number[] = [0.0];

        pointLeft[1] = 110;
        pointLeft[0] = 59;

        pointRight[1] = 110;
        pointRight[0] = -121;

        walls.add(new WallLinear(pointLeft, pointRight));
    }

    private static addWall14() {
        let pointLeft : number[] = [0.0];
        let pointRight : number[] = [0.0];

        pointLeft[1] = 90;
        pointLeft[0] = 58;

        pointRight[1] = 90.8;
        pointRight[0] = -122;

        walls.add(new WallLinear(pointLeft, pointRight));
    }

    private static addWall15() {
        let pointMiddle : number[] = [0.0];
        let pointLower : number[] = [0.0];
        let pointUpper : number[] = [0.0];

        let radius = 61;

        pointMiddle[1] = 51.3;
        pointMiddle[0] =  -123;

        pointLower[1] = 110;
        pointLower[0] = -121;

        pointUpper[1] = 51.3;
        pointUpper[0] = -183;

        walls.add(new WallCurved(pointMiddle, radius, pointLower, pointUpper));
    }

    private static addWall16() {
        let pointMiddle : number[] = [0.0];
        let pointLower : number[] = [0.0];
        let pointUpper : number[] = [0.0];

        let radius = 41;

        pointMiddle[1] = 51.3;
        pointMiddle[0] = -123;

        pointLower[1] = 90.8;
        pointLower[0] = -123;

        pointUpper[1] = 51.3;
        pointUpper[0] = -164;

        walls.add(new WallCurved(pointMiddle, radius, pointLower, pointUpper));
    }

    private static addWall17() {
        let pointMiddle : number[] = [0.0];
        let pointLower : number[] = [0.0];
        let pointUpper : number[] = [0.0];

        let radius = 61;

        pointMiddle[1] = 51.3;
        pointMiddle[0] = -123;

        pointLower[1] = 51.3;
        pointLower[0] = -183;

        pointUpper[1] = -9.5;
        pointUpper[0] = -122;

        walls.add(new WallCurved(pointMiddle, radius, pointLower, pointUpper));
    }

    private static addWall18() {
        let pointMiddle : number[] = [0.0];
        let pointLower : number[] = [0.0];
        let pointUpper : number[] = [0.0];

        let radius = 41;

        pointMiddle[1] = 51.3;
        pointMiddle[0] = -123;

        pointLower[1] = 51.3;
        pointLower[0] = -164;

        pointUpper[1] = 10;
        pointUpper[0] -122;

        walls.add(new WallCurved(pointMiddle, radius, pointLower, pointUpper));
    }


    /*private static void initParts() {
        parts = new ArrayList<>();

        TrackPart firstLinear = Track.createFirstLinear();
        TrackPart secondLinear = Track.createSecondLinear();
        TrackPart firstCircle = Track.createFirstCircle();
        TrackPart thirdLinear = Track.createThirdLinear();
        TrackPart fourthLinear = Track.createFourthLinear();
        TrackPart fifthLinear = Track.createFifthLinear();
        TrackPart secondCircle = Track.createSecondCircle();

        parts.add(firstLinear);
        parts.add(secondLinear);
        parts.add(firstCircle);
        parts.add(thirdLinear);
        parts.add(fourthLinear);
        parts.add(fifthLinear);
        parts.add(secondCircle);
    }

    private static TrackPart createFirstLinear() {
        RealVector pointUpperLeft = new ArrayRealVector(2);
        RealVector pointUpperRight = new ArrayRealVector(2);
        RealVector pointLowerLeft = new ArrayRealVector(2);
        RealVector pointLowerRight = new ArrayRealVector(2);

        pointUpperLeft.setEntry(0, -9.5);
        pointUpperLeft.setEntry(1, 58);

        pointUpperRight.setEntry(0, -9.5);
        pointUpperRight.setEntry(1, -122);

        pointLowerLeft.setEntry(0, 10);
        pointLowerLeft.setEntry(1, 58);

        pointLowerRight.setEntry(0, 10);
        pointLowerRight.setEntry(1, -122);

        return new TrackPartLinear(pointUpperLeft, pointUpperRight, pointLowerLeft, pointLowerRight);
    }

    private static TrackPart createSecondLinear() {
        RealVector pointUpperLeft = new ArrayRealVector(2);
        RealVector pointUpperRight = new ArrayRealVector(2);
        RealVector pointLowerLeft = new ArrayRealVector(2);
        RealVector pointLowerRight = new ArrayRealVector(2);

        pointUpperLeft.setEntry(0, -36);
        pointUpperLeft.setEntry(1, 109);

        pointUpperRight.setEntry(0, -9.5);
        pointUpperRight.setEntry(1, 58);

        pointLowerLeft.setEntry(0, -18);
        pointLowerLeft.setEntry(1, 114);

        pointLowerRight.setEntry(0, 10);
        pointLowerRight.setEntry(1, 58);

        return new TrackPartLinear(pointUpperLeft, pointUpperRight, pointLowerLeft, pointLowerRight);
    }

    private static TrackPart createFirstCircle() {
        RealVector point = new ArrayRealVector(2);

        point.setEntry(0, 22);
        point.setEntry(1, 123);

        double radiusInner = 41;
        double radiusOuter = 60;

        return new TrackPartCircle(point, radiusInner, radiusOuter);
    }

    private static TrackPart createThirdLinear() {
        RealVector pointUpperLeft = new ArrayRealVector(2);
        RealVector pointUpperRight = new ArrayRealVector(2);
        RealVector pointLowerLeft = new ArrayRealVector(2);
        RealVector pointLowerRight = new ArrayRealVector(2);

        pointUpperLeft.setEntry(0, 60.6);
        pointUpperLeft.setEntry(1, 133);

        pointUpperRight.setEntry(0, 65.8);
        pointUpperRight.setEntry(1, 98.5);

        pointLowerLeft.setEntry(0, 79);
        pointLowerLeft.setEntry(1, 137.6);

        pointLowerRight.setEntry(0, 83.5);
        pointLowerRight.setEntry(1, 108);

        return new TrackPartLinear(pointUpperLeft, pointUpperRight, pointLowerLeft, pointLowerRight);
    }

    private static TrackPart createFourthLinear() {
        RealVector pointUpperLeft = new ArrayRealVector(2);
        RealVector pointUpperRight = new ArrayRealVector(2);
        RealVector pointLowerLeft = new ArrayRealVector(2);
        RealVector pointLowerRight = new ArrayRealVector(2);

        pointUpperLeft.setEntry(0, 65.8);
        pointUpperLeft.setEntry(1, 98.5);

        pointUpperRight.setEntry(0, 90);
        pointUpperRight.setEntry(1, 58);

        pointLowerLeft.setEntry(0, 83.5);
        pointLowerLeft.setEntry(1, 108);

        pointLowerRight.setEntry(0, 110);
        pointLowerRight.setEntry(1, 59);

        return new TrackPartLinear(pointUpperLeft, pointUpperRight, pointLowerLeft, pointLowerRight);
    }

    private static TrackPart createFifthLinear() {
        RealVector pointUpperLeft = new ArrayRealVector(2);
        RealVector pointUpperRight = new ArrayRealVector(2);
        RealVector pointLowerLeft = new ArrayRealVector(2);
        RealVector pointLowerRight = new ArrayRealVector(2);

        pointUpperLeft.setEntry(0, 90);
        pointUpperLeft.setEntry(1, 58);

        pointUpperRight.setEntry(0, 90.8);
        pointUpperRight.setEntry(1, -122);

        pointLowerLeft.setEntry(0, 110);
        pointLowerLeft.setEntry(1, 59);

        pointLowerRight.setEntry(0, 110);
        pointLowerRight.setEntry(1, -121);

        return new TrackPartLinear(pointUpperLeft, pointUpperRight, pointLowerLeft, pointLowerRight);
    }

    private static TrackPart createSecondCircle() {
        RealVector point = new ArrayRealVector(2);

        point.setEntry(0, 51.3);
        point.setEntry(1, -123);

        double radiusInner = 41;
        double radiusOuter = 61;

        return new TrackPartCircle(point, radiusInner, radiusOuter);
    }*/
}