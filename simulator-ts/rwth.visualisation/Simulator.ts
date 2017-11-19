package de;

import com.google.common.collect.Lists;
import de.ma2cfg.simulator.BasicSimulator;
import de.monticore.lang.montiarc.montiarc._symboltable.ComponentSymbol;
import de.monticore.lang.montiarc.montiarc._symboltable.ExpandedComponentInstanceSymbol;
import de.monticore.lang.montiarc.montiarc._symboltable.PortSymbol;
import de.monticore.lang.montiarc.stream._symboltable.NamedStreamSymbol;
import de.rwth.simulink2montiarc.montiarcadapter.Resolver;
import de.rwth.visualization.car.Car;
import de.rwth.visualization.coord.Orientation;
import de.se_rwth.commons.logging.Log;
import org.eclipse.jetty.websocket.api.Session;
import org.eclipse.jetty.websocket.api.annotations.OnWebSocketClose;
import org.eclipse.jetty.websocket.api.annotations.OnWebSocketConnect;
import org.eclipse.jetty.websocket.api.annotations.OnWebSocketMessage;
import org.eclipse.jetty.websocket.api.annotations.WebSocket;
import org.jscience.physics.amount.Amount;
import org.json.JSONObject;

import javax.measure.quantity.*;
import java.io.IOException;
import java.net.URISyntaxException;
import java.net.URL;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import static javax.measure.unit.NonSI.DEGREE_ANGLE;
import static javax.measure.unit.SI.*;

//@WebSocket
class Simulator {

    private MontiarcToJavaGenerator generator;
    // protected Optional<Session> session;// for WebSockets

    // fps = 1/s -> fpsTime is 1/fps
    public final Amount<javax.measure.quantity.Duration> fpsTime = Amount.valueOf(1.0, SECOND);

    // private SOutput output; //stores the output data(new positions, degree, velocity etc.)

    public SOutput getOutput() {
        return output;
    }

    //TODO find methods with similar type
    private Amount<Velocity> v;
    private Amount<javax.measure.quantity.Duration> t;

    public constructor() {
        // Initial velocity is 0 m/s, Initial time is 0 s
        v = Amount.valueOf(0, METERS_PER_SECOND);
        t = Amount.valueOf(0, SECOND);
    }

    private resolver: Resolver;

     static {
        Path rPath = null;
        URL srcLocation = Simulator.class.getProtectionDomain().getCodeSource().getLocation();
        try {
            rPath = Paths.get(srcLocation.toURI());
        } catch (URISyntaxException e) {
            Log.error("Could not initialize Trigger resolver at location " + srcLocation);
        }
        resolver = Resolver.get(rPath);
    }

    public constructor(Path baseDirectory, Path generationDirectory, Path compileDirectory, ExpandedComponentInstanceSymbol inst) {
        this();
         this.generator = new MontiarcToJavaGenerator(baseDirectory, generationDirectory, compileDirectory, inst);
    }


    // update the new positions after accelerate with a and direction with steering s
    public void update(SInput input){
        calculate(input);
        transmit();
    }

    // Updates the time, velocity, degree of car and new positions x,y
    public void calculate(SInput input) {
        // time = t+(1/20)s, for t=0s
        Amount<Duration> time = t.plus(fpsTime);
        t = time;

        // velocity = v+(input)acceleration*(1/20)s, for v=0 m/ss
        Amount<Velocity> velocity = v.plus(input.acceleration.times(fpsTime));
        v = velocity;

        double degree;
        Amount<Velocity> nullVelocity = Amount.valueOf(0,METERS_PER_SECOND);
        if(velocity.equals(nullVelocity)){
             degree = Car.getDegree();
        }
        else{
            degree = Car.getDegree() +
                    (input.steering.doubleValue(DEGREE_ANGLE));
        }
        Amount<Angle> degree1 = Amount.valueOf(degree, DEGREE_ANGLE);

         // x=(input)x+v*t*cos((rad)degree)
        Amount<Length> x = input.x0.plus(v.times(fpsTime).times(Math.cos(Math.toRadians(degree))));
        // y=(input)y+v*t*sin((rad)degree)
        Amount<Length> y = input.y0.minus(v.times(fpsTime).times(Math.sin(Math.toRadians(degree))));

        output = new SOutput(v, x, y, t, degree1, input.doorStatus,
                input.indicatorStatus, input.lightTimerStatus, input.triggerStatus);
        System.out.println("Output: v: "+Math.round(100.0*v.doubleValue(METERS_PER_SECOND))/100.0
                +", x: "+Math.round(100.0*x.doubleValue(METER))/100.0
                +" ,y: "+Math.round(100.0*y.doubleValue(METER))/100.0
                +" ,t: "+Math.round(100.0*t.doubleValue(SECOND))/100.0
                +", degree: "+Math.round(100.0*degree)/100.0);
    }

