package de.rwth.visualization.car;

import com.sun.org.apache.regexp.internal.RE;
import de.rwth.visualization.coord.Orientation;
import org.apache.commons.math3.linear.ArrayRealVector;
import org.apache.commons.math3.linear.RealVector;

import java.util.HashMap;
import java.util.Map;

import {Orientation} from "../coord/Orientation";
import {Sensor} from "./Sensor";

public class Car {

    private static instance : Car;

    // TODO: Static?
    public getInstance(): Car {
        if(Car.instance == null) {
            Car.instance = new Car(0, 0);
        }
        return Car.instance;
    }

    private position: number[];
    private degree: number;
    private sensors: Map<Orientation, Sensor>;

    public constructor(x: number, y:number) {
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
    
    public setPosition(x: number, y: number) {
        this.getInstance().doSetPosition(x, y);
    }

    public setPosition(position : number[]) {
        this.getInstance().doSetPosition(position);
    }

    public getPosition(): number[] {
        return this.getInstance().doGetPosition();
    }




    public setDegree(double degree) {
        getInstance().doSetDegree(degree);
    }

    public static double getDegree() {
        return getInstance().doGetDegree();
    }

    public static Sensor getSensor(Orientation orientation) {
        return getInstance().doGetSensor(orientation);
    }

    protected void doSetPosition(double x, double y) {
        this.position.setEntry(0, x);
        this.position.setEntry(1, y);
    }

    protected void doSetPosition(RealVector position) {
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
        direction: number[] = new ArrayRealVector(2);
        RealVector offset = new ArrayRealVector(2);

        direction.setEntry(1, 0);
        direction.setEntry(0, 1);

        offset.setEntry(1, 1.85);
        offset.setEntry(0, 4.15);

        this.sensors.put(Orientation.FRONT_LEFT,
                new Sensor(offset, direction));
    }

    protected void doInitSensorFrontLeftSide() {
        RealVector direction = new ArrayRealVector(2);
        RealVector offset = new ArrayRealVector(2);

        direction.setEntry(1, 1);
        direction.setEntry(0, 0);

        offset.setEntry(1, 1.85);
        offset.setEntry(0, 4.15);

        this.sensors.put(Orientation.FRONT_LEFT_SIDE,
                new Sensor(offset, direction));
    }

    protected void doInitSensorFrontRight() {
        RealVector direction = new ArrayRealVector(2);
        RealVector offset = new ArrayRealVector(2);

        direction.setEntry(1, 0);
        direction.setEntry(0, 1);

        offset.setEntry(1, -1.85);
        offset.setEntry(0, 4.15);

        this.sensors.put(Orientation.FRONT_RIGHT,
                new Sensor(offset, direction));
    }

    protected void doInitSensorFrontRightSide() {
        RealVector direction = new ArrayRealVector(2);
        RealVector offset = new ArrayRealVector(2);

        direction.setEntry(1, -1);
        direction.setEntry(0, 0);

        offset.setEntry(1, -1.85);
        offset.setEntry(0, 4.15);

        this.sensors.put(Orientation.FRONT_RIGHT_SIDE,
                new Sensor(offset, direction));
    }

    protected void doInitSensorBackLeft() {
        RealVector direction = new ArrayRealVector(2);
        RealVector offset = new ArrayRealVector(2);

        direction.setEntry(1, 0);
        direction.setEntry(0, -1);

        offset.setEntry(1, 1.85);
        offset.setEntry(0, -4.15);

        this.sensors.put(Orientation.BACK_LEFT,
                new Sensor(offset, direction));
    }

    protected void doInitSensorBackLeftSide() {
        RealVector direction = new ArrayRealVector(2);
        RealVector offset = new ArrayRealVector(2);

        direction.setEntry(1, 1);
        direction.setEntry(0, 0);

        offset.setEntry(1, 1.85);
        offset.setEntry(0, -4.15);

        this.sensors.put(Orientation.BACK_LEFT_SIDE,
                new Sensor(offset, direction));
    }

    protected void doInitSensorBackRight() {
        RealVector direction = new ArrayRealVector(2);
        RealVector offset = new ArrayRealVector(2);

        direction.setEntry(1, 0);
        direction.setEntry(0, -1);

        offset.setEntry(1, -1.85);
        offset.setEntry(0, -4.15);

        this.sensors.put(Orientation.BACK_RIGHT,
                new Sensor(offset, direction));
    }

    protected void doInitSensorBackRightSide() {
        RealVector direction = new ArrayRealVector(2);
        RealVector offset = new ArrayRealVector(2);

        direction.setEntry(1, -1);
        direction.setEntry(0, 0);

        offset.setEntry(1, -1.85);
        offset.setEntry(0, -4.15);

        this.sensors.put(Orientation.BACK_RIGHT_SIDE,
                new Sensor(offset, direction));
    }

    protected void doInitPosition(double x, double y) {
        this.position = new ArrayRealVector(2);

        this.position.setEntry(0, x);
        this.position.setEntry(1, y);
    }
}