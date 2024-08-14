import matchElementMedia from "./components/matchElementMedia.mjs";
import * as css from "./main.css";

class FlexGridify {
    constructor(selector, userOptions = {}) {
        this.element = document.querySelector(selector);
        this.defaultOptions = {
            logQuery: false,
            smooth: false,
            unit: "em",
            gap: 1,
            marginTop: 0,
            marginBottom: 0,
            defaultColumnAmount: 1,
            responsive: true,
            breakpointColumns: {
                "min-width: 1500px": 6,
                "min-width: 1200px": 5,
                "min-width: 992px": 4,
                "min-width: 768px": 3,
                "min-width: 576px": 2,
                "min-width: 0px": 1
            },
            dynamicHeight: true,
            breakpointSelector: "window",
            breakpointCallback: null,
        };

        this.options = { ...this.defaultOptions, ...userOptions };
        this.fontSize = this.#getFontSize();
        this.#initializeParameters();
        this.#setupFlexGridify();
        if (this.responsive) {
            this.#setupBreakpointListener();
        }
        if (this.smooth) {
            this.element.classList.remove('flexGridify_init');
        }
    }





    /*
     * ---------------------------------------------------------------------------------------->
     * ---------------------------------------------------------------------------------------->
     * -------------------------------------PUBLIC METHODS------------------------------------->
     * ---------------------------------------------------------------------------------------->
     * ---------------------------------------------------------------------------------------->
     */





    // returns current breakpoint query using `numCols`
    getCurrentBreakpointQuery() {
        if (this.responsive) {
            for (const [breakpoint, cols] of Object.entries(this.breakpointColumns)) {
                if (this.breakpointElement === "window") {
                    if (window.matchMedia(`(${breakpoint})`).matches) {
                        return breakpoint;
                    }
                } else {
                    const breakpointValue = parseFloat(breakpoint.match(/(\d+)/g)[0]);
                    const currentWidth = parseFloat(window.getComputedStyle(this.breakpointElement).width);
                    if (currentWidth > breakpointValue) {
                        return breakpoint;
                    }
                }
            }
        }
        return "No query, responsive is set to `false`";
    }

    // adds margin-top to the element's children
    applyMarginTop() {
        this.#typeOf(this.marginTop, "number");
        Array.from(this.element.children).forEach(child => {
            child.style.marginTop = `${this.marginTop}${this.unit}`;
        });
    }

    // adds margin-bottom to the element's children
    applyMarginBottom() {
        this.#typeOf(this.marginBottom, "number");
        Array.from(this.element.children).forEach(child => {
            child.style.marginBottom = `${this.marginBottom}${this.unit}`;
        });
    }

    // adds margin-top & margin-bottom to the element's children
    applyMargins() {
        this.#typeOf(this.marginTop, "number");
        this.#typeOf(this.marginBottom, "number");
        Array.from(this.element.children).forEach(child => {
            child.style.marginTop = `${this.marginTop}${this.unit}`;
            child.style.marginBottom = `${this.marginBottom}${this.unit}`;
        });
    }

    // calculates up-to-date height of an element
    applyHeightChange(numCols) {
        // if no argument present
        if (!numCols) {
            numCols = this.getColumnCount();
        }
        if (numCols < 2) {
            this.element.style.removeProperty('height');
            return;
        }

        const children = Array.from(this.element.children);
        const heights = new Array(numCols).fill(0);
        const styles = children.map(child => window.getComputedStyle(child));
        const fontSize = parseFloat(styles[0].getPropertyValue("font-size"));
        const marginValue = this.#getMarginValue(fontSize);

        for (let i = 0; i < children.length; i++) {
            const child = children[i];
            if (child.classList.contains('flexGridify-break')) continue;

            const style = styles[i];
            const order = parseFloat(style.getPropertyValue('order'), 10);
            const height = parseFloat(style.getPropertyValue('height'));
            const gap = this.unit === "em" ? this.gap * fontSize : this.gap;

            heights[order - 1] += Math.ceil(height) + marginValue + gap;
        }

        this.element.style.height = `${Math.max(...heights)}px`;
    }

