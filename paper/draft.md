# Teaching playground for MontiArc language.

## Abstract
Self-driving vehicles are a very important part of our future. To inspire students to be involved in the future technology we invented a web-playground which allows creating controllers for a simulator and almost instantly see the result in 3D. We believe that visualization will motivate students and make the studying process more attractive due to the gaming form. Besides that, they are going to study how to work with C&C model language - MontiArc, to achieve the best results in short terms.

## Running example
We are going to show two examples of tutorials in which a controller, for given tasks, will be created. 
The first task is to carry out parallel parking between two cars. There is an interface for the simulator which is given. It has 8 sensors to measure distances to objects, velocity,  steering angle, acceleration, a position of the car and execution time. Now we have to invent other modules and connect it in the way to solve our task. In this particular example, we use three components which are responsible for different actions during the parking process. 
1. A module which controls the velocity of the car depends on the current action(e.g. parking, searching a parking place).
2. A module which looking for a gap between cars for the parking.
3. A module which controls a steering angle of the car during the parking process.

<img src="img/controller03.svg" alt="drawing" width="1000px" height="500px"/>

The velocity controller has three states. The first one is activated when the car is looking for a place for parking. The second one, when the car is moving back during a parking process. And the third one, when it is moving forward to get closer to the front car.
The controller, which is looking for a parking place, uses side sensors to find the gap between cars and the point where to stop and to begin the parking process.
The idea of the parking controller is that the car is going back until it reached a certain point, changing an angle of the car. The back and side sensors are involved in this process. Then the car stops when the critical distance is reached and get closer to the front car. All these steps are nicely illustrated in tutorials and solutions.
After creating all these components, the controller compiles the model on a server and the simulator shows a nice 3D visualization of the parking process.
The second task is to run between cones to pass maneuverability test. To solve the task, we can use just two modules:
1. A Module which controls the speed of the car.
2. A Module which controls the steering angle of the car.

<img src="img/controller04.svg" alt="drawing" width="600px" height="500px"/>

The velocity module controls a speed of the car don't allow to drive too fast to be able to react on the cones. And the steering module reacts on cones by changing the directions of driving.
We are using the side left forward and side right forward sensors to measure distances to cones. When these sensors have passed a cone, we assume that it is time to start the car rotation in opposite direction. Pretty simple!
To prepare a simulator environment for a tutorial, a configuration file is used.  The configuration defines the initial position of the car, objects on the track and their positions.
To check the possible solution, which has been implemented by a student, a comparison of the trajectories is involved. Each tutorial has a bunch of files, which includes: description of a tutorial, solution description, already implemented controller, environment configuration file and sample trajectory for the tutorial.

## Architecture
To create the playground, the seven most important components are linked: 
1. IDE for MontiArc language, it helps to write components easier, reveals the errors and shows incoming and outgoing ports of the components.
2. Web-server, it receives the requests for compiling the MontiArc models and sends back a finished controller,  packs and extracts models, controls the compilation process, providing an error handling for users.
3. EMAM2WASM generator, it gets the model from the web-server and compiles it, generating the web-assembly file, which is a "brain" of the simulator.
4. A testing toolchain, which provides stream testing for incoming models. The toolchain is consist of EMAM2CPP generator, which generates tests, then the tests are compiled and executed. The output from the stream testing phase could be used to be shown to a user or be the condition for generating the .wasm file.
5. SVG generator, it generates a picture of the components and connections for better readability. Users can easier find errors using the schema of components.
6. A simulator, it receives a compiled model from the server and instantiates it directly in the browser. Then the controller is used to process data from sensors, which located on the car.
7. A Trajectory builder and comparator. It builds in real time a trajectory of the car movements and does a comparison between a sample trajectory and generated one. The comparator allows having some deviation from the sample trajectory.

![alt text](img/architecture.png)

## How to use it and how it is work
Students are going to use the web-playground to understand how to work with C&C models languages like MontiArc. The main idea of the playground to increase interest in the learning process using a gaming form of the tutorials. There are several simple steps in the learning process: 
1. The first tutorial is a task which already has a solution but the idea behind that to show the main constructions and principles of the language and the playground.
2. Next tutorials have tasks with increasing complexity and every time there is some hint, which motivates students to use particular constructions.
3. The visualization of the process gives the feeling of the language and understanding of the binding between writing the code and real actions which were caused by the written code.
4. The process of writing tests shows the benefits of test-driven development and understanding the importance of independent testing of the components.

The process of using the web-playground is very simple. Students don't have to install any applications on the computer and it is possible to use it from any platform, whether it is Mac, Windows or Linux. Only one important condition has to be satisfied - to have a "fresh" version of a browser. IDE, tutorial, visualization are located in one window and has a very intuitive interface.
A standard sequence of steps is the following:
1. Open the web-playground in a browser.
2. Read a tutorial
3. Write code with tests
4. Send a model controller to the server, to execute tests and compile the controller.
5. When the simulator displays the ready state, it means that you may run a visualization execution. If the solution contains errors, a student receives an error message with description.
6. It's possible to restart the simulation process, add some noise to the sensors to emulate more natural measurements, or specify the period of the simulation process. 
7. After the execution, the current trajectory is compared with the sample solution and the student is notified whether he passed the test or not.

![alt text](img/screen-simulator.png)
![alt text](img/screen-task.png)