import React from 'react';
export function useWindowSize() {
    var getSize = function () { return ({
        width: window.innerWidth,
        height: window.innerHeight,
    }); };
    var _a = React.useState(getSize), windowSize = _a[0], setWindowSize = _a[1];
    React.useLayoutEffect(function () {
        var onResize = function () { return setWindowSize(getSize); };
        window.addEventListener('resize', onResize);
        return function () { return window.removeEventListener('resize', onResize); };
    }, []);
    return windowSize;
}
//# sourceMappingURL=utils.js.map