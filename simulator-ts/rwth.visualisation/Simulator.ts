import * as math from "../libs/math.js";
import {Car} from "./car/Car";
import {Orientation} from "./coord/Orientation";
import {Sinput} from "./Sinput"
import {Soutput} from "./Soutput"
import {Track} from "./track/Track";

class Simulator {

//private generator: MontiarcToJavaGenerator;

    // fps = 1/s -> fpsTime is 1/fps
    public fpsTime;
    private velocity;
    private time;
    private car: Car;
    private track: Track;

    public constructor() {

        // Initial velocity is 0 m/s, Initial time is 0 s
        this.velocity = math.unit('0 m/s'); // v
        this.time = math.unit('0 sec'); // t
        this.fpsTime = math.unit('1 sec');

        this.car = new Car(0,0); // TODO: initial position?
        this.track = new Track();
    }

    public getTime(){
        return this.time;
    }

    private getDistancesFromSensors(): number[]{
        
        return [
            /*flDistance*/
                this.car.getSensor(Orientation.FRONT_LEFT).getMinDistance(this.track.walls, this.car),
            /*frDistance*/
                this.car.getSensor(Orientation.FRONT_RIGHT).getMinDistance(this.track.walls, this.car),
            /*slfDistance*/
                this.car.getSensor(Orientation.FRONT_LEFT_SIDE).getMinDistance(this.track.walls, this.car),
            /*slbDistance*/
                this.car.getSensor(Orientation.BACK_LEFT_SIDE).getMinDistance(this.track.walls, this.car),
            /*srfDistance*/
                this.car.getSensor(Orientation.FRONT_RIGHT_SIDE).getMinDistance(this.track.walls, this.car),
            /*srbDistance*/
                this.car.getSensor(Orientation.BACK_RIGHT_SIDE).getMinDistance(this.track.walls, this.car)
            ];
    }

    private output: Soutput; //stores the output data(new positions, degree, velocity etc.)

    public getOutput(): Soutput {
        return this.output;
    }

    // private resolver: Resolver;

    //  static {
    //     Path rPath = null;
    //     URL srcLocation = Simulator.class.getProtectionDomain().getCodeSource().getLocation();
    //     try {
    //         rPath = Paths.get(srcLocation.toURI());
    //     } catch (URISyntaxException e) {
    //         Log.error("Could not initialize Trigger resolver at location " + srcLocation);
    //     }
    //     resolver = Resolver.get(rPath);
    // }

    // public constructor(Path baseDirectory, Path generationDirectory, Path compileDirectory, ExpandedComponentInstanceSymbol inst) {
    //     this();
    //      this.generator = new MontiarcToJavaGenerator(baseDirectory, generationDirectory, compileDirectory, inst);
    // }


    // update the new positions after accelerate with a and direction with steering s
    public update(input: Sinput){
        
        this.calculate(input);
        //this.transmit();
    }

    // Updates the time, velocity, degree of car and new positions x,y
    public calculate(input: Sinput) {
        
        // time = t+(1/20)s, for t=0s
        let time_local = math.add(this.time, this.fpsTime);
        this.time = time_local;

        // velocity = v+(input)acceleration*(1/20)s, for v=0 m/ss
        let velocity_local = math.add(this.velocity, math.multiply(input.acceleration, this.fpsTime));  // TODO input
        this.velocity = velocity_local;

        let degree: number;
        let nullVelocity = math.unit('0 m/s');
        

        // calculation of car rotation
        if(velocity_local.equals(nullVelocity)){
             degree = this.car.getDegree();
        }
        else{
            degree = this.car.getDegree() + input.steering; // adjust steeriing angle
        }

        let degree1 = math.unit(degree, 'deg');

        //Calculate positioin of the car

        // x=(input)x+v*t*cos((rad)degree) // degree * Math.PI / 180 - radian conversioin
        let x = math.add(input.x0, (this.velocity.times(this.fpsTime).times(Math.cos(degree * Math.PI / 180))));

        // y=(input)y+v*t*sin((rad)degree) //Amount<Length>
        let y = math.minus(input.y0, (this.velocity.times(this.fpsTime).times(Math.sin(degree * Math.PI / 180))));

        this.output = new Soutput(this.velocity, x, y, this.time, degree1, input.doorStatus,
                input.indicatorStatus, input.lightTimerStatus, input.triggerStatus);

        // System.out.println("Output: v: "+Math.round(100.0*v.doubleValue(METERS_PER_SECOND))/100.0
        //         +", x: "+Math.round(100.0*x.doubleValue(METER))/100.0
        //         +" ,y: "+Math.round(100.0*y.doubleValue(METER))/100.0
        //         +" ,t: "+Math.round(100.0*t.doubleValue(SECOND))/100.0
        //         +", degree: "+Math.round(100.0*degree)/100.0);
    }

