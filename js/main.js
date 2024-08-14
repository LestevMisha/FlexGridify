// Initialize FlexGridify
const flexGridify = new FlexGridify(".element", {
    logQuery: true,
    unit: "em",
    smooth: true,
    responsive: true,
    breakpointColumns: {
        "min-width: 1500px": 3,
        "min-width: 700px": 2,
    },
    defaultColumnAmount: 1,
    gap: 1,
    breakpointSelector: ".element",
    breakpointCallback: updateDisplay
});

// Update display elements
function updateDisplay(internalCallback) {
    const fontSizeElement = document.getElementById("currentFontSize");
    const breakpointElement = document.getElementById("currentBreakpoint");
    const columnAmountElement = document.getElementById("currentColumnAmount");

    fontSizeElement.textContent = getComputedStyle(document.body).fontSize;
    breakpointElement.textContent = flexGridify.getCurrentBreakpointQuery();
    columnAmountElement.textContent = `${flexGridify.getColumnCount()} ${flexGridify.getColumnCount() === 1 ? "column" : "columns"}`;

    // Execute additional user callback if provided
    if (internalCallback) {
        internalCallback();
    }
}

// Initialize and handle property changes
const propertyElements = document.querySelectorAll("#flexGridifyPropertiesStuck input, #flexGridifyPropertiesStuck textarea");
propertyElements.forEach(element => {
    const property = element.id.replace(/Input|Textarea/, "");

    // Set initial value
    setInitialValue(property, element);

    // Add event listener for changes
    element.addEventListener("keypress", handleKeyPress(property, element));
});

// Set initial value based on property type
function setInitialValue(property, element) {
    if (typeof flexGridify[property] === "object") {
        element.value = JSON.stringify(flexGridify[property], null, 4);
    } else if (typeof flexGridify[property] === "function") {
        element.value = "console.log(\"Press 'Enter', open Dev Tool (F12), resize the flexGridify - and see the result.\")";
    } else {
        element.value = flexGridify[property];
    }
    adjustTextareaHeight.call(element);
}

// Handle keypress events for properties
function handleKeyPress(property, element) {
    return function (e) {
        if (e.key === "Enter") {
            updateProperty(property, element);
            element.blur();
        }
    };
}

// Update property and apply changes
function updateProperty(property, element) {
    const value = property === "breakpointColumns" || property === "breakpointCallback"
        ? parseValue(property, element.value)
        : property === "dynamicHeight"
            ? element.value === "true"
            : property === "logQuery" || property === "responsive"
                ? element.value === "true"
                : property === "gap" || property === "marginTop" || property === "marginBottom" || property === "defaultColumnAmount"
                    ? parseInt(element.value)
                    : element.value;

    flexGridify[property] = value;

    switch (property) {
        case "unit":
        case "smooth":
        case "gap":
        case "marginTop":
        case "marginBottom":
            flexGridify.applyGap();
            flexGridify.applyMargins();
            flexGridify.applyHeightChange();
            break;
        case "defaultColumnAmount":
        case "responsive":
            flexGridify.reset();
            break;
        case "breakpointColumns":
            flexGridify.resetBreakpoints();
            flexGridify.reset();
            break;
        case "dynamicHeight":
            value ? flexGridify.connectDynamicObservers() : flexGridify.disconnectDynamicObservers();
            break;
        case "breakpointSelector":
            flexGridify.resetBreakpoints();
            break;
        case "breakpointCallback":
            FlexGridify[property] = function () {
                updateDisplay();
                eval(element.value);
            };
            break;
    }
}

// Parse JSON value if applicable
function parseValue(property, value) {
    return property === "breakpointColumns" ? JSON.parse(value) : value;
}