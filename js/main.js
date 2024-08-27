document.addEventListener("DOMContentLoaded", function () {
    (() => {
        /* 1. Code Hook <hoook_Hg5Od206sa> / Observes width & height of an element and displays it */
        const currentDimensions = document.getElementById("currentDimensions");
        const flexGridifyElement = document.querySelector(".element");
        const flexGridifyPropertiesStuck = document.getElementById("flexGridifyPropertiesStuck");
        const dimensionsObserver = new ResizeObserver(entries => {
            for (const entry of entries) {
                const target = entry.target;
                currentDimensions.textContent = `${target.clientWidth}x${target.clientHeight}px`;
                flexGridifyPropertiesStuck.style.height = `${target.clientHeight}px`;
            }
        });
        dimensionsObserver.observe(flexGridifyElement);

        /* 2. Code Hook <hoook_Asd4O68FdH> / Replicates `Enter on Input` for click  */
        const keyboardEvent = new KeyboardEvent('keypress', {
            key: 'Enter',
            code: 'Enter',
            keyCode: 13,
            which: 13,
            bubbles: true,
            cancelable: true
        });

        const sendBtns = document.querySelectorAll(".send-btn");
        sendBtns.forEach(sendBtn => {
            sendBtn.addEventListener("click", () => {
                const relativeInput = sendBtn.closest("label.modern-blox-wrapper").querySelector("input, textarea");
                // Produce input `Enter` action
                relativeInput.dispatchEvent(keyboardEvent);
                setTimeout(() => relativeInput.blur(), 1);
            });
        });

        /* 3. Code Hook <hoook_Qkl3m2JJJ_0> / adds auto-indentation and auto-height functionality for textarea */
        const textareas = document.querySelectorAll("textarea");
        textareas.forEach(textarea => {
            const textareaIndent = toBoolean(textarea.getAttribute("data-textarea-indent"));

            textarea.addEventListener('keyup', adjustTextareaHeight);
            if (textareaIndent) {
                textarea.addEventListener('keydown', addIndentationOnEnter.bind(textarea, true));
            } else {
                textarea.addEventListener('keydown', addIndentationOnEnter.bind(textarea, false));
            }
        });

        /* 4. Code Hook <hoook_WsoUo97_0J> / clears local storage */
        const resetBtn = document.getElementById("reset-btn");
        resetBtn.addEventListener("click", function () {
            localStorage.clear();
            location.reload();
        });

        /* 5. Code Hook <hoook_Df2ldsoo90> / handles reload or dynamic website functionality */
        const isDynamic = document.getElementById("isDynamic");
        isDynamic.checked = toBoolean(localStorage.getItem("isDynamic")) ? true : isDynamic.checked;
        isDynamic.addEventListener("click", function () {
            localStorage.setItem("isDynamic", isDynamic.checked);
        });

        /* 6. Code Hook <hoook_QGd430pod_w> / handles initial priority of properties */
        const prioritizeLocalStorage = document.getElementById("prioritizeLocalStorage");
        prioritizeLocalStorage.checked = toBoolean(localStorage.getItem("prioritizeLocalStorage")) ? true : prioritizeLocalStorage.checked;
        prioritizeLocalStorage.addEventListener("click", function () {
            localStorage.setItem("prioritizeLocalStorage", prioritizeLocalStorage.checked);
        });
    })();
});





/* --------------- GLOBAL HELPER FUNCTIONS --------------- */

// Add Indentation on Enter Key / Related hooks: <hoook_Qkl3m2JJJ_0>
function addIndentationOnEnter(isIndent, event) {
    if (event.key === 'Enter') {
        event.preventDefault(); // Prevent default Enter behavior (new line)

        // Get the current cursor position
        const cursorPos = this.selectionStart;
        const value = this.value;
        const indent = isIndent ? '    ' : ''; // 4 spaces for indentation

        // Insert indentation at cursor position
        const beforeCursor = value.substring(0, cursorPos);
        const afterCursor = value.substring(cursorPos);

        this.value = beforeCursor + '\n' + indent + afterCursor;

        // Move cursor position after indentation
        this.selectionStart = this.selectionEnd = cursorPos + indent.length + 1;
    }
}

// Adjust Textarea Height / Related hooks: <hoook_Qkl3m2JJJ_0>
function adjustTextareaHeight() {
    this.style.height = 'auto'; // Reset height to auto
    this.style.height = `${this.scrollHeight}px`; // Set new height based on scrollHeight
}

