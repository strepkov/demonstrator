import * as math from "./math/math.js";
import {Car} from "./car/Car";
import {Orientation} from "./coord/Orientation";
import {Sinput} from "./Sinput"
import {Soutput} from "./Soutput"
import {Track} from "./track/Track";
import {ControllerMock} from "./ControllerMock";

export {Simulator}

class Simulator {


    // fps = 1/s -> fpsTime is 1/fps
    public fpsTime;
    private velocity;
    private time;
    private car: Car;
    private track: Track;
    public output: Soutput; //stores the output data(new positions, degree, velocity etc.)
    private input: Sinput;

    //private listeners: Array<Function>;

    public constructor() {

        // Initial velocity is 0 m/s, Initial time is 0 s
        this.velocity = math.unit('0 m/s'); // v - m/s
        this.time = math.unit('0 sec'); // t
        this.fpsTime = math.unit('0.5 sec');
        
        this.car = new Car(0,0);
        this.track = new Track();

        this.output = new Soutput(
            math.unit('0 m/s'),
            math.unit('0 m'),
            math.unit('0 m'),
            math.unit('0 s'),
            math.unit('0 deg'),
            false,
            false,
            false,
            false);

        this.input = new Sinput(
            math.unit('0 m/s^2'), // acceleration
            math.unit('0 deg'),  // steering
            math.unit('0 m'), // x
            math.unit('0 m'), // y
            math.unit('0 s'), // time
            false, // doorStatus
            false, //indicatorStatus
            false, //lightStatus
            false //triggerStatus
        );

        this.calculate();
    }

    // public addSimListener(simListener: Function) {
    //     this.listeners.push(simListener);
    // }

    // private onSimFrameFinished() {
    //     this.listeners.forEach(sl => {
    //         sl.apply(this, [this.car, this.track]);
    //     });
    // }

    // Updates the time, velocity, degree of car and new positions x,y
    public calculate() {
        
        // time = t+(1/20)s, for t=0s
        this.time = math.add(this.time, this.fpsTime);
        
        // velocity = v+(input)acceleration*(1/20)s, for v=0 m/ss
        if ( math.add(this.velocity, math.multiply(this.input.acceleration, this.fpsTime)) < math.unit('60 km/h')){ 
            
            this.velocity = math.add(this.velocity, math.multiply(this.input.acceleration, this.fpsTime));
        }
        
        // calculation of car rotation
        let degree;

        if(this.velocity.equals(math.unit('0 m/s'))){

             degree = this.car.getDegree();
        }
        else{

            degree = math.add(this.car.getDegree(), this.input.steering); // adjust steeriing angle
        }

        //Calculate positioin of the car
        // x=(input)x+v*t*cos((rad)degree) // degree * Math.PI / 180 - radian conversioin
        let x = math.add(this.input.x0, math.multiply(this.velocity, math.multiply(this.fpsTime, math.cos(degree))));
        // y=(input)y+v*t*sin((rad)degree)
        let y = math.subtract(this.input.y0, math.multiply(this.velocity, math.multiply(this.fpsTime, math.sin(degree))));

        this.output.velocity = this.velocity;
        this.output.xi = x;
        this.output.yi = y;
        this.output.ti = this.time;
        this.output.degree = degree,
        this.output.doorStatus = this.input.doorStatus;
        this.output.indicatorStatus = this.input.indicatorStatus;
        this.output.lightTimerStatus = this.input.lightTimerStatus;
        //this.output.triggerStatus = this.input.triggerStatus;
    }

    // send current output struct to the controller
    public getDistances(){

        let distances: number[] = this.car.getDistancesFromSensors(this.track);
        return distances;
    }

    // send the updated position and the degree to the visualization
    public run(status, steering, acceleration) {

        // Give the updated t and v to the Generator/BasicSimulator and next loop

        this.output.triggerStatus = status;
        //this.output.triggerStatus = ControllerMock.gameOverTrigger(this.output.xi.value, this.output.yi.value,this.time);
        this.car.setPosition([this.output.xi.value, this.output.yi.value]);
        this.car.setDegree(this.output.degree);
        //let distances1: number[] = this.car.getDistancesFromSensors(this.track);
        //let steering_controller1 = ControllerMock.steering(distances1); // steering angle
        //let acceleration_controller1 = ControllerMock.acceleration(this.time); // constant velocity
        
        this.input.acceleration = math.unit(acceleration,"m/s^2"); //acceleration
        this.input.steering = math.unit(steering,'deg'); // steering, DEGREE_ANGLE
        this.input.x0 = this.output.xi;
        this.input.y0 = this.output.yi;
        this.input.t0 = this.output.ti;
        this.input.doorStatus = false; //doorStatus
        this.input.indicatorStatus = false; //indicatorStatus
        this.input.lightTimerStatus = false; //lightStatus
        this.calculate();
        // this.onSimFrameFinished();

        return this.output;
    }
}
