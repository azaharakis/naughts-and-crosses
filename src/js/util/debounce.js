export default function debounce( fn, time) {
    let debouncedFn;
    return () => {
        clearTimeout(debouncedFn);
        debouncedFn = setTimeout( () => {
            fn();
        }, time);
    }
}
