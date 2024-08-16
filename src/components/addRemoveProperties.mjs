function addProperties(element, properties) {
    Object.entries(properties).forEach(([key, value]) => {
        element.style.setProperty(key, value);
    });
}

function removeProperties(element, properties) {
    for (const property of properties) {
        element.style.removeProperty(property);
    }
}

export { addProperties, removeProperties };