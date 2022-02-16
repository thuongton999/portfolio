const INTERSECTION_OBSERVER_SUPPORTED = ("IntersectionObserver" in window);
function createObserver(callback, options) {
    if (!INTERSECTION_OBSERVER_SUPPORTED) return null;
    return new IntersectionObserver(entries => {
        entries.forEach(entry => {
            callback(entry);
        })
    }, options);
}

export default createObserver;