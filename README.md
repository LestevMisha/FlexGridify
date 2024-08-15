# FlexGridify

FlexGridify is a zero-dependency library built with CSS flexbox. It provides an efficient solution for creating cascading grid layouts with minimal overhead.

Inspired by [Gilberton's FlexMasonry](https://github.com/gilbitron/flexmasonry) library and his implementation of JavaScript-based breakpoint handler. And [Tobias Ahlin's article](https://tobiasahlin.com/blog/masonry-with-css/) on using `flex`, `:nth-child()`, and `order` for pure CSS masonry layouts.

## Features

- **Compact**: Only 20KB of JS and CSS
- **Efficient**: Utilizes CSS flexbox for fast and responsive layouts
- **Adaptive**: Configurable breakpoints for column adjustments
- **Masonry Effect**: Stacks elements with `height: fit-content`
- **Adaptiveness**: Implements `ResizeObserver` for auto height change

[View Demo](https://lestevmisha.github.io/FlexGridify/)

## Installation

```
npm install flexgridify
```

```javascript
<script src="https://unpkg.com/flexgridify/dist/bundle.js"></script>
```
## Quick Start

To quickly implement FlexGridify, copy and paste one of the code examples below into your HTML file. Each setup initializes a grid with custom child elements using FlexGridify.

### 1. Using Pure HTML, CSS & JS

This approach is universal and works for all use cases.

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>FlexGridify</title>
    <style>
        .child {
            height: 3em;
            background-color: #f00;
        }
        .child:nth-child(1) { height: 5em; }
        .child:nth-child(2) { height: 8em; }
    </style>
</head>
<body>
    <div class="flexgridify">
        <div class="child">1</div>
        <div class="child">2</div>
        <div class="child">3</div>
        <div class="child">4</div>
        <div class="child">5</div>
        <div class="child">6</div>
    </div>

    <script src="https://unpkg.com/flexgridify/dist/bundle.js"></script>
    <script>
        const flexGridify = new FlexGridify(".flexgridify", {
            breakpointSelector: ".flexgridify",
        });
    </script>
</body>
</html>
```

### 2. Using HTML with Node Modules

Use it if you ran `npm install flexgridify`. This is just a showcase of some quick start methods you can use. I personally would not recommend to use it in production, but since it's 1 of the possible quick start options I included it.

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>FlexGridify</title>
    <style>
        .child {
            height: 3em;
            background-color: #f00;
        }
        .child:nth-child(1) { height: 5em; }
        .child:nth-child(2) { height: 8em; }
    </style>
</head>
<body>
    <div class="flexgridify">
        <div class="child">1</div>
        <div class="child">2</div>
        <div class="child">3</div>
        <div class="child">4</div>
        <div class="child">5</div>
        <div class="child">6</div>
    </div>

    <script src="./node_modules/flexgridify/dist/bundle.js"></script>
    <script>
        const flexGridify = new FlexGridify(".flexgridify", {
            breakpointSchildector: ".flexgridify",
        });
    </script>
</body>
</html>
```

### 3. Flash of Unstyled Content Problem

It's common for JavaScript to manipulate the HTML and CSS of a page as it loads, and sometimes this can cause a visible flash of unstyled or partially styled content, known as a Flash of Unstyled Content (FOUC).

To improve the user experience and hide JavaScript initialization, you should:

 1. Add `<link rel="stylesheet" href="./src/main.css">` in the header or add into your styles these 4 lines of code:
```css
.flexGridify.flexGridify_init {
    opacity: 0;
    visibility: hidden;
}
```

2. Add `flexGridify_init` class to your flexGridify element.
3. Finally set `smooth` parameter to `true` and here we go.

```javascript
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>FlexGridify</title>
    <style>
        .child {
            height: 3em;
            background-color: #f00;
        }
        .child:nth-child(1) { height: 5em; }
        .child:nth-child(2) { height: 8em; }
    </style>
    <link rel="stylesheet" href="./src/main.css">
</head>
<body>
    <div class="flexGridify flexGridify_init">
        <div class="child">1</div>
        <div class="child">2</div>
        <div class="child">3</div>
        <div class="child">4</div>
        <div class="child">5</div>
        <div class="child">6</div>
    </div>

    <script src="./node_modules/flexgridify/dist/bundle.js"></script>
    <script>
        const flexGridify = new FlexGridify(".flexGridify", {
            breakpointSelector: ".flexGridify",
            smooth: true, // reveals it only when initialized
        });
    </script>
</body>
</html>
```


### 4. Using ES6 Syntax

Note that you must use a web server for this approach as ES6 modules require the http protocol.

> [!IMPORTANT]
> See more here [ES6 docs](https://www.rfc-editor.org/rfc/rfc6454), if ran into issue check this [discussion](https://stackoverflow.com/questions/10752055/cross-origin-requests-are-only-supported-for-http-error-when-loading-a-local).

1. Clone the repo.
2. Move the src folder into your working directory.
3. Open src/index.js and remove the 2nd line of code (`import * as css from "./main.css";`).
4. Copy the code below.

```javascript
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>FlexGridify</title>
    <style>
        .child {
            height: 3em;
            background-color: #f00;
        }
        .child:nth-child(1) { height: 5em; }
        .child:nth-child(2) { height: 8em; }
    </style>
    <link rel="stylesheet" href="./src/main.css">
</head>
<body>
    <div class="flexGridify flexGridify_init">
        <div class="child">1</div>
        <div class="child">2</div>
        <div class="child">3</div>
        <div class="child">4</div>
        <div class="child">5</div>
        <div class="child">6</div>
    </div>

    <!-- Setup using ES6 syntax -->
    <script type="module">
        import FlexGridify from "./src/index.js";
        const flexGridify = new FlexGridify(".flexGridify", {
            breakpointSelector: ".flexGridify",
            defaultColumnAmount: 2,
            responsive: false,
            smooth: true, // reveals it only when initialized
        });
    </script>
</body>
</html>
```

## Usage

Create a new instance of `FlexGridify` by specifying a selector for the grid container and an optional object to customize the grid settings.

```javascript
const flexGrid = new FlexGridify(".your-selector", {
    gap: 1.5,
    marginTop: 1,
    marginBottom: 1,
    defaultColumnAmount: 2,
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
    breakpointCallback: () => console.log("Breakpoint reached!")
});
```

## Options

- **logQuery**: (boolean) — Logs the current breakpoint query if true.
- **unit**: (string) — Unit of measurement for the gap and margins, defaults to em.
- **gap**: (number) — Space between grid items.
- **marginTop**: (number) — Top margin for grid items.
- **marginBottom**: (number) — Bottom margin for grid items.
- **defaultColumnAmount**: (number) — Default number of columns when no media query matches.
- **responsive**: (boolean) — If true, the grid layout adjusts to different breakpoints.
- **breakpointColumns**: (object) — Specifies the number of columns for different media query breakpoints. (Uses only `min-width`)
- **dynamicHeight**: (boolean) — If true, the grid items' height adjusts dynamically based on their content.
- **breakpointSelector**: (string) — CSS selector to determine breakpoint based on element width.
- **breakpointCallback**: (function) — Callback function executed when a breakpoint is reached.

## Methods

- **getCurrentBreakpointQuery()**  
  Returns the current media query breakpoint based on the number of columns.

- **applyMarginTop()**  
  Applies the top margin to each child element of the grid.

- **applyMarginBottom()**  
  Applies the bottom margin to each child element of the grid.

- **applyMargins()**  
  Applies both top and bottom margins to each child element of the grid.

- **applyHeightChange(numCols)**  
  Adjusts the height of the grid container based on the current number of columns.

- **getColumnCount()**  
  Returns the current number of columns based on the media queries and responsive settings.

- **applyColumnClass(numCols)**  
  Updates the CSS class on the grid container to reflect the current column count.

- **applyColumnBreaks(numCols)**  
  Adds or removes column breaks in the grid layout.

- **applyGap(numCols)**  
  Sets the gap between the columns and rows in the grid.

- **reset()**  
  Resets the grid layout, reapplying all styles and settings.

- **disconnectDynamicObservers()**  
  Removes all dynamic observers from the grid items.

- **connectDynamicObservers()**  
  Adds dynamic observers to the grid items for height adjustments.

- **resetBreakpoints()**  
  Resets the breakpoint listeners based on the current settings.


## FAQ
> Why not just use pure CSS?

Pure CSS can achieve similar layouts, using JavaScript with FlexGridify gives these key advantages:

* Dynamic Height: FlexGridify dynamically calculates the masonry container’s height, adjusting to different layouts and content sizes.
* Break Elements: It automatically manages "break" elements required for correct functioning based on the number of columns.
* Responsive Design: FlexGridify allows for varying numbers of columns at different breakpoints, enhancing flexibility and responsiveness.

In short, JavaScript provides flexebility and adaptability that CSS alone cannot achieve.

## Credits

[Gilbert Pellegrom](https://gilbitron.me), [Tobias Ahlin's article](https://tobiasahlin.com/blog/masonry-with-css/)
