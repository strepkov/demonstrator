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
        this.sensors = new Map<>();

        this.doInitSensorFrontLeft();
        this.doInitSensorFrontRight();
        this.doInitSensorFrontLeftSide();
        this.doInitSensorFrontRightSide();
        this.doInitSensorBackLeft();
        this.doInitSensorBackRight();
        this.doInitSensorBackLeftSide();
        this.doInitSensorBackRightSide();
        this.doInitPosition(x, y);
    }
    
    // TODO overloading
    public setPosition(position: {x: number, y: number});
    public setPosition(position: number[]);
    public getPosition(x : any): number[];
    public setPosition(x: any){
    
    {
        this.getInstance().doSetPosition(x, y);
    }

     {
        this.getInstance().doSetPosition(position);
    }

     {
        return this.getInstance().doGetPosition();
    }

    }


    public setDegree(degree: number) {
        this.getInstance().doSetDegree(degree);
    }

    public getDegree(): number {
        return this.getInstance().doGetDegree();
    }



    public getSensor(orientation: Orientation): Sensor {
        return this.getInstance().doGetSensor(orientation);
    }


    // Overloading
    protected doSetPosition(x: number, y: number) {
        this.position[0] = x;
        this.position[1] = y;
    }
    //
    protected doSetPosition(position: number[]) {
        this.position = position;
    }

    protected doGetPosition(): number[] {
        return this.position;
    }

    protected doSetDegree(degree: number) {
        this.degree = degree;
    }

    protected doGetDegree(): number {
        return this.degree;
    }

    protected doGetSensor(orientation: Orientation): Sensor {
        return this.sensors.get(orientation);
    }

    protected doInitSensorFrontLeft() {

        let direction: number[] = [1,0];
        let offset: number[] = [4.15, 1.85];

        // TODO
        this.sensors.put(Orientation.FRONT_LEFT, new Sensor(offset, direction));
    }

    protected doInitSensorFrontLeftSide() {

        let direction: number[] = [0,1];
        let offset: number[] = [4.15, 1.85];
        // TODO
        this.sensors.put(Orientation.FRONT_LEFT_SIDE, new Sensor(offset, direction));
    }

    protected doInitSensorFrontRight() {

       let direction: number[] = [1,0];
        let offset: number[] = [4.15, -1.85];

        this.sensors.put(Orientation.FRONT_RIGHT, new Sensor(offset, direction));
    }

    protected doInitSensorFrontRightSide() {
        let direction: number[] = [0,-1];
        let offset: number[] = [4.15, -1.85];

        this.sensors.put(Orientation.FRONT_RIGHT_SIDE, new Sensor(offset, direction));
    }

    protected doInitSensorBackLeft() {
        let direction: number[] = [-1,0];
        let offset: number[] = [-4.15, 1.85];

        this.sensors.put(Orientation.BACK_LEFT, new Sensor(offset, direction));
    }

    protected doInitSensorBackLeftSide() {
        let direction: number[] = [0,1];
        let offset: number[] = [-4.15, 1.85];

        this.sensors.put(Orientation.BACK_LEFT_SIDE, new Sensor(offset, direction));
    }

    protected doInitSensorBackRight() {
        let direction: number[] = [-1,0];
        let offset: number[] = [-4.15, -1.85];

        this.sensors.put(Orientation.BACK_RIGHT, new Sensor(offset, direction));
    }

    protected doInitSensorBackRightSide() {
        let direction: number[] = [0,-1];
        let offset: number[] = [-4.15, -1.85];

        this.sensors.put(Orientation.BACK_RIGHT_SIDE, new Sensor(offset, direction));
    }

    protected doInitPosition(x: number, y: number) {

        this.position = [x,y];
    }
}