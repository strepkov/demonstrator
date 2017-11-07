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

    private static void addWall2() {
        RealVector pointLeft = new ArrayRealVector(2);
        RealVector pointRight = new ArrayRealVector(2);

        pointLeft.setEntry(1, 10);
        pointLeft.setEntry(0, 58);

        pointRight.setEntry(1, 10);
        pointRight.setEntry(0, -122);

        walls.add(new WallLinear(pointLeft, pointRight));
    }

    private static void addWall3() {
        RealVector pointLeft = new ArrayRealVector(2);
        RealVector pointRight = new ArrayRealVector(2);

        pointLeft.setEntry(1, -36);
        pointLeft.setEntry(0, 109);

        pointRight.setEntry(1, -9.5);
        pointRight.setEntry(0, 58);

        walls.add(new WallLinear(pointLeft, pointRight));
    }

    private static void addWall4() {
        RealVector pointLeft = new ArrayRealVector(2);
        RealVector pointRight = new ArrayRealVector(2);

        pointLeft.setEntry(1, -18);
        pointLeft.setEntry(0, 114);

        pointRight.setEntry(1, 10);
        pointRight.setEntry(0, 58);

        walls.add(new WallLinear(pointLeft, pointRight));
    }

    private static void addWall5() {
        RealVector pointMiddle = new ArrayRealVector(2);
        RealVector pointLower = new ArrayRealVector(2);
        RealVector pointUpper = new ArrayRealVector(2);

        double radius = 60;

        pointMiddle.setEntry(1, 22);
        pointMiddle.setEntry(0, 123);

        pointLower.setEntry(1, 22);
        pointLower.setEntry(0, 184);

        pointUpper.setEntry(1, -36);
        pointUpper.setEntry(0, 109);

        walls.add(new WallCurved(pointMiddle, radius, pointLower, pointUpper));
    }

    private static void addWall6() {
        RealVector pointMiddle = new ArrayRealVector(2);
        RealVector pointLower = new ArrayRealVector(2);
        RealVector pointUpper = new ArrayRealVector(2);

        double radius = 41;

        pointMiddle.setEntry(1, 22);
        pointMiddle.setEntry(0, 123);

        pointLower.setEntry(1, 22);
        pointLower.setEntry(0, 164);

        pointUpper.setEntry(1, -18);
        pointUpper.setEntry(0, 114);

        walls.add(new WallCurved(pointMiddle, radius, pointLower, pointUpper));
    }

    private static void addWall7() {
        RealVector pointMiddle = new ArrayRealVector(2);
        RealVector pointLower = new ArrayRealVector(2);
        RealVector pointUpper = new ArrayRealVector(2);

        double radius = 60;

        pointMiddle.setEntry(1, 22);
        pointMiddle.setEntry(0, 123);

        pointLower.setEntry(1, 79);
        pointLower.setEntry(0, 137.6);

        pointUpper.setEntry(1, 22);
        pointUpper.setEntry(0, 184);

        walls.add(new WallCurved(pointMiddle, radius, pointLower, pointUpper));
    }

    private static void addWall8() {
        RealVector pointMiddle = new ArrayRealVector(2);
        RealVector pointLower = new ArrayRealVector(2);
        RealVector pointUpper = new ArrayRealVector(2);

        double radius = 41;

        pointMiddle.setEntry(1, 22);
        pointMiddle.setEntry(0, 123);

        pointLower.setEntry(1, 60.6);
        pointLower.setEntry(0, 133);

        pointUpper.setEntry(1, 22);
        pointUpper.setEntry(0, 164);

        walls.add(new WallCurved(pointMiddle, radius, pointLower, pointUpper));
    }

    private static void addWall9() {
        RealVector pointLeft = new ArrayRealVector(2);
        RealVector pointRight = new ArrayRealVector(2);

        pointLeft.setEntry(1, 79);
        pointLeft.setEntry(0, 137.6);

        pointRight.setEntry(1, 83.5);
        pointRight.setEntry(0, 108);

        walls.add(new WallLinear(pointLeft, pointRight));
    }

    private static void addWall10() {
        RealVector pointLeft = new ArrayRealVector(2);
        RealVector pointRight = new ArrayRealVector(2);

        pointLeft.setEntry(1, 60.6);
        pointLeft.setEntry(0, 133);

        pointRight.setEntry(1, 65.8);
        pointRight.setEntry(0, 98.5);

        walls.add(new WallLinear(pointLeft, pointRight));
    }

    private static void addWall11() {
        RealVector pointLeft = new ArrayRealVector(2);
        RealVector pointRight = new ArrayRealVector(2);

        pointLeft.setEntry(1, 83.5);
        pointLeft.setEntry(0, 108);

        pointRight.setEntry(1, 110);
        pointRight.setEntry(0, 59);

        walls.add(new WallLinear(pointLeft, pointRight));
    }

    private static void addWall12() {
        RealVector pointLeft = new ArrayRealVector(2);
        RealVector pointRight = new ArrayRealVector(2);

        pointLeft.setEntry(1, 65.8);
        pointLeft.setEntry(0, 98.5);

        pointRight.setEntry(1, 90);
        pointRight.setEntry(0, 58);

        walls.add(new WallLinear(pointLeft, pointRight));
    }

    private static void addWall13() {
        RealVector pointLeft = new ArrayRealVector(2);
        RealVector pointRight = new ArrayRealVector(2);

        pointLeft.setEntry(1, 110);
        pointLeft.setEntry(0, 59);

        pointRight.setEntry(1, 110);
        pointRight.setEntry(0, -121);

        walls.add(new WallLinear(pointLeft, pointRight));
    }

    private static void addWall14() {
        RealVector pointLeft = new ArrayRealVector(2);
        RealVector pointRight = new ArrayRealVector(2);

        pointLeft.setEntry(1, 90);
        pointLeft.setEntry(0, 58);

        pointRight.setEntry(1, 90.8);
        pointRight.setEntry(0, -122);

        walls.add(new WallLinear(pointLeft, pointRight));
    }

    private static void addWall15() {
        RealVector pointMiddle = new ArrayRealVector(2);
        RealVector pointLower = new ArrayRealVector(2);
        RealVector pointUpper = new ArrayRealVector(2);

        double radius = 61;

        pointMiddle.setEntry(1, 51.3);
        pointMiddle.setEntry(0,  -123);

        pointLower.setEntry(1, 110);
        pointLower.setEntry(0, -121);

        pointUpper.setEntry(1, 51.3);
        pointUpper.setEntry(0, -183);

        walls.add(new WallCurved(pointMiddle, radius, pointLower, pointUpper));
    }

    private static void addWall16() {
        RealVector pointMiddle = new ArrayRealVector(2);
        RealVector pointLower = new ArrayRealVector(2);
        RealVector pointUpper = new ArrayRealVector(2);

        double radius = 41;

        pointMiddle.setEntry(1, 51.3);
        pointMiddle.setEntry(0, -123);

        pointLower.setEntry(1, 90.8);
        pointLower.setEntry(0, -123);

        pointUpper.setEntry(1, 51.3);
        pointUpper.setEntry(0, -164);

        walls.add(new WallCurved(pointMiddle, radius, pointLower, pointUpper));
    }

    private static void addWall17() {
        RealVector pointMiddle = new ArrayRealVector(2);
        RealVector pointLower = new ArrayRealVector(2);
        RealVector pointUpper = new ArrayRealVector(2);

        double radius = 61;

        pointMiddle.setEntry(1, 51.3);
        pointMiddle.setEntry(0, -123);

        pointLower.setEntry(1, 51.3);
        pointLower.setEntry(0, -183);

        pointUpper.setEntry(1, -9.5);
        pointUpper.setEntry(0, -122);

        walls.add(new WallCurved(pointMiddle, radius, pointLower, pointUpper));
    }

    private static void addWall18() {
        RealVector pointMiddle = new ArrayRealVector(2);
        RealVector pointLower = new ArrayRealVector(2);
        RealVector pointUpper = new ArrayRealVector(2);

        double radius = 41;

        pointMiddle.setEntry(1, 51.3);
        pointMiddle.setEntry(0, -123);

        pointLower.setEntry(1, 51.3);
        pointLower.setEntry(0, -164);

        pointUpper.setEntry(1,  10);
        pointUpper.setEntry(0, -122);

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