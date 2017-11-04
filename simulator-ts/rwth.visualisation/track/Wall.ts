abstract class Wall {

    // static ?
    public inBoundaries(pointLeft : number[], point : number[], pointRight : number[]) {
        
        let xPointLeft = pointLeft[1];
        let xPointRight = pointRight[1];
        let xPoint = point[1];

        let yPointLeft = pointLeft[0];
        let yPointRight = pointRight[0];
        let yPoint = point[0];

        let xMin = Math.min(xPointLeft, xPointRight) - 2.1;
        let xMax = Math.max(xPointLeft, xPointRight) + 2.1;

        let yMin = Math.min(yPointLeft, yPointRight) - 2.1;
        let yMax = Math.max(yPointLeft, yPointRight) + 2.1;

        /*if(yMin == yMax){
            yMin-=0.01;
            yMax+=0.01;
        }
        if(xMin == xMax){
            xMin-=0.01;
            xMax+=0.01;
        }*/

        let inHeight : boolean = yMin <= yPoint && yPoint <= yMax;
        let inWidth : boolean = xMin <= xPoint && xPoint <= xMax;

        return inHeight && inWidth;
    }
}