// Checks if type is boolean / Related hooks: <hoook_Df2ldsoo90>
function toBoolean(value) {
    return value === "true";
}

// Cast any `value` into a type using `typeOf`
function castType(value, type, typeOfValue) {
    switch (type) {
        case "string":
            return String(value);
        case "float":
        case "number":
            return Number(value);
        case "boolean":
            return value === "true";
        case "object":
            if (typeOfValue === null) return value;
            return JSON.parse(value);
        default:
            return value;
    }
}

// Prioritizes the specific order of calbacks by the given value
function order(f, f1, f2) {
    if (f) return f1(), f2();
    return f2(), f1();
}






document.addEventListener("DOMContentLoaded", function () {
    (() => {
        // 1. Initialize FlexGridify
        // Related functions: updateDisplay, init
        const customOptions = {
            enableLogQuery: true,
            enableSmoothLoading: true,
            enableDragAndDrop: true,
            columnBreakpoints: {
                1500: 4,
                700: 3,
            },
            defaultColumnCount: 1,
            breakpointSelector: ".element",
            onBreakpointChange: updateDisplay
        }

        // >>> initialize FlexGridify, FlexGridify params, & inputs/textareas
        const [flexGridify, params] = init(customOptions);
        flexGridify.initialize(".element", params);

        // 2. Each input/textarea listens to the `Enter` keypress to handle changes
        // Related functions: handleKeyPress
        const propertyElements = document.querySelectorAll("#flexGridifyPropertiesStuck input, #flexGridifyPropertiesStuck textarea");
        propertyElements.forEach(element => {
            const property = element.id.replace(/Input|Textarea/, "");
            adjustTextareaHeight.call(element);
            // Add event listener for changes
            element.addEventListener("keypress", handleKeyPress(property, element));
        });


        /* --------------- WORKFLOW FUNCTIONS --------------- */

        // Related functions: castType
        function init(customOptions) {
            // 1. Empty Instance of `FlexGridify` + `custom options`
            const flexGridifyStatic = new FlexGridify();

            // 2. Retrieving `all the options` and binding them with `custom options`
            const combinedParams = { ...flexGridifyStatic.getDefaultOptions(), ...customOptions };
            // 3. Passing parameters via URL
            const query = new URLSearchParams(window.location.search);
            const updatedParams = { ...combinedParams };
            const isLocalStoragePriotitized = document.getElementById("prioritizeLocalStorage").checked;
            Object.entries(combinedParams).forEach(([key, defaultValue]) => {
                const queryProperty = query.get(key);
                const localStorageProperty = localStorage.getItem(key);

                // Third priority (default init value)
                let exitValue = defaultValue;

                // Initial prioritizing
                order(isLocalStoragePriotitized, () => {
                    if (queryProperty) exitValue = castType(queryProperty, typeof (defaultValue), defaultValue);
                }, () => {
                    if (localStorageProperty) exitValue = castType(localStorageProperty, typeof (defaultValue), defaultValue);
                });

                // 1. Sets input/textares element's values + special cases
                const element = document.getElementById(`${key}Input`) ?? document.getElementById(`${key}Textarea`);
                if (exitValue !== null) {
                    if (typeof exitValue === "object" && exitValue !== null) {
                        element.value = JSON.stringify(exitValue, null, 4);
                    } else if (key === "onBreakpointChange" && !queryProperty && !localStorageProperty) {
                        // TO DO
                    } else {
                        element.value = exitValue;
                    }
                }

                // 2. special cases
                switch (key) {
                    case "enableSmoothLoading":
                        // if `enableSmoothLoading` is `false` than remove mask from the flexGridify
                        if (!exitValue) {
                            document.querySelector('.element').classList.remove("flexGridify-init");
                        }
                        break;
                    case "onBreakpointChange":
                        const userFunction = new Function(exitValue);
                        exitValue = userFunction ? updateDisplay.bind(this, userFunction) : updateDisplay;
                        break;
                    case "onDragAndDropChange":
                        exitValue = typeof exitValue === "string" ? new Function("order", exitValue) : exitValue;
                        break;
                }

                updatedParams[key] = exitValue;
            });

            // Return: Instance of FlexGridify, Parameters.
            return [flexGridifyStatic, updatedParams];
        }

        // Related functions: -
        function updateDisplay(internalCallback) {
            const fontSizeElement = document.getElementById("currentFontSize");
            const breakpointElement = document.getElementById("currentBreakpoint");
            const columnAmountElement = document.getElementById("currentColumnAmount");

            fontSizeElement.textContent = getComputedStyle(document.body).fontSize;
            breakpointElement.textContent = flexGridify.getBreakpointQuery("breakpoint");
            columnAmountElement.textContent = `${flexGridify.getBreakpointQuery("columns")} ${flexGridify.getBreakpointQuery("columns") === 1 ? "column" : "columns"}`;

            // Execute additional user callback if provided
            if (internalCallback) {
                internalCallback();
            }
        }

        // Related functions: updateProperty
        function handleKeyPress(property, element) {
            return function (e) {
                if (e.key === "Enter") {
                    updateProperty(property, element);
                    element.blur();
                }
            };
        }

        // Related functions: -
        function updateProperty(property, element) {
            try {
                const propertyHandlers = {
                    // Boolean
                    enableLogQuery: (value) => toBoolean(value),               // switch-skip
                    enableResponsiveLayout: (value) => toBoolean(value),
                    enableSmoothLoading: (value) => toBoolean(value),          // switch-skip
                    enableDynamicHeight: (value) => toBoolean(value),
                    enableDragAndDrop: (value) => toBoolean(value),
                    rememberDragAndDropPosition: (value) => toBoolean(value),  // switch-skip

                    // JSON
                    dragAndDropAnimation: (value) => JSON.parse(value),        // switch-skip
                    columnBreakpoints: (value) => JSON.parse(value),

                    // Function
                    onDragAndDropChange: (value) => new Function("order", value),
                    onBreakpointChange: (value) => new Function(value),

                    // Number
                    gap: (value) => parseInt(value),
                    marginTop: (value) => parseInt(value),
                    marginBottom: (value) => parseInt(value),
                    defaultColumnCount: (value) => parseInt(value),

                    // String
                    sizeUnit: (value) => String(value),
                    breakpointSelector: (value) => String(value),
                }

                const value = propertyHandlers[property](element.value);
                flexGridify[property] = value;

                // if isDynamic is on 
                if (document.getElementById("isDynamic").checked) {
                    switch (property) {
                        case "sizeUnit":
                        case "gap":
                        case "marginTop":
                        case "marginBottom":
                        case "defaultColumnCount":
                        case "enableResponsiveLayout":
                            flexGridify.reset();
                            break;
                        case "columnBreakpoints":
                            flexGridify.resetBreakpoints();
                            flexGridify.reset();
                            break;
                        case "enableDynamicHeight":
                            value ? flexGridify.connectDynamicObservers() : flexGridify.disconnectDynamicObservers();
                            break;
                        case "enableDragAndDrop":
                            value ? flexGridify.reinitDragAndDrop() : flexGridify.cleanupDndListeners();
                            break;
                        case "breakpointSelector":
                            flexGridify.resetBreakpoints();
                            break;
                        case "onBreakpointChange":
                            flexGridify[property] = () => {
                                updateDisplay(value);
                            };
                            break;
                        case "onDragAndDropChange":
                            flexGridify[property] = value;
                            break;
                    }
                } else {
                    location.reload();
                }

                // memorize & assign
                switch (typeof value) {
                    case "object":
                        localStorage.setItem(property, JSON.stringify(value));
                        break;
                    case "function":
                        localStorage.setItem(property, element.value);
                        break;
                    default:
                        localStorage.setItem(property, value);
                        break;
                }

                // remove an error
                errorHandler(element, null, false);

            } catch (error) {

                // throw an error
                errorHandler(element, error.name + ": " + error.message);
                console.log("handled error");
                console.error(error);
            }

        }

        // Related functions: -
        function errorHandler(element, error = null, isError = true) {
            if (isError) {
                const inputLabel = element.closest("label.modern-blox-wrapper");
                inputLabel.classList.add("animate-shaking");
                inputLabel.classList.add("tooltip-target");

                const tooltipElement = document.createElement("span");
                tooltipElement.className = "b-text b-text_08 tooltip tooltip-error";
                tooltipElement.innerHTML = error ?? "Error occured.";
                inputLabel.appendChild(tooltipElement);
                element.classList.add("input-error");

                setTimeout(() => {
                    inputLabel.classList.remove("animate-shaking");
                }, 500);
                setTimeout(() => {
                    tooltipElement.style.opacity = 0;
                }, 4500);
                setTimeout(() => {
                    inputLabel.removeChild(tooltipElement);
                    inputLabel.classList.remove("tooltip-target");
                }, 5000);
            } else {
                element.classList.remove("input-error");
            }
        }

    })();
});