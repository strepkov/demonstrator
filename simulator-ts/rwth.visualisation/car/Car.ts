import {Orientation} from "../coord/Orientation";
import {Sensor} from "./Sensor";
import {Track} from "../track/Track";

export {Car}

class Car {

    private position: number[];
    private degree: number;
    private sensors: Map<Orientation, Sensor>; // Position of the sensor

    public constructor(x: number, y:number) {
        
        this.sensors = new Map<Orientation, Sensor>();

        this.doInitSensorFrontLeft();
        this.doInitSensorFrontRight();
        this.doInitSensorFrontLeftSide();
        this.doInitSensorFrontRightSide();
        this.doInitSensorBackLeft();
        this.doInitSensorBackRight();
        this.doInitSensorBackLeftSide();
        this.doInitSensorBackRightSide();
        this.position = [x,y];
        this.degree = 0;
    }

    public setPosition(position: number[]){

        this.position = position;
    }

    public getPosition(): number[] {

        return this.position;
    }

    public setDegree(degree: number) {
        
        this.degree = degree;
    }

    public getDegree(): number {
        
        return this.degree;;
    }

    public getSensor(orientation: Orientation): Sensor {
        
        return this.sensors.get(orientation);
    }

    private doInitSensorFrontLeft() {

        let direction: number[] = [1,0];
        let offset: number[] = [4.15, 1.85];

        this.sensors.set(Orientation.FRONT_LEFT, new Sensor(offset, direction));
    }

    private doInitSensorFrontLeftSide() {

        let direction: number[] = [0,1];
        let offset: number[] = [4.15, 1.85];

        this.sensors.set(Orientation.FRONT_LEFT_SIDE, new Sensor(offset, direction));
    }

    private doInitSensorFrontRight() {

        let direction: number[] = [1,0];
        let offset: number[] = [4.15, -1.85];

        this.sensors.set(Orientation.FRONT_RIGHT, new Sensor(offset, direction));
    }

    private doInitSensorFrontRightSide() {
        let direction: number[] = [0,-1];
        let offset: number[] = [4.15, -1.85];

        this.sensors.set(Orientation.FRONT_RIGHT_SIDE, new Sensor(offset, direction));
    }

    private doInitSensorBackLeft() {
        let direction: number[] = [-1,0];
        let offset: number[] = [-4.15, 1.85];

        this.sensors.set(Orientation.BACK_LEFT, new Sensor(offset, direction));
    }

    private doInitSensorBackLeftSide() {
        let direction: number[] = [0,1];
        let offset: number[] = [-4.15, 1.85];

        this.sensors.set(Orientation.BACK_LEFT_SIDE, new Sensor(offset, direction));
    }

    private doInitSensorBackRight() {
        let direction: number[] = [-1,0];
        let offset: number[] = [-4.15, -1.85];

        this.sensors.set(Orientation.BACK_RIGHT, new Sensor(offset, direction));
    }

    private doInitSensorBackRightSide() {
        let direction: number[] = [0,-1];
        let offset: number[] = [-4.15, -1.85];

        this.sensors.set(Orientation.BACK_RIGHT_SIDE, new Sensor(offset, direction));
    }

    public getDistancesFromSensors(track : Track): number[]{
        
        return [
            /*flDistance*/
                this.getSensor(Orientation.FRONT_LEFT).getMinDistance(track.walls, this),
            /*frDistance*/
                this.getSensor(Orientation.FRONT_RIGHT).getMinDistance(track.walls, this),
            /*slfDistance*/
                this.getSensor(Orientation.FRONT_LEFT_SIDE).getMinDistance(track.walls, this),
            /*slbDistance*/
                this.getSensor(Orientation.BACK_LEFT_SIDE).getMinDistance(track.walls, this),
            /*srfDistance*/
                this.getSensor(Orientation.FRONT_RIGHT_SIDE).getMinDistance(track.walls, this),
            /*srbDistance*/
                this.getSensor(Orientation.BACK_RIGHT_SIDE).getMinDistance(track.walls, this)
            ];
    }
}