    // Returns up-to-date/current amount of columns, depending on media queries
    getColumnCount() {
        if (this.responsive) {
            for (const [breakpoint, cols] of Object.entries(this.breakpointColumns)) {
                if (this.breakpointSelector === "window") {
                    if (window.matchMedia(`(${breakpoint})`).matches) {
                        return cols;
                    }
                } else {
                    const breakpointValue = parseFloat(breakpoint.match(/(\d+)/g)[0]);
                    const currentWidth = parseFloat(window.getComputedStyle(this.breakpointElement).width);
                    if (currentWidth > breakpointValue) {
                        return cols;
                    }
                }
            }
        }
        return this.defaultColumnAmount;
    }

    // adds/updates column class amount, depending on the `numCols` parameter
    applyColumnClass(numCols) {
        // if no argument present
        if (!numCols) {
            numCols = this.getColumnCount();
        }
        const className = `flexGridify-cols-${numCols}`;
        if (!this.element.classList.contains(className)) {
            this.element.className = this.element.className.replace(/flexGridify-cols-\d+/, '');
            this.element.classList.add(className);
        }
    }

    // adds a new breaks to an element, depending on the `numCols` parameter
    applyColumnBreaks(numCols) {
        // if no argument present
        if (!numCols) {
            numCols = this.getColumnCount();
        }
        const existingBreaks = this.element.querySelectorAll('.flexGridify-break');
        if (existingBreaks.length !== numCols - 1) {
            this.#clearColumnBreaks();
            for (let i = 1; i < numCols; i++) {
                const breakElement = document.createElement('div');
                breakElement.classList.add('flexGridify-break', `flexGridify-break-${i}`);
                this.element.appendChild(breakElement);
            }
        }
    }

    /*
    * Calculates and applies gap-related CSS variables for a flex layout.
    * Sets CSS custom properties for row gap, column gap, and column width calculation.
    */
    applyGap(numCols) {
        // Ensure `this.gap` is a number
        this.#typeOf(this.gap, "number");

        // if no argument present
        if (!numCols) {
            numCols = this.getColumnCount();
        }

        // Cache unit and gap values for reuse
        const gapUnit = this.unit;
        const gap = this.gap;

        // Calculate the number of breaks, which is always one less than the number of columns
        const numBreaks = numCols - 1;

        /*
         * Calculate the total amount of gaps.
         * This includes the gaps between columns and the gaps at the edges.
         * The formula takes into account the number of columns and breaks:
         * - Number of columns
         * - Number of breaks (one less than the number of columns)
         * - Subtract 1 because there is one less gap than the total number of elements (columns + breaks).
         */
        const amountOfGaps = numCols + numBreaks - 1;

        /*
         * Calculate the column gap accounting for the additional space taken by breaks.
         * Since the breaks do not occupy space themselves, the gap between columns is effectively doubled.
         * Divide the total gap by 2 to account for this effect.
         */
        const gapColWithCalcOnBreaks = gap / 2;

        /*
         * Calculate the ratio of the gap that should be applied to each column width.
         * The formula takes into account the total number of gaps and columns:
         * - Multiply the adjusted gap (with breaks) by the total number of gaps.
         * - Divide by the number of columns to get the ratio for each column.
         */
        const gapRatioForEach = (gapColWithCalcOnBreaks * amountOfGaps) / numCols;

        // Set the row gap as defined by the user
        document.documentElement.style.setProperty('--flexGridify-row-gap', `${gap}${gapUnit}`);

        // Set the column gap to half of the defined gap, adjusted for the space taken by breaks
        document.documentElement.style.setProperty('--flexGridify-column-gap', `${gapColWithCalcOnBreaks}${gapUnit}`);

        /*
         * Set the column width calculation, considering the gap and number of columns.
         * The width is calculated as a percentage of the total width, adjusted by the gap ratio.
         * The `calc` function computes the width by subtracting the gap ratio from the percentage width of each column.
         */
        document.documentElement.style.setProperty('--flexGridify-column-width-calc', `calc((100% / ${numCols}) - ${gapRatioForEach}${gapUnit})`);
    }

