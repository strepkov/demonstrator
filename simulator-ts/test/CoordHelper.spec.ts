import {CoordHelper} from '../rwth.visualisation/CoordHelper';

describe('artificial test', () => {
    it('should return 1', () => {
        let expected = 1;
        expect(CoordHelper.test()).toEqual(expected);
    });
});
