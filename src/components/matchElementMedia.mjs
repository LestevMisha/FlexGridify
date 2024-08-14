function matchElementMedia(element, breakpoints, custom_callback = null) {

    if (!element || !Array.isArray(breakpoints) || breakpoints.length === 0) {
        console.warn('Invalid element or breakpoints');
        return;
    }

    // Create a map to track the matched state for each breakpoint
    const breakpointsState = new Map(breakpoints.map(bp => [bp, false]));

    const updateMatches = (width) => {
        breakpoints.forEach((bp, i) => {
            const currentlyMatching = width > bp;
            if (currentlyMatching !== breakpointsState.get(bp)) {
                breakpointsState.set(bp, currentlyMatching);

                // call custom callback
                const nextMatching = width > breakpoints[i + 1];
                if (custom_callback && nextMatching !== true) {
                    custom_callback(true, bp);
                }
                // console.log(`Breakpoint ${bp} is now ${currentlyMatching ? 'matched' : 'not matched'}.`);
            }
        });
    };

    const observer = new ResizeObserver(entries => {
        for (let entry of entries) {
            if (entry.target === element) {
                requestAnimationFrame(() => {
                    updateMatches(entry.target.clientWidth);
                });
            }
        }
    });

    observer.observe(element);

    // Optionally return a cleanup function to unobserve the element
    return () => {
        observer.unobserve(element);
        observer.disconnect();
    };
}

export default matchElementMedia;