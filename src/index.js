import matchElementMedia from "./components/matchElementMedia.mjs";
import swapElements from "./components/swapElements.mjs";
import { addProperties, removeProperties } from "./components/addRemoveProperties.mjs";
import * as css from "./main.css";

class FlexGridify {
    constructor(selector = null, userOptions = {}) {
        if (selector && userOptions) {
            this.initialize(selector, userOptions);
        }
    }



    /*
     * ---------------------------------------------------------------------------------------->
     * ------------------------------------ 1. IMPORTANT METHODS------------------------------->
     * ---------------------------------------------------------------------------------------->
     */
    // 1. Retrieves default options
    getDefaultOptions() {
        return {
            enableLogQuery: false,
            enableResponsiveLayout: true,
            enableSmoothLoading: false,
            enableDynamicHeight: true,
            enableDragAndDrop: false,
            rememberDragAndDropPosition: true,
            dragAndDropAnimation: {
                opacity: 0.5,
                transform: "translate(0.25em, -0.25em)",
            },
            columnBreakpoints: {
                1500: 6,
                1200: 5,
                992: 4,
                768: 3,
                576: 2,
                0: 1
            },
            onDragAndDropChange: null,
            onBreakpointChange: null,
            gap: 1,
            marginTop: 0,
            marginBottom: 0,
            defaultColumnCount: 1,
            sizeUnit: "em",
            breakpointSelector: "window",
            dragAndDropSelector: "default",
        }
    }

    // 2. Main initialization process
    initialize(selector, userOptions) {
        // Default Initialization
        this.defaultOptions = this.getDefaultOptions();
        this.options = { ...this.defaultOptions, ...userOptions };

        // Proceed with initialization if a selector is provided
        if (selector) {
            this.element = document.querySelector(selector);

            // Initialization
            this.#initializeParameters();
            this.#setupFlexGridify();
            this.#setupBreakpointListener();
            this.#setupDragAndDropListeners();

            // show the grid
            if (this.enableSmoothLoading) {
                setTimeout(() => {
                    this.element.classList.remove(this.#fGinit__className);
                }, 12);
            }
        }
    }

    // 3. Returns columns/breakpoint value
    getBreakpointQuery(query = "columns") {
        const defaultReturn = query === "columns" ? this.defaultColumnCount : "No query, `responsive` is set to `false`";
        if (!this.enableResponsiveLayout) return defaultReturn;

        const throughBreakpointsValue = this.#throughBreakpoints((breakpointElement, [breakpoint, breakpointNext, columns], mediaQuery, mediaQueryNext) => {
            if (typeof breakpointElement === "object") {
                // If `breakpointSelector` is an element (meaning object)
                const currentWidth = parseFloat(window.getComputedStyle(breakpointElement).width);
                if (currentWidth > breakpoint && !(currentWidth > breakpointNext)) return query === "columns" ? columns : breakpoint;
            } else {
                // If `breakpointSelector` is a string
                if (mediaQuery.matches && !mediaQueryNext.matches) return query === "columns" ? columns : breakpoint;
            }
        });