    // send the updated position and the degree to the visualization as JSON package
    private void transmit() {
        try {
            if(session.isPresent()) {
                JSONObject data = createJSON(output);
                String dataString = data.toString();
                session.get().getRemote().sendString(dataString);
            }
        } catch (IOException exception) {
            exception.printStackTrace();
        }
    }

    private JSONObject createJSON(SOutput output) {
        JSONObject result = new JSONObject();

        // Send the client "x=10" instead of "x=10 m"
        double xi = output.xi.doubleValue(METER);
        double yi = output.yi.doubleValue(METER);
        double deg = output.degree.doubleValue(DEGREE_ANGLE);

        result.put("x", xi);
        result.put("y", yi);
        result.put("angle", deg);

        result.put("doorStatus", output.doorStatus);
        result.put("indicatorStatus", output.indicatorStatus);
        result.put("lightTimerStatus", output.lightTimerStatus);
        result.put("triggerStatus", output.triggerStatus);

        return result;
    }


    //TODO: In advanced a car instance has to be created
    private getDistancesFromSensors(): number[]{
        
        let result : number[] = [
         /*flDistance*/
                Car.getSensor(Orientation.FRONT_LEFT).getMinDistance();
        /*frDistance*/ res[1] =
                Car.getSensor(Orientation.FRONT_RIGHT).getMinDistance();
        /*slfDistance*/ res[2] =
                Car.getSensor(Orientation.FRONT_LEFT_SIDE).getMinDistance();
        /*slbDistance*/ res[3] =
                Car.getSensor(Orientation.BACK_LEFT_SIDE).getMinDistance();
        /*srfDistance*/ res[4] =
                Car.getSensor(Orientation.FRONT_RIGHT_SIDE).getMinDistance();
        /*srbDistance*/ res[5] =
                Car.getSensor(Orientation.BACK_RIGHT_SIDE).getMinDistance();

        return res;
    }

    private Map<String, PortSymbol> getPortSymbols(ComponentSymbol cmp){
        Map<String, PortSymbol> res = new HashMap<String, PortSymbol>();
        res.put("time", cmp.getIncomingPort("time").orElse(null));
        res.put("fl", cmp.getIncomingPort("fl").orElse(null));
        res.put("fr", cmp.getIncomingPort("fr").orElse(null));
        res.put("slf", cmp.getIncomingPort("slf").orElse(null));
        res.put("slb", cmp.getIncomingPort("slb").orElse(null));
        res.put("srf", cmp.getIncomingPort("srf").orElse(null));
        res.put("srb", cmp.getIncomingPort("srb").orElse(null));
        res.put("x_i", cmp.getIncomingPort("x").orElse(null));
        res.put("y_i", cmp.getIncomingPort("y").orElse(null));
        res.put("velocity", cmp.getIncomingPort("velocity").orElse(null));

        return res;
    }

    public Amount<javax.measure.quantity.Duration> getTime(){
        return t;
    }

    private Map<String, NamedStreamSymbol> getNamedStreamSymbols(double[] distances, Map<String, PortSymbol> portSymbols, double ti, double v, double xi, double yi){
        Map<String, NamedStreamSymbol> res = new HashMap<String, NamedStreamSymbol>();
        res.put("timeSymbol",
                portSymbols.get("time").addStream(0, true, Lists.newArrayList(ti)));
        res.put("flSymbol",
                portSymbols.get("fl").addStream(0, true, Lists.newArrayList(distances[0])));
        res.put("frSymbol",
                portSymbols.get("fr").addStream(0, true, Lists.newArrayList(distances[1])));
        res.put("slfSymbol",
                portSymbols.get("slf").addStream(0, true, Lists.newArrayList(distances[2])));
        res.put("slbSymbol",
                portSymbols.get("slb").addStream(0, true, Lists.newArrayList(distances[3])));
        res.put("srfSymbol",
                portSymbols.get("srf").addStream(0, true, Lists.newArrayList(distances[4])));
        res.put("srbSymbol",
                portSymbols.get("srb").addStream(0, true, Lists.newArrayList(distances[5])));
        res.put("velocitySymbol",
                portSymbols.get("velocity").addStream(0, true, Lists.newArrayList(v)));
        res.put("xSymbol",
                portSymbols.get("x_i").addStream(0, true, Lists.newArrayList(xi)));
        res.put("ySymbol",
                portSymbols.get("y_i").addStream(0, true, Lists.newArrayList(yi)));

        return res;
    }

    private Map<String, PortSymbol> removeStreamsFromPortSymbols(Map<String, PortSymbol> portSymbols,
                                                                Map<String, NamedStreamSymbol> namedStreamSymbols){
        portSymbols.get("time").removeStream(namedStreamSymbols.get("timeSymbol"));
        portSymbols.get("fl").removeStream(namedStreamSymbols.get("flSymbol"));
        portSymbols.get("fr").removeStream(namedStreamSymbols.get("frSymbol"));
        portSymbols.get("slf").removeStream(namedStreamSymbols.get("slfSymbol"));
        portSymbols.get("slb").removeStream(namedStreamSymbols.get("slbSymbol"));
        portSymbols.get("srf").removeStream(namedStreamSymbols.get("srfSymbol"));
        portSymbols.get("srb").removeStream(namedStreamSymbols.get("srbSymbol"));
        portSymbols.get("velocity").removeStream(namedStreamSymbols.get("velocitySymbol"));
        portSymbols.get("x_i").removeStream(namedStreamSymbols.get("xSymbol"));
        portSymbols.get("y_i").removeStream(namedStreamSymbols.get("ySymbol"));
        return portSymbols;
    }


    @OnWebSocketConnect
    public void connected(Session session) {
        Simulator simulator = new Simulator();
        simulator.session = Optional.ofNullable(session);
        String root = this.getClass().getResource("").
                getPath().replaceFirst("/", "").replace("/de", "");

        Path basePath = Paths.get(root);
        Path genPath = Paths.get(root,"gen");
        Path compilePath = Paths.get(root,"gen");

        ComponentSymbol cmp =
                resolver.getComponentSymbol("visualization.main.SDCS").orElse(null);
        Map<String, PortSymbol> portSymbols = getPortSymbols(cmp); // initialize the PortSymbols

        double[] distances = getDistancesFromSensors();
        Map<String, NamedStreamSymbol> nameStreamSymbols =
                getNamedStreamSymbols(distances, portSymbols, 0.0, 0.0, 0.0, 0.0);

        ExpandedComponentInstanceSymbol inst =
                resolver.getExpandedComponentInstanceSymbol("visualization.main.sDCS").orElse(null);
        BasicSimulator sim = new BasicSimulator(basePath, genPath, compilePath, inst);

        Map<String, Object[]> outputs = new HashMap<>();

        try {
            outputs = sim.execute();
        } catch(Exception e) {
            e.printStackTrace();
        }

        SInput input = new SInput(Amount.valueOf(0.0, METERS_PER_SQUARE_SECOND), // a
                Amount.valueOf(0.0, DEGREE_ANGLE),  // s
                Amount.valueOf(0.0, METER), // x
                Amount.valueOf(0.0, METER), // y
                Amount.valueOf(0.0, SECOND), // t
                (Boolean)outputs.get("doorStatus")[0],
                (Boolean)outputs.get("indicatorStatus")[0],
                (Boolean)outputs.get("lightStatus")[0],
                (Boolean)outputs.get("triggerStatus")[0]);
        simulator.update(input);
        SOutput output = simulator.output; //SOutput will be filled with updated values

        // Give the updated t and v to the Generator/BasicSimulator and next loop
        while(true) {
            portSymbols = removeStreamsFromPortSymbols(portSymbols, nameStreamSymbols);

            double v = output.velocity.doubleValue(METERS_PER_SECOND);
            double ti = output.ti.doubleValue(SECOND);
            double xi = output.xi.doubleValue(METER);
            double yi = output.yi.doubleValue(METER);
            double degree = output.degree.doubleValue(DEGREE_ANGLE);

            Car.setPosition(xi, yi);
            Car.setDegree(degree);

            nameStreamSymbols = getNamedStreamSymbols(getDistancesFromSensors(), portSymbols, ti, v, xi, yi);

            outputs = new HashMap<>();
            try {
                outputs = sim.execute();
            } catch(Exception e) {
                e.printStackTrace();
            }

            input = new SInput(Amount.valueOf((Double)outputs.get("acceleration")[0], METERS_PER_SQUARE_SECOND),
                    Amount.valueOf((Double)outputs.get("steering")[0], DEGREE_ANGLE),
                    output.xi, output.yi, output.ti,
                    (Boolean)outputs.get("doorStatus")[0],
                    (Boolean)outputs.get("indicatorStatus")[0],
                    (Boolean)outputs.get("lightStatus")[0],
                    (Boolean)outputs.get("triggerStatus")[0]);
            simulator.update(input);
            output = simulator.output; //SOutput will be filled with updated values

            try {
                Thread.sleep(100);
            } catch(InterruptedException e) {
                e.printStackTrace();
            }
        }
    }

    @OnWebSocketClose
    public void closed(Session   session, int statusCode, String reason) {
        this.session = Optional.empty();
    }

    @OnWebSocketMessage
    public void message(Session session, String message) throws IOException {
    }

    public void generate() {
        try {
            generator.generate();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public void getOutputs(Amount<Velocity> v, Amount<javax.measure.quantity.Duration> t) throws Exception {
        double velocity = v.doubleValue(METERS_PER_SECOND);
        double time = t.doubleValue(SECOND);

        Map<String, Object> input = new HashMap<>();
        input.put("velocity", velocity);
        input.put("time", time);

        Map<String, Object> output = generator.calculateOutput(input);

        Double acceleration = (Double) output.get("acceleration");
        Double steering = (Double) output.get("steering");
        System.out.println("a: "+acceleration+", s: "+steering);
    }

    public void getOutputs(Amount<Angle> angle, Amount<Length> x, Amount<Length> y,
                           Amount<Length> d1, Amount<Length> d2, Amount<Length> d3, Amount<Length> d4,
                           Amount<Length> d5, Amount<Length> d6, Amount<Length> d7, Amount<Length> d8)
            throws Exception {
        double angleDouble = angle.doubleValue(DEGREE_ANGLE);
        double xDouble = x.doubleValue(METER);
        double yDouble = y.doubleValue(METER);

        double d1Double = d1.doubleValue(METER);
        double d2Double = d2.doubleValue(METER);
        double d3Double = d3.doubleValue(METER);
        double d4Double = d4.doubleValue(METER);
        double d5Double = d5.doubleValue(METER);
        double d6Double = d6.doubleValue(METER);
        double d7Double = d7.doubleValue(METER);
        double d8Double = d8.doubleValue(METER);

        Map<String, Object> input = new HashMap<>();
        input.put("", angleDouble);
        input.put("", xDouble);
        input.put("", yDouble);
        input.put("", d1Double);
        input.put("", d2Double);
        input.put("", d3Double);
        input.put("", d4Double);
        input.put("", d5Double);
        input.put("", d6Double);
        input.put("", d7Double);
        input.put("", d8Double);

        Map<String, Object> output = generator.calculateOutput(input);
        Double acceleration = (Double) output.get("acceleration");
        Double steering = (Double) output.get("steering");

        System.out.println("a: "+acceleration+", s: "+steering);
    }
}
