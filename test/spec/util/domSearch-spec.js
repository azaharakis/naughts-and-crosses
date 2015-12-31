import React from 'react';
import ReactDOM from 'react-dom';

import domSearch from '../../../src/js/util/domSearch';

xdescribe('domSearch', () => {
    const testContainer = document.createElement('div');
    testContainer.setAttribute('id', 'jasmineContainer');

    beforeEach( () => {
        document.body.appendChild(testContainer);
        ReactDOM.render(
            <div>
                <div id="rootA">
                    <div></div>
                    <div></div>
                    <div>
                        <div id="target"> Find me </div>
                        <div></div>
                    </div>
                </div>
                <div id="rootB">
                    <div></div>
                    <div></div>
                    <div>
                        <div id="foundTarget"> Have you found me </div>
                        <div></div>
                    </div>
                </div>
            </div>,
            document.getElementById('jasmineContainer') );
    });

    afterEach( () => {
        document.getElementsByTagName('body')[0].removeChild(testContainer);
    });

    it('should traverse the nodes to find the matching node', () => {
        const rootA = document.getElementById('rootA');
        const rootB = document.getElementById('rootB');
        const target = document.getElementById('target');
        const foundTarget = document.getElementById('foundTarget');
        expect(domSearch(rootA, rootB, target)).toBe(foundTarget);
    });
});
