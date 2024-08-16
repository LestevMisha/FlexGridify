// 1. Width x Height Observer, callback firing on the breakpoint query
const currentDimensions = document.getElementById("currentDimensions");
const flexGridifyElement = document.querySelector(".element");

const dimensionsObserver = new ResizeObserver(entries => {
    for (const entry of entries) {
        const target = entry.target;
        currentDimensions.textContent = `${target.clientWidth}x${target.clientHeight}px`;
    }
});
dimensionsObserver.observe(flexGridifyElement);

// 3. Send Button Event Handling
const sendBtns = document.querySelectorAll(".send-btn");
sendBtns.forEach(sendBtn => {
    sendBtn.addEventListener("click", function () {
        const relativeInput = sendBtn.closest("label.modern-blox-wrapper").querySelector("input, textarea");

        // Simulate input change
        const event = new KeyboardEvent('keypress', {
            key: 'Enter',
            code: 'Enter',
            keyCode: 13,
            which: 13,
            bubbles: true,
            cancelable: true
        });
        relativeInput.dispatchEvent(event);

        // Simulate user reaction
        setTimeout(() => {
            relativeInput.blur();
        }, 1);
    });
});

// 4. Textarea Handling: Adjust Height and Indentation
const textareas = document.querySelectorAll("textarea");

textareas.forEach(textarea => {
    const textareaIndent = textarea.getAttribute("data-textarea-indent");

    textarea.addEventListener('keyup', adjustTextareaHeight);
    if (textareaIndent) {
        textarea.addEventListener('keydown', addIndentationOnEnter.bind(textarea, true));
    } else {
        textarea.addEventListener('keydown', addIndentationOnEnter.bind(textarea, false));
    }
});

// Adjust Textarea Height
function adjustTextareaHeight() {
    this.style.height = 'auto'; // Reset height to auto
    this.style.height = `${this.scrollHeight}px`; // Set new height based on scrollHeight
}

// Add Indentation on Enter Key
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