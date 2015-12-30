import binarySearch from '../../../src/js/util/binarySearch';

describe('binarySearch', () => {
    let arrToSearch = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];

    it('should find a match', () => {
        expect(binarySearch(arrToSearch, 2)).toBe(1);
    });

    it('should return -1 if no match is found' , () => {
        expect(binarySearch(arrToSearch, 40)).toBe(-1);
    });
});