    // for user to reset or update the flexGridify
    reset() {
        const numCols = this.getColumnCount();
        this.applyGap(numCols);
        this.applyColumnClass(numCols);
        this.applyColumnBreaks(numCols);
        this.applyHeightChange(numCols);
    }

    // removes all dynamic observers from children
    disconnectDynamicObservers() {
        for (const [child, observer] of this.#dynamicResizeObserversForCleanup) {
            observer.unobserve(child);
            observer.disconnect();
        }
        this.#dynamicResizeObserversForCleanup.clear();
    }

    // adds dynamic observers to children
    connectDynamicObservers() {
        Array.from(this.element.children).forEach(child => {
            if (this.dynamicHeight) {
                this.#dynamicHeightUpdater(child);
            }
        });
    }

    // sets a new breakpoints
    resetBreakpoints() {
        this.cleanupBreakpointListeners();
        this.#setupBreakpointListener();
    }

    /*
     * ---------------------------------------------------------------------------------------->
     * ---------------------------------------------------------------------------------------->
     * --------------------------------PRIVATE HELPER METHODS---------------------------------->
     * ---------------------------------------------------------------------------------------->
     * ---------------------------------------------------------------------------------------->
     */





    // removes all breakpoint listeners
    cleanupBreakpointListeners() {
        // Cleanup media query listeners
        if (this.#mediaQueryListenersForCleanup.size !== 0) {
            this.#mediaQueryListenersForCleanup.forEach((listener, mediaQuery) => {
                mediaQuery.removeEventListener('change', listener);
            });
            this.#mediaQueryListenersForCleanup.clear();
        }

        // Cleanup ResizeObserver if it exists
        if (this.#breakpointResizeObserverCleanup) {
            this.#breakpointResizeObserverCleanup();
            this.#breakpointResizeObserverCleanup = null;
        }
    }

    // removes every break from the element
    #clearColumnBreaks() {
        const breaks = this.element.querySelectorAll('.flexGridify-break');
        breaks.forEach(breakElement => breakElement.remove());
    }

    // checks if the type passed by the user is correct
    #typeOf(property, type) {
        if (!(typeof property === type)) {
            throw TypeError(`Incorrect type for '${property}' property. It is '${type}'.`);
        }
    }

    // method helper to calculate the overall height. Calculates the margin value
    #getMarginValue(fontSize) {
        let marginValue = 0;
        if (this.marginBottom) {
            marginValue += this.unit === "em" ? this.marginBottom * fontSize : this.marginBottom;
        }
        if (this.marginTop) {
            marginValue += this.unit === "em" ? this.marginTop * fontSize : this.marginTop;
        }
        return marginValue;
    }

    // returns current fon size
    #getFontSize() {
        return window.getComputedStyle(this.element).getPropertyValue("font-size").toString().match(/\d+/g)[0];
    }





    /*
     * ---------------------------------------------------------------------------------------->
     * ---------------------------------------------------------------------------------------->
     * -----------------------------------PRIVATE METHODS-------------------------------------->
     * ---------------------------------------------------------------------------------------->
     * ---------------------------------------------------------------------------------------->
     */





    /*
     * Method is used in initial setup
     * Calculates margins.
     * Calculates gaps.
     * Changes column class on the current columns amount.
     * Adds/Removes breaks if necessary.
     * Changes the overall height.
     */
    #reload(isBreakpoint = false, breakpoint = null) {
        // fire breakpoint callback
        if (isBreakpoint && this.breakpointCallback) {
            if (this.logQuery) {
                console.log("%cThreshold:", "color: #0d6efd;", breakpoint);
            }
            this.breakpointCallback();
        }
        const numCols = this.getColumnCount();

        this.applyMargins();
        this.applyGap(numCols);
        this.applyColumnClass(numCols);
        this.applyColumnBreaks(numCols);
        this.applyHeightChange(numCols);
    }

    /*
     * Classname initialization.
     * Calling the reload method.
     */
    #setupFlexGridify() {
        this.element.classList.add('flexGridify');
        Array.from(this.element.children).forEach(child => {
            child.classList.add('flexGridify-item');
            if (this.dynamicHeight) {
                this.#dynamicHeightUpdater(child);
            }
        });
        this.#reload();
    }

    /*
     * Main breakpoint listener
     * The default (Window listener) uses native matchMedia method.
     * Any custom element uses custom matchElementMedia implementation.
     * Conditional choise depends if user specified `breakpointSelector` otherwise 'window' by default.
     */
    #setupBreakpointListener() {
        const boundReload = this.#reload.bind(this);
        if (this.breakpointSelector === "window") {
            for (const breakpoint of Object.keys(this.breakpointColumns)) {
                const mediaQuery = window.matchMedia(`(${breakpoint})`);
                const listener = () => boundReload(true, breakpoint.match(/\d+/)[0]);
                mediaQuery.addEventListener('change', listener);

                // keep for cleanup
                this.#mediaQueryListenersForCleanup.set(mediaQuery, listener);
            }
        } else {
            // Numeric Breakpoints Array
            const numericBreakpointsArray = Object.keys(this.breakpointColumns).map(breakpointKey => {
                const matches = breakpointKey.match(/\d+/);
                return parseFloat(matches[0], 10);
            }).sort((a, b) => a - b);
            const cleanup = matchElementMedia(this.breakpointElement, numericBreakpointsArray, boundReload);

            // keep for cleanup
            this.#breakpointResizeObserverCleanup = cleanup;
        }
    }

    /*
     * Wheenever child of an element changes its height it is triggering change in the element's height
     * If `dynamicHeight` is set to `false` it means that any change that may be made by resizing will ruin the grid (based on the flex layout)
     */
    #dynamicHeightUpdater(child) {
        let lastHeights = new Map();

        const resizeObserver = new ResizeObserver(entries => {
            requestAnimationFrame(() => {
                for (let entry of entries) {
                    const target = entry.target;
                    const currentHeight = entry.contentRect.height;

                    if (!lastHeights.has(target)) {
                        lastHeights.set(target, currentHeight);
                    } else {
                        const lastHeight = lastHeights.get(target);
                        if (lastHeight !== currentHeight) {
                            const numCols = this.getColumnCount();
                            if (numCols > 1) {
                                this.applyHeightChange(numCols);
                            }
                            lastHeights.set(target, currentHeight);
                        }
                    }
                }

            });
        });

        resizeObserver.observe(child);

        // keep for cleanup
        this.#dynamicResizeObserversForCleanup.set(child, resizeObserver);
    }

    /*
     * Main parameters initialization.
     * Initializes all the properties for further use
     */
    #mediaQueryListenersForCleanup
    #dynamicResizeObserversForCleanup
    #breakpointResizeObserverCleanup

    #initializeParameters() {
        const { gap, unit, smooth, marginTop, marginBottom, logQuery, dynamicHeight, breakpointSelector, defaultColumnAmount, responsive, breakpointColumns, breakpointCallback } = this.options;

        // public parameters
        this.unit = unit;
        this.smooth = smooth;
        this.gap = gap;
        this.marginTop = marginTop;
        this.marginBottom = marginBottom;
        this.logQuery = logQuery;
        this.dynamicHeight = dynamicHeight;
        this.breakpointSelector = breakpointSelector;
        this.breakpointElement = document.querySelector(this.breakpointSelector);
        this.defaultColumnAmount = defaultColumnAmount;
        this.responsive = responsive;
        this.breakpointCallback = breakpointCallback;
        this.breakpointColumns = breakpointColumns;

        // private parameters
        this.#mediaQueryListenersForCleanup = new Map();
        this.#dynamicResizeObserversForCleanup = new Map();
        this.#breakpointResizeObserverCleanup = null;
    }


}

export default FlexGridify;