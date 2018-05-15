# Tutorial(draft)

##### 1. Accelerate to a given speed and brake.
Implement the model that continuously accelerates to 50 km/h and then brakes until the car stops.
    
##### Basic explonation:
The car has 8 sensors to measure distances to obstacles. They are located respectively: 

![alt text](../tutorialText/car_with_sensors.jpg)

To solve this task it's needed to use only acceleration of the car. Changing the acceleration you may control the behavior ot the car. To be able to reach 50 km/h speed, you have to accelerate the car continuously until it reaches the desired speed. Let's start with the mainController which defines the interface to the simulator:

```sh
package controller; // The name of the folder where all .emam files are located.

import VelocityController; // here has being imported the actual controller
import StopSimulationController;

component MainController{
    ports // There are listed the incoming ports, where data is transferred from the sensors.
        in Q(0m:200m) fl,                   //front left
        in Q(0m:200m) fr,                   //front right
        in Q(0m:200m) slf,                  //side left front
        in Q(0m:200m) slb,                  //side left back
        in Q(0m:200m) srf,                  //side right front
        in Q(0m:200m) srb,                  //side right back
        in Q(0m:200m) bl,                   //back left
        in Q(0m:200m) br,                   //back right

        in Q(0s:oos) time,                  //simulation time
        in Q(0km/h:250km/h) velocity,       //car's velocity

        in Q(-200m:200m) x,                 //car's position X
        in Q(-200m:200m) y,                 //car's position Y

        out Q(-2m/s^2:2m/s^2) acceleration, //car's acceleration 
        out Q(-180°:180°) steering,         //car's steering
        out B status;                       //whether the simulation is still running

    // When we have finished with the interface's description, we have to instantiate the actual controller
    // and connect it to the interface.

    instance VelocityController velocityController;

    connect velocity->velocityController.velocity;
    connect velocityController.acceleration->acceleration;

    //Here we have connected the incoming port - velocity(mainController) to our instantiated controller and its corresponding 
    //incoming port velocity. Then we connect outgoing port of velocityController.acceleration to the outgoing
    //port of our MainController.

    //Lastly we are going to instantiate the controller which will stop the execution when the conditions will be reached.
    //For this controller we will need incoming ports: velocity and time and outgoing: status. Connect them correspondingly.

    instance StopSimulationController stopSimulationController;

    connect velocity->stopSimulationController.velocity;
    connect time->stopSimulationController.time;
    connect stopSimulationController.status->status;
}
```
Now is time to write the an actual controller to solve the given task. We have to start again from defining the package
and component name :

```sh
package simulator;

component VelocityController {
	port                                    //Add incoming and outgoing ports
		in Q(0km/h : 250km/h) velocity,     //For out task we need only the velocity and acceleration
		out Q(-2m/s^2:2m/s^2) acceleration; //We are going to control velocity just changing the acceleration

	implementation Math{                    //Inside Math tag is written the logic of the controller

    	if (velocity > 50 km/h)             //If a velocity gets more than 50 km/h then start to brake
    	    acceleration = -1m/s^2;         //until then accelerate with 1m/s^2.
    	else
    	    acceleration = 1m/s^2;
        end
	}
}
```

Finally we have to define the conditions to stop the simulation process. To be able to do it, we are gonna use the velocity and the simulation time. Our stop conditions will be the reaching 0 km/h velocity and the simulation time has to more than, let's say, 2 seconds. Because if we have only 0 km/h velocity condition then at the very beginning when the car has not even started to move, the simulation had been finished.  

```sh
package simulator;

component StopSimulationController {
    port
        in Q(0km/h:250km/h) velocity,
        in Q(0s:oos) time,
        out B status;

    implementation Math{

        B timeCondition = time > 2s;
        B velocityCondition = velocity <= 0 km/h;

        if (timeCondition && velocityCondition)     // if we satisfy both these conditions then set status to true
            status = true;                          // and finish the simulation.
        end
    }
}
```

Eventually we should send these files to the server to process it and then execute in the simulator.

For better understanding the syntax of the EmbeddedMontiArc and get some ideas how to define modules of a controller it's a good idea to read the documentation here (https://github.com/EmbeddedMontiArc/Documentation#embeddedmontiarc-yannick).