        if (throughBreakpointsValue) return throughBreakpointsValue;
        return defaultReturn;
    }

    // 4. Calculates up-to-date height of an element
    applyHeightChange(numCols) {
        // if no argument present
        if (!numCols) {
            numCols = this.getBreakpointQuery("columns");
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
            if (child.classList.contains(this.#fGbreak__className)) continue;

            const style = styles[i];
            const order = parseFloat(style.getPropertyValue('order'), 10);
            const height = parseFloat(style.getPropertyValue('height'));
            const gap = this.sizeUnit === "em" ? this.gap * fontSize : this.gap;

            heights[order - 1] += Math.ceil(height) + marginValue + gap;
        }

        this.element.style.height = `${Math.max(...heights)}px`;
    }



    /*
     * ---------------------------------------------------------------------------------------->
     * -------------------------------- 2. MARGIN & GAP METHODS-------------------------------->
     * ---------------------------------------------------------------------------------------->
     */
    // 1. Adds margin-top to the element's children
    applyMarginTop() {
        this.#typeOf(this.marginTop, "number");
        Array.from(this.element.children).forEach(child => {
            child.style.marginTop = `${this.marginTop}${this.sizeUnit}`;
        });
    }

    // 2. Adds margin-bottom to the element's children
    applyMarginBottom() {
        this.#typeOf(this.marginBottom, "number");
        Array.from(this.element.children).forEach(child => {
            child.style.marginBottom = `${this.marginBottom}${this.sizeUnit}`;
        });
    }

    // 3. Adds margin-top & margin-bottom to the element's children
    applyMargins() {
        this.#typeOf(this.marginTop, "number");
        this.#typeOf(this.marginBottom, "number");
        Array.from(this.element.children).forEach(child => {
            child.style.marginTop = `${this.marginTop}${this.sizeUnit}`;
            child.style.marginBottom = `${this.marginBottom}${this.sizeUnit}`;
        });
    }

    // Calculates and applies gap-related CSS variables for a flex layout. Sets CSS properties for row, column gaps, and column width.
    applyGap(numCols) {

        // Ensure `this.gap` is a number
        this.#typeOf(this.gap, "number");

        // if no argument present
        if (!numCols) {
            numCols = this.getBreakpointQuery("columns");
        }

        // Cache unit and gap values for reuse
        const gapUnit = this.sizeUnit;
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



    /*
     * ---------------------------------------------------------------------------------------->
     * ---------------------------------- 3. COLUMN METHODS------------------------------------>
     * ---------------------------------------------------------------------------------------->
     */
    // adds/updates column class amount, depending on the `numCols` parameter
    applyColumnClass(numCols) {
        // if no argument present
        if (!numCols) {
            numCols = this.getBreakpointQuery("columns");
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
            numCols = this.getBreakpointQuery("columns");
        }
        const existingBreaks = this.element.querySelectorAll(`.${this.#fGbreak__className}`);
        if (existingBreaks.length !== numCols - 1) {
            this.#clearColumnBreaks();
            for (let i = 1; i < numCols; i++) {
                const breakElement = document.createElement('div');
                breakElement.classList.add(this.#fGbreak__className, `${this.#fGbreak__className}-${i}`);
                this.element.appendChild(breakElement);
            }
        }
    }



    /*
     * ---------------------------------------------------------------------------------------->
     * --------------------------------- 4. USER METHODS--------------------------------------->
     * ---------------------------------------------------------------------------------------->
     */
    // for user to reset or update the flexGridify
    reset() {
        this.#check();
        const numCols = this.getBreakpointQuery("columns");
        this.applyMargins();
        this.applyGap(numCols);
        this.applyColumnClass(numCols);
        this.applyColumnBreaks(numCols);
        this.applyHeightChange(numCols);
    }

    // sets a new breakpoints
    resetBreakpoints() {
        this.cleanupBreakpointListeners();
        this.#setupBreakpointListener();
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
            if (this.enableDynamicHeight) {
                this.#dynamicHeightUpdater(child);
            }
        });
    }

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

    // removes all dnd listeners
    cleanupDragAndDropListeners() {
        this.#dragAndDropListenersForCleanup.forEach((listener, event) => {
            this.element.removeEventListener(event, listener);
        });
        this.#dragAndDropListenersForCleanup.clear();

        Array.from(this.element.children).forEach(child => {
            if (child.classList.contains("flexGridify-break")) return;
            // remove any draggable attribute
            if (this.dragAndDropSelector !== "default") {
                const draggableTarget = child.querySelector(this.dragAndDropSelector);
                draggableTarget.removeAttribute('draggable');
            }
            child.removeAttribute('draggable');
        });
    }

    // re-initializes drag-and-drop functionality
    reinitDragAndDrop() {
        if (!this.enableDragAndDrop) return;
        const numCols = this.getBreakpointQuery("columns");

        const fragment = document.createDocumentFragment();
        const children = Array.from(this.element.children);
        const lengthArray = Array.from({ length: children.length }, (_, v) => v);
        const orderedList = this.rememberDragAndDropPosition ? (JSON.parse(localStorage.getItem('gridOrder')) ?? lengthArray) : lengthArray;

        orderedList.forEach(order => {
            const child = children.find((child_) => parseInt(child_.getAttribute("data-draggable-id")) === order);
            if (child) {
                if (this.dragAndDropSelector === "default") {
                    child.setAttribute('draggable', 'true');
                } else {
                    const draggableTarget = child.querySelector(this.dragAndDropSelector);
                    draggableTarget.setAttribute('draggable', 'true');
                }
                child.setAttribute('data-draggable-id', order);

                fragment.appendChild(child);
            }
        });

        this.element.innerHTML = '';
        this.element.appendChild(fragment);
        this.applyColumnBreaks(numCols);
        this.#setupDragAndDropListeners();
    }



    /*
     * ---------------------------------------------------------------------------------------->
     * ----------------------------- 5. PRIVATE HELPER METHODS--------------------------------->
     * ---------------------------------------------------------------------------------------->
     */
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
            marginValue += this.sizeUnit === "em" ? this.marginBottom * fontSize : this.marginBottom;
        }
        if (this.marginTop) {
            marginValue += this.sizeUnit === "em" ? this.marginTop * fontSize : this.marginTop;
        }
        return marginValue;
    }



    /*
     * ---------------------------------------------------------------------------------------->
     * -------------------------------- 6. PRIVATE METHODS------------------------------------->
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
        if (isBreakpoint && this.onBreakpointChange) {
            if (this.enableLogQuery && breakpoint) {
                console.log("%cThreshold:", "color: #0d6efd;", breakpoint);
            }
            this.onBreakpointChange();
        } else {
            if (this.enableLogQuery && breakpoint) {
                console.log("%cThreshold:", "color: #0d6efd;", breakpoint);
            }
        }
        const numCols = this.getBreakpointQuery("columns");
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
        this.element.classList.add(this.#fG__className);

        const fragment = document.createDocumentFragment();
        const children = Array.from(this.element.children);
        const lengthArray = Array.from({ length: children.length }, (_, v) => v);
        const orderedList = this.rememberDragAndDropPosition ? (JSON.parse(localStorage.getItem('gridOrder')) ?? lengthArray) : lengthArray;

        orderedList.forEach(order => {
            const child = children[order];
            if (child) {
                child.classList.add(this.#fGitem__className);

                if (this.dragAndDropSelector === "default") {
                    child.setAttribute('draggable', this.enableDragAndDrop ? 'true' : "false");
                } else {
                    const draggableTarget = child.querySelector(this.dragAndDropSelector);
                    draggableTarget.setAttribute('draggable', this.enableDragAndDrop ? 'true' : "false");
                }
                child.setAttribute('data-draggable-id', order);

                if (this.enableDynamicHeight) {
                    this.#dynamicHeightUpdater(child);
                }
                fragment.appendChild(child);
            }
        });

        // Clear the parent element and re-append reordered children
        this.element.innerHTML = '';
        this.element.appendChild(fragment);
    }

    /*
     * Main breakpoint listener
     * The default (Window listener) uses native matchMedia method.
     * Any custom element uses custom matchElementMedia implementation.
     * Conditional choise depends if user specified `breakpointSelector` otherwise 'window' by default.
     */
    #setupBreakpointListener() {
        const boundReload = this.#reload.bind(this);

        this.#throughBreakpoints((breakpointElement, [breakpoint, breakpointNext, columns], mediaQuery, mediaQueryNext) => {

            if (typeof breakpointElement === "object") {
                // Sets a breakpoint listeners for an element
                const currentWidth = parseFloat(window.getComputedStyle(breakpointElement).width);
                if (currentWidth > breakpoint && !(currentWidth > breakpointNext)) {
                    const cleanup = matchElementMedia(breakpointElement, Object.keys(this.columnBreakpoints), boundReload);
                    this.#breakpointResizeObserverCleanup = cleanup;
                };
            } else {
                // Sets a matchMedia for window
                const listener = () => { boundReload(true, breakpoint) };
                mediaQuery.addEventListener('change', listener);

                if (mediaQuery.matches && !mediaQueryNext.matches) listener();
                this.#mediaQueryListenersForCleanup.set(mediaQuery, listener);
            }

        });

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
                            const numCols = this.getBreakpointQuery("columns");
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
    * Drag And Drop (DND)
    * Enables drag and drop for children/Switch places
    */
    #setupDragAndDropListeners() {
        if (!this.enableDragAndDrop) return;
        let draggedElement, draggedItem, enteredItem;

        const handleDragStart = (e) => {
            const target = e.target.closest(`.${this.#fGitem__className}`) ?? e.target;
            e.dataTransfer.setDragImage(target, e.offsetX, e.offsetY);

            // prevent everything from being dragged, except `dragAndDropSelector`, if `dragAndDropSelector` isn't "default"
            if (this.dragAndDropSelector !== "default") {
                const dragAndDropSelectedElement = target.querySelector(this.dragAndDropSelector);
                if (draggedElement !== dragAndDropSelectedElement && draggedElement !== this.element) {
                    e.preventDefault();
                    e.stopPropagation();
                    e.stopImmediatePropagation();
                }
            }

            draggedItem = e.target.closest(`.${this.#fGitem__className}`);
        }

        const handleDragEnter = (e) => {
            enteredItem = e.target.closest(`.${this.#fGitem__className}`);
            if (enteredItem) {
                addProperties(enteredItem, this.dragAndDropAnimation);
            }
        }

        const prevent = (e) => {
            e.preventDefault();
        }

        const handleDragLeave = (e) => {
            const currentLeftItem = e.target.closest(`.${this.#fGitem__className}`);
            if (currentLeftItem === null) return;
            if (currentLeftItem === enteredItem) return;
            if (currentLeftItem === draggedItem) return;

            removeProperties(currentLeftItem, Object.keys(this.dragAndDropAnimation));
        }

        const handleDrop = (e) => {
            const currentlyEnteredItem = e.target.closest(`.${this.#fGitem__className}`);
            if (currentlyEnteredItem === null) return;

            removeProperties(currentlyEnteredItem, Object.keys(this.dragAndDropAnimation));
            swapElements(draggedItem, currentlyEnteredItem);
            this.applyHeightChange();
            this.#saveOrderToStorage();
        }

        const handleDragEnd = (e) => {
            removeProperties(draggedItem, Object.keys(this.dragAndDropAnimation));
        }

        const handleMouseDown = (e) => {
            draggedElement = e.target;
        }

        const listeners = [
            ["dragstart", handleDragStart],
            ["dragenter", handleDragEnter],
            ["dragleave", handleDragLeave],
            ["dragover", prevent],
            ["drop", handleDrop],
            ["dragend", handleDragEnd],
            // if dragAndDropSelector is default skip `handleMouseDown` listener
            this.dragAndDropSelector !== "default" ? ["mousedown", handleMouseDown] : null,
        ]

        listeners.filter(Boolean).forEach(([event, listener]) => {
            this.element.addEventListener(event, listener);
            this.#dragAndDropListenersForCleanup.set(event, listener);
        });
    }

    // Save order to localStorage
    #saveOrderToStorage() {
        if (!this.rememberDragAndDropPosition) return;
        const order = Array.from(this.element.querySelectorAll(`.${this.#fGitem__className}`)).map(child => parseInt(child.getAttribute('data-draggable-id')));
        localStorage.setItem('gridOrder', JSON.stringify(order));
        // callback
        if (this.onDragAndDropChange) this.onDragAndDropChange(order);
    }

    // Loops callback with needed values
    #throughBreakpoints(callback) {
        const asendingColumnBreakpoints = Object.entries(this.columnBreakpoints).sort((a, b) => a - b);
        const breakpointElement = this.breakpointSelector !== "window" ? document.querySelector(this.breakpointSelector) : this.breakpointSelector;

        for (var i = 0; asendingColumnBreakpoints.length > i; i++) {
            const bucket = asendingColumnBreakpoints[i];
            const nextBucket = asendingColumnBreakpoints[i + 1] ?? [];
            const breakpoint = bucket[0];
            const breakpointNext = nextBucket[0];
            const mediaQuery = window.matchMedia(`(min-width: ${breakpoint}px)`);
            const mediaQueryNext = breakpointNext ? window.matchMedia(`(min-width: ${breakpointNext}px)`) : false;


            const value = callback(breakpointElement, [breakpoint, breakpointNext, bucket[1]], mediaQuery, mediaQueryNext);
            if (value) return value;
        }
        return null;
    }

    // Checks different property types
    #check() {
        if (this.sizeUnit !== "px" && this.sizeUnit !== "em") {
            throw TypeError("Incorrect input. 'sizeUnit' has to be either 'em' or 'px'");
        } else if (this.defaultColumnCount > 8) {
            throw TypeError(`${this.defaultColumnCount} columns is restricted. Maximum amount of columns 'FlexGridify' can have by default is 8, if more is needed consider to change it manually`);
        }
    }

    #dragAndDropListenersForCleanup
    #mediaQueryListenersForCleanup
    #dynamicResizeObserversForCleanup
    #breakpointResizeObserverCleanup
    #fGitem__className
    #fGbreak__className
    #fGinit__className
    #fG__className
    
    #initializeParameters() {
        const { gap, sizeUnit, enableSmoothLoading, enableDragAndDrop, dragAndDropAnimation, rememberDragAndDropPosition, marginTop, marginBottom, enableLogQuery, enableDynamicHeight, breakpointSelector, dragAndDropSelector, defaultColumnCount, enableResponsiveLayout, columnBreakpoints, onBreakpointChange, onDragAndDropChange } = this.options;

        // public parameters
        this.sizeUnit = sizeUnit;
        this.enableSmoothLoading = enableSmoothLoading;
        this.enableDragAndDrop = enableDragAndDrop;
        this.rememberDragAndDropPosition = rememberDragAndDropPosition;
        this.dragAndDropAnimation = dragAndDropAnimation;
        this.gap = gap;
        this.marginTop = marginTop;
        this.marginBottom = marginBottom;
        this.enableLogQuery = enableLogQuery;
        this.enableDynamicHeight = enableDynamicHeight;
        this.breakpointSelector = breakpointSelector;
        this.dragAndDropSelector = dragAndDropSelector;
        this.defaultColumnCount = defaultColumnCount;
        this.enableResponsiveLayout = enableResponsiveLayout;
        this.onBreakpointChange = onBreakpointChange;
        this.onDragAndDropChange = onDragAndDropChange;
        this.columnBreakpoints = columnBreakpoints;

        // * private parameters
        this.#dragAndDropListenersForCleanup = new Map();
        this.#mediaQueryListenersForCleanup = new Map();
        this.#dynamicResizeObserversForCleanup = new Map();
        this.#breakpointResizeObserverCleanup = null;
        // ** classnames
        this.#fGitem__className = "flexGridify-item";
        this.#fGbreak__className = "flexGridify-break";
        this.#fGinit__className = "flexGridify-init";
        this.#fG__className = "flexGridify";
    }

}

export default FlexGridify;