    // send the updated position and the degree to the visualization as JSON package
    // private void transmit() {
    //     try {
    //         if(session.isPresent()) {
    //             JSONObject data = createJSON(output);
    //             String dataString = data.toString();
    //             session.get().getRemote().sendString(dataString);
    //         }
    //     } catch (IOException exception) {
    //         exception.printStackTrace();
    //     }
    // }

    // private JSONObject createJSON(SOutput output) {
    //     JSONObject result = new JSONObject();

    //     // Send the client "x=10" instead of "x=10 m"
    //     double xi = output.xi.doubleValue(METER);
    //     double yi = output.yi.doubleValue(METER);
    //     double deg = output.degree.doubleValue(DEGREE_ANGLE);

    //     result.put("x", xi);
    //     result.put("y", yi);
    //     result.put("angle", deg);

    //     result.put("doorStatus", output.doorStatus);
    //     result.put("indicatorStatus", output.indicatorStatus);
    //     result.put("lightTimerStatus", output.lightTimerStatus);
    //     result.put("triggerStatus", output.triggerStatus);

    //     return result;
    // }


    // private Map<String, PortSymbol> getPortSymbols(ComponentSymbol cmp){
    //     Map<String, PortSymbol> res = new HashMap<String, PortSymbol>();
    //     res.put("time", cmp.getIncomingPort("time").orElse(null));
    //     res.put("fl", cmp.getIncomingPort("fl").orElse(null));
    //     res.put("fr", cmp.getIncomingPort("fr").orElse(null));
    //     res.put("slf", cmp.getIncomingPort("slf").orElse(null));
    //     res.put("slb", cmp.getIncomingPort("slb").orElse(null));
    //     res.put("srf", cmp.getIncomingPort("srf").orElse(null));
    //     res.put("srb", cmp.getIncomingPort("srb").orElse(null));
    //     res.put("x_i", cmp.getIncomingPort("x").orElse(null));
    //     res.put("y_i", cmp.getIncomingPort("y").orElse(null));
    //     res.put("velocity", cmp.getIncomingPort("velocity").orElse(null));

    //     return res;
    // }

    // private Map<String, NamedStreamSymbol> getNamedStreamSymbols(double[] distances, Map<String, PortSymbol> portSymbols, double ti, double v, double xi, double yi){
    //     Map<String, NamedStreamSymbol> res = new HashMap<String, NamedStreamSymbol>();
    //     res.put("timeSymbol",
    //             portSymbols.get("time").addStream(0, true, Lists.newArrayList(ti)));
    //     res.put("flSymbol",
    //             portSymbols.get("fl").addStream(0, true, Lists.newArrayList(distances[0])));
    //     res.put("frSymbol",
    //             portSymbols.get("fr").addStream(0, true, Lists.newArrayList(distances[1])));
    //     res.put("slfSymbol",
    //             portSymbols.get("slf").addStream(0, true, Lists.newArrayList(distances[2])));
    //     res.put("slbSymbol",
    //             portSymbols.get("slb").addStream(0, true, Lists.newArrayList(distances[3])));
    //     res.put("srfSymbol",
    //             portSymbols.get("srf").addStream(0, true, Lists.newArrayList(distances[4])));
    //     res.put("srbSymbol",
    //             portSymbols.get("srb").addStream(0, true, Lists.newArrayList(distances[5])));
    //     res.put("velocitySymbol",
    //             portSymbols.get("velocity").addStream(0, true, Lists.newArrayList(v)));
    //     res.put("xSymbol",
    //             portSymbols.get("x_i").addStream(0, true, Lists.newArrayList(xi)));
    //     res.put("ySymbol",
    //             portSymbols.get("y_i").addStream(0, true, Lists.newArrayList(yi)));

