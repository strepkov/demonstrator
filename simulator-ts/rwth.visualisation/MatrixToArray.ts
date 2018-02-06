import * as math from "../libs/math.js";

export {MatrixToArray}

class MatrixToArray{

    public static convert(matrix) : number[]{

        let result : number[] = new Array();

        matrix.forEach(function (element) {
            result.push(element);
        });

        return result;
    }
}