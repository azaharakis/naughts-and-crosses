import debounce from '../../../src/js/util/debounce';

describe('debounce', () => {
    let debounceSpy;
    let debounced;
    beforeEach( () => {
        jasmine.clock().install();
        debounceSpy = jasmine.createSpy('debounceSpy');
        debounced = debounce(debounceSpy, 300);
    });

    afterEach( () => {
        jasmine.clock().uninstall();
    });

    it('should only execute the function once when called in succession', () => {
        debounced();
        debounced();
        debounced();
        jasmine.clock().tick(301);
        expect(debounceSpy.calls.count()).toBe(1);
    });

    it('should execute the function twice within the allocated time', () => {
        debounced();
        jasmine.clock().tick(301);
        debounced();
        jasmine.clock().tick(301);
        expect(debounceSpy.calls.count()).toBe(2);
    });
});