    //     return res;
    // }

    // private Map<String, PortSymbol> removeStreamsFromPortSymbols(Map<String, PortSymbol> portSymbols,
    //                                                             Map<String, NamedStreamSymbol> namedStreamSymbols){
    //     portSymbols.get("time").removeStream(namedStreamSymbols.get("timeSymbol"));
    //     portSymbols.get("fl").removeStream(namedStreamSymbols.get("flSymbol"));
    //     portSymbols.get("fr").removeStream(namedStreamSymbols.get("frSymbol"));
    //     portSymbols.get("slf").removeStream(namedStreamSymbols.get("slfSymbol"));
    //     portSymbols.get("slb").removeStream(namedStreamSymbols.get("slbSymbol"));
    //     portSymbols.get("srf").removeStream(namedStreamSymbols.get("srfSymbol"));
    //     portSymbols.get("srb").removeStream(namedStreamSymbols.get("srbSymbol"));
    //     portSymbols.get("velocity").removeStream(namedStreamSymbols.get("velocitySymbol"));
    //     portSymbols.get("x_i").removeStream(namedStreamSymbols.get("xSymbol"));
    //     portSymbols.get("y_i").removeStream(namedStreamSymbols.get("ySymbol"));
    //     return portSymbols;
    // }


    //@OnWebSocketConnect
    public connected() {
        
        let simulator = new Simulator();

        // simulator.session = Optional.ofNullable(session);
        // String root = this.getClass().getResource("").
        //         getPath().replaceFirst("/", "").replace("/de", "");

        // Path basePath = Paths.get(root);
        // Path genPath = Paths.get(root,"gen");
        // Path compilePath = Paths.get(root,"gen");

        // ComponentSymbol cmp =
        //         resolver.getComponentSymbol("visualization.main.SDCS").orElse(null);
        // Map<String, PortSymbol> portSymbols = getPortSymbols(cmp); // initialize the PortSymbols

        let distances: number[] = this.getDistancesFromSensors();

        // Map<String, NamedStreamSymbol> nameStreamSymbols =
        //         getNamedStreamSymbols(distances, portSymbols, 0.0, 0.0, 0.0, 0.0);

        // ExpandedComponentInstanceSymbol inst =
        //         resolver.getExpandedComponentInstanceSymbol("visualization.main.sDCS").orElse(null);
        // BasicSimulator sim = new BasicSimulator(basePath, genPath, compilePath, inst);

        //Map<String, Object[]> outputs = new HashMap<>();

        // try {
        //     outputs = sim.execute();
        // } catch(Exception e) {
        //     e.printStackTrace();
        // }

        let input: Sinput = new Sinput(
                
                math.unit(0, 'm/s'), // a
                math.unit(0, 'deg'),  // s
                math.unit(0, 'meter'), // x
                math.unit(0, 'meter'), // y
                math.unit(0, 'sec'), // t
                false, // doorStatus
                false, //indicatorStatus
                false, //lightStatus
                false //triggerStatus
            );

        simulator.update(input);

        let output: Soutput = simulator.output; //SOutput will be filled with updated values

        // Give the updated t and v to the Generator/BasicSimulator and next loop
        while(true) {

            //portSymbols = removeStreamsFromPortSymbols(portSymbols, nameStreamSymbols);

            let v: number = output.velocity; // METERS_PER_SECOND
            let ti: number = output.ti; // SECOND
            let xi: number = output.xi; // METER
            let yi: number = output.yi; // METER
            let degree: number = output.degree; // DEGREE_ANGLE

            this.car.setPositionXY(xi,yi);
            this.car.setDegree(degree);

            // nameStreamSymbols = getNamedStreamSymbols(getDistancesFromSensors(), portSymbols, ti, v, xi, yi);

            // outputs = new HashMap<>();
            // try {
            //     outputs = sim.execute();
            // } catch(Exception e) {
            //     e.printStackTrace();
            // }

            // create input generated by controller
            // TODO: fill input with tha data from controller

            input = new Sinput(
                math.unit('0 m/s^2'), //acceleration
                math.unit('0 deg'), // steering, DEGREE_ANGLE
                output.xi,
                output.yi,
                output.ti,
                false, //doorStatus
                false, //indicatorStatus
                false, //lightStatus
                false  //triggerStatus
            );

            simulator.update(input);

            output = simulator.output; //SOutput will be filled with updated values

            // try {
            //     Thread.sleep(100);
            // } catch(InterruptedException e) {
            //     e.printStackTrace();
            // }
        }
    }

