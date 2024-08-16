function swapElements(e1, e2) {
    const e1NS = e1.nextElementSibling;

    // Checks if element2 (e2) is next to eleemnt1 (e1)
    if (e1NS === e2) {
        return e2.parentNode.insertBefore(e2, e1);
    }

    // Checks if element2 (e2) is previous to the element1 (e1)
    if (e1.previousElementSibling === e2) {
        return e2.parentNode.insertBefore(e1, e2);
    }

    e2.parentNode.insertBefore(e1, e2);
    e1.parentNode.insertBefore(e2, e1NS);
}

export default swapElements;