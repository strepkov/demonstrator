# Solution(01)

## Accelerate the given time and brake.

To solve that tutorial you have to use the MainController like you did in the tutorial00. The only difference here that we should pass simulation time instead of velocity of the car.

```sh
package controller;

import VelocityController;

component MainController{
    ports                                   
        in Q(0m:200m) fl,                   //front left sensor with range from 0 meters to 200 meters
        in Q(0m:200m) fr,                   //front right sensor
        in Q(0m:200m) slf,                  //side left front sensor
        in Q(0m:200m) slb,                  //side left back sensor
        in Q(0m:200m) srf,                  //side right front sensor
        in Q(0m:200m) srb,                  //side right back sensor
        in Q(0m:200m) bl,                   //back left sensor
        in Q(0m:200m) br,                   //back right sensor

        in Q(0s:oos) time,                  //simulation time from 0s to infinity
        in Q(0m/s:25m/s) velocity,          //car velocity

        in Q(-200m:200m) x,                 //car position X
        in Q(-200m:200m) y,                 //car position Y

        out Q(-2m/s^2:2m/s^2) acceleration, //car acceleration 
        out Q(-180°:180°) steering,         //car steering
        out B status;                       //whether the simulation is still running

    instance VelocityController velocityController;

    connect time->velocityController.time;
    connect velocityController.acceleration->acceleration;
    connect velocityController.status->status;
}
```
We import the VelocityController, instantiate it and then connect to the MainController.
Now we have to write the VelocityController. It has to have only one incoming port and two outgoing ones.

```sh
package controller;

component VelocityController {
	port
		in Q(0s:oos) time,
		out Q(-2m/s^2:2m/s^2) acceleration,
		out B status;

	implementation Math{
		
		if (time <= 10 s)
    	    acceleration = 1 m/s^2;
    	else
    		status = 1;             // Should be TRUE
        end
	}
}
```

The logic inside the controller means that until the car reach 10s execution time, it has to accelerate 1 m/s^2. After that the component should set status to TRUE, which means stop the simulation.