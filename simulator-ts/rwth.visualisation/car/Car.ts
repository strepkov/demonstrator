package de.rwth.visualization.car;

import com.sun.org.apache.regexp.internal.RE;
import de.rwth.visualization.coord.Orientation;
import org.apache.commons.math3.linear.ArrayRealVector;
import org.apache.commons.math3.linear.RealVector;

import java.util.HashMap;
import java.util.Map;

public class Car {
    private static Car instance;

    public static Car getInstance() {
        if(instance == null) {
            instance = new Car(0, 0);
        }
        return instance;
    }

    public static void setPosition(double x, double y) {
        getInstance().doSetPosition(x, y);
    }

    public static void setPosition(RealVector position) {
        getInstance().doSetPosition(position);
    }

    public static RealVector getPosition() {
        return getInstance().doGetPosition();
    }

    public static void setDegree(double degree) {
        getInstance().doSetDegree(degree);
    }

    public static double getDegree() {
        return getInstance().doGetDegree();
    }

    public static Sensor getSensor(Orientation orientation) {
        return getInstance().doGetSensor(orientation);
    }


    private RealVector position;
    private double degree;
    private Map<Orientation, Sensor> sensors;

    public Car(double x, double y) {
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

    protected void doInitSensorFrontLeft() {
        RealVector direction = new ArrayRealVector(2);
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