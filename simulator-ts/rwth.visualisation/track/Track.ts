import {Wall} from "./Wall";
import {WallCurved} from "./WallCurved";
import {WallLinear} from "./WallLinear";

export {Track}

class Track {
    
    public walls = new Array<Wall>();

    public constructor() {
    
        this.walls.push(new WallLinear([58, -9.5], [122, -9.5]));
        this.walls.push(new WallLinear([58, 10], [-122, 10]));
        this.walls.push(new WallLinear([109, -36], [58, -9.5]));
        this.walls.push(new WallLinear([114, -18], [58, 10]));
        this.walls.push(new WallCurved([123, 22], 60, [184, 22], [109, -36]));
        this.walls.push(new WallCurved([123, 22], 41, [164, 22], [114, -18]));
        this.walls.push(new WallCurved([123, 22], 60, [137.6, 79], [184, 22]));
        this.walls.push(new WallCurved([123, 22], 41, [133, 60.6], [164, 22]));
        this.walls.push(new WallLinear([137.6, 79], [108, 83.5]));
        this.walls.push(new WallLinear([133, 60.6], [98.5, 65.8]));
        this.walls.push(new WallLinear([108, 83.5], [59, 110]));
        this.walls.push(new WallLinear([98.5, 65.8], [58, 90]));
        this.walls.push(new WallLinear([59, 110], [-121, 110]));
        this.walls.push(new WallLinear([58, 90], [-122, 90.8]));
        this.walls.push(new WallCurved([-123, 51.3], 61, [-121, 110], [-183, 51.3]));
        this.walls.push(new WallCurved([-123, 51.3], 41, [-123, 90.8], [-164, 51.3]));
        this.walls.push(new WallCurved([-123, 51.3], 61, [-183, 51.3], [-122, -9.5]));
        this.walls.push(new WallCurved([-123, 51.3], 41, [-164, 51.3], [-122, 10]));
    }
}