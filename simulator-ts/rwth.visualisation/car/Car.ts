// package de.rwth.visualization.car;

// import com.sun.org.apache.regexp.internal.RE;
// import de.rwth.visualization.coord.Orientation;
// import org.apache.commons.math3.linear.ArrayRealVector;
// import org.apache.commons.math3.linear.RealVector;

// import java.util.HashMap;
// import java.util.Map;

import {Orientation} from "../coord/Orientation";
import * as math from "../../libs/math.js";

export {Car}

class Car {

    private instance : Car;
    private position = math.matrix();
    private degree : number;
    private sensors : Map<Orientation, Sensor>;


    public getInstance() {
        if(this.instance == null) {
            this.instance = new Car(0, 0);
        }
        return this.instance;
    }

    public constructor(x : number, y : number) {
        
        this.sensors = new HashMap<>();

        doInitSensorFrontLeft();
        doInitSensorFrontRight();
        doInitSensorFrontLeftSide();
        doInitSensorFrontRightSide();
        doInitSensorBackLeft();
        doInitSensorBackRight();
        doInitSensorBackLeftSide();
        doInitSensorBackRightSide();
        doInitPosition(x, y);
    }

    public setPosition(x : number, y : number) {

        getInstance().doSetPosition(x, y);
    }

    public setPosition(RealVector position) {
        
        getInstance().doSetPosition(position);
    }

    public getPosition() {
        
        return getInstance().doGetPosition();
    }

    public setDegree(degree : number) {

        getInstance().doSetDegree(degree);
    }

    public getDegree() {
        
        return getInstance().doGetDegree();
    }

    public getSensor(orientation : Orientation) {
        
        return getInstance().doGetSensor(orientation);
    }

    // protected doSetPosition(position : {x : number,y : number} {

    //     this.position[0] = position.x;
    //     this.position.setEntry(1, y);
    // }

    protected doSetPosition(position) {
        this.position = position;
    }

    protected RealVector doGetPosition() {
        return this.position;
    }

    protected void doSetDegree(double degree) {
        this.degree = degree;
    }

    protected double doGetDegree() {
        return this.degree;
    }

    protected Sensor doGetSensor(Orientation orientation) {
        return this.sensors.get(orientation);
    }

    protected doInitSensorFrontLeft() {
        
        let direction = math.matrix();
        let offset = math.matrix();

        direction.setEntry(1, 0);
        direction.setEntry(0, 1);

        offset.setEntry(1, 1.85);
        offset.setEntry(0, 4.15);

        this.sensors.put(Orientation.FRONT_LEFT,
                new Sensor(offset, direction));
    }

    protected doInitSensorFrontLeftSide() {
        RealVector direction = new ArrayRealVector(2);
        RealVector offset = new ArrayRealVector(2);

        direction.setEntry(1, 1);
        direction.setEntry(0, 0);

        offset.setEntry(1, 1.85);
        offset.setEntry(0, 4.15);

        this.sensors.put(Orientation.FRONT_LEFT_SIDE,
                new Sensor(offset, direction));
    }

    protected doInitSensorFrontRight() {
        RealVector direction = new ArrayRealVector(2);
        RealVector offset = new ArrayRealVector(2);

        direction.setEntry(1, 0);
        direction.setEntry(0, 1);

        offset.setEntry(1, -1.85);
        offset.setEntry(0, 4.15);

        this.sensors.put(Orientation.FRONT_RIGHT,
                new Sensor(offset, direction));
    }

    protected doInitSensorFrontRightSide() {
        RealVector direction = new ArrayRealVector(2);
        RealVector offset = new ArrayRealVector(2);

        direction.setEntry(1, -1);
        direction.setEntry(0, 0);

        offset.setEntry(1, -1.85);
        offset.setEntry(0, 4.15);

        this.sensors.put(Orientation.FRONT_RIGHT_SIDE,
                new Sensor(offset, direction));
    }

    protected doInitSensorBackLeft() {
        RealVector direction = new ArrayRealVector(2);
        RealVector offset = new ArrayRealVector(2);

        direction.setEntry(1, 0);
        direction.setEntry(0, -1);

        offset.setEntry(1, 1.85);
        offset.setEntry(0, -4.15);

        this.sensors.put(Orientation.BACK_LEFT,
                new Sensor(offset, direction));
    }

    protected doInitSensorBackLeftSide() {
        RealVector direction = new ArrayRealVector(2);
        RealVector offset = new ArrayRealVector(2);

        direction.setEntry(1, 1);
        direction.setEntry(0, 0);

        offset.setEntry(1, 1.85);
        offset.setEntry(0, -4.15);

        this.sensors.put(Orientation.BACK_LEFT_SIDE,
                new Sensor(offset, direction));
    }

    protected doInitSensorBackRight() {
        RealVector direction = new ArrayRealVector(2);
        RealVector offset = new ArrayRealVector(2);

        direction.setEntry(1, 0);
        direction.setEntry(0, -1);

        offset.setEntry(1, -1.85);
        offset.setEntry(0, -4.15);

        this.sensors.put(Orientation.BACK_RIGHT,
                new Sensor(offset, direction));
    }

    protected doInitSensorBackRightSide() {
        RealVector direction = new ArrayRealVector(2);
        RealVector offset = new ArrayRealVector(2);

        direction.setEntry(1, -1);
        direction.setEntry(0, 0);

        offset.setEntry(1, -1.85);
        offset.setEntry(0, -4.15);

        this.sensors.put(Orientation.BACK_RIGHT_SIDE,
                new Sensor(offset, direction));
    }

    protected doInitPosition(double x, double y) {
        this.position = new ArrayRealVector(2);

        this.position.setEntry(0, x);
        this.position.setEntry(1, y);
    }
}