    // @OnWebSocketClose
    // public void closed(Session   session, int statusCode, String reason) {
    //     this.session = Optional.empty();
    // }

    // @OnWebSocketMessage
    // public void message(Session session, String message) throws IOException {
    // }

    // public void generate() {
    //     try {
    //         generator.generate();
    //     } catch (Exception e) {
    //         e.printStackTrace();
    //     }
    // }

    // public void getOutputs(Amount<Velocity> v, Amount<javax.measure.quantity.Duration> t) throws Exception {
    //     double velocity = v.doubleValue(METERS_PER_SECOND);
    //     double time = t.doubleValue(SECOND);

    //     Map<String, Object> input = new HashMap<>();
    //     input.put("velocity", velocity);
    //     input.put("time", time);

    //     Map<String, Object> output = generator.calculateOutput(input);

    //     Double acceleration = (Double) output.get("acceleration");
    //     Double steering = (Double) output.get("steering");
    //     System.out.println("a: "+acceleration+", s: "+steering);
    // }

    // public void getOutputs(Amount<Angle> angle, Amount<Length> x, Amount<Length> y,
    //                        Amount<Length> d1, Amount<Length> d2, Amount<Length> d3, Amount<Length> d4,
    //                        Amount<Length> d5, Amount<Length> d6, Amount<Length> d7, Amount<Length> d8)
    //         throws Exception {
    //     double angleDouble = angle.doubleValue(DEGREE_ANGLE);
    //     double xDouble = x.doubleValue(METER);
    //     double yDouble = y.doubleValue(METER);

    //     double d1Double = d1.doubleValue(METER);
    //     double d2Double = d2.doubleValue(METER);
    //     double d3Double = d3.doubleValue(METER);
    //     double d4Double = d4.doubleValue(METER);
    //     double d5Double = d5.doubleValue(METER);
    //     double d6Double = d6.doubleValue(METER);
    //     double d7Double = d7.doubleValue(METER);
    //     double d8Double = d8.doubleValue(METER);

    //     Map<String, Object> input = new HashMap<>();
    //     input.put("", angleDouble);
    //     input.put("", xDouble);
    //     input.put("", yDouble);
    //     input.put("", d1Double);
    //     input.put("", d2Double);
    //     input.put("", d3Double);
    //     input.put("", d4Double);
    //     input.put("", d5Double);
    //     input.put("", d6Double);
    //     input.put("", d7Double);
    //     input.put("", d8Double);

    //     Map<String, Object> output = generator.calculateOutput(input);
    //     Double acceleration = (Double) output.get("acceleration");
    //     Double steering = (Double) output.get("steering");

    //     System.out.println("a: "+acceleration+", s: "+steering);
    // }
}
