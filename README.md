# FlexGridify / Drag and Drop

FlexGridify is a zero-dependency library built with CSS flexbox. It provides an efficient solution for creating cascading grid layouts with minimal overhead and implements **Drag and Drop** functionality.

Inspired by [Gilberton's FlexMasonry](https://github.com/gilbitron/flexmasonry) library and his implementation of JavaScript-based breakpoint handler. And [Tobias Ahlin's article](https://tobiasahlin.com/blog/masonry-with-css/) on using `flex`, `:nth-child()`, and `order` for pure CSS masonry layouts.

## Features

- **Drag and Drop**: Items can be positioned in a unique order.
- **Compact**: Less than 30KB of JS and CSS
- **Efficient**: Utilizes CSS flexbox for fast and responsive layouts
- **Adaptive**: Configurable breakpoints for column adjustments.
- **Dynamic Height:** Stacks elements with `height: fit-content`

[View Demo](https://lestevmisha.github.io/FlexGridify/)

## Installation

```
npm install flexgridify --omit=dev
```

```javascript
<script src="https://unpkg.com/flexgridify/dist/bundle.js"></script>
```
## Quick Start
To quickly implement FlexGridify, copy and paste one of the code examples below into your HTML file. Each setup initializes a grid with custom child elements using FlexGridify.

### ProSetup 🔥

* *1. Open Dropdown*

* *2. Create index.html on your PC*

* *3. Copy and paste 3 snippets into the index.html*

* *4. The end. Open the file in browser*

  <details>
    <summary>
        <u><i>Code Snippet Dropdown</i></u>
    </summary>
      <br />
      
   ```html
    <!DOCTYPE html>
    <html lang="en">

    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>FlexGridify</title>
        <link rel="icon" type="image/x-icon" href="https://lestevmisha.github.io/FlexGridify/img/logo.png">
        <link rel="stylesheet" href="https://lestevmisha.github.io/FlexGridify/main.css">
    </head>

    <body>
   ```

    <details>
    <summary>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;div class="container"&gt;&lt;/div&gt;
    </summary>
    <br />
      
   ```html
      <div class="container">

        <div class="flex h gap mb-3">
            <div class="flex v w50 mob">
                <div class="flex h gap align mob">
                    <img class="logo" src="https://lestevmisha.github.io/FlexGridify/img/logo.png" alt="logo">
                    <h1 class="tcmob">FlexGridify <span class="b-text b-text_grey-dark">2024</span></h1>
                </div>
                <div class="b-text b-text_grey-dark tcmob mt-05">
                    FlexGridify is a responsive flex layout library that dynamically adjusts column count and spacing
                    for flexible, adaptive designs. Use the resize button in the bottom left corner to drive.
                </div>
            </div>
        </div>

        <div class="flex h gap gap_3_mob mob_reverse">
            <div class="flex v gap w25 mob">

                <div class="flex v gap">
                    <div class="flex h gap">
                        <a class="flex h align fit v1 tooltip-target" href="https://github.com/LestevMisha/FlexGridify"
                            target="_blank">
                            <div class="b-text b-text_08 b-text_grey-dark">
                                Documentation
                            </div>
                            <img src="https://lestevmisha.github.io/FlexGridify/img/arrow-right.svg" alt="arrow-right"
                                class="doc-btn">
                            <span class="b-text b-text_08 tooltip">Opens GitHub Docs</span>
                        </a>
                        <!-- Related hooks: <hoook_WsoUo97_0J> -->
                        <div id="reset-btn" class="flex h align fit v1 tooltip-target">
                            <div class="b-text b-text_08 b-text_grey-dark">
                                Reset
                            </div>
                            <img src="https://lestevmisha.github.io/FlexGridify/img/redo.svg" alt="redo"
                                class="reset-btn">
                            <span class="b-text b-text_08 tooltip">Clears localStorage</span>
                        </div>
                    </div>
                    <div class="flex h fit align gap_05 tooltip-target">
                        <!-- Related hooks: <hoook_Df2ldsoo90> -->
                        <input type="checkbox" name="isDynamic" id="isDynamic" checked>
                        <label class="b-text b-text_08" for="isDynamic">Dynamic</label>
                        <span class="b-text b-text_08 tooltip">
                            Check to apply changes dynamically
                            <br />
                            as you type and press `Enter`. Uncheck
                            <br />
                            to reload the page for each change.
                        </span>

                    </div>
                    <div class="flex h fit align gap_05 tooltip-target">
                        <!-- Related hooks: <hoook_QGd430pod_w> -->
                        <input type="checkbox" name="prioritizeLocalStorage" id="prioritizeLocalStorage">
                        <label class="b-text b-text_08" for="prioritizeLocalStorage">Prioritize localStorage</label>
                        <span class="b-text b-text_08 tooltip">
                            Enable this option to prioritize localStorage
                            <br />
                            over URL query parameters. If you change options
                            <br />
                            from the query, they will be reset on reload.
                            <br />
                            Use this to ensure localStorage takes precedence.
                        </span>

                    </div>
                </div>


                <div class="relative">
                    <div class="flex min-h-20em v y-scroll" id="flexGridifyPropertiesStuck">

                        <!-- STRING -->
                        <div class="b-text b-text_grey-dark mb-1 mt-1"><i>String <span
                                    class="b-text b-text_08 b-text_grey-dark v1">Type</span></i></div>
                        <div class="flex v mb-1">
                            <label class="modern-blox-wrapper">
                                <input class="modern-blox v3" id="sizeUnitInput">
                                <div class="modern-blox-label">
                                    sizeUnit
                                    <span class="hint">(str)</span>
                                </div>
                                <img src="https://lestevmisha.github.io/FlexGridify/img/arrow-right.svg"
                                    alt="arrow-right" class="send-btn">
                            </label>
                            <div class="b-text b-text_08 b-text_grey-dark v1 mt-05">
                                Specifies the unit of measurement (`px` or `em`) for `gap`, `marginTop`, and
                                `marginBottom`.
                            </div>
                        </div>
                        <div class="flex v mb-1">
                            <label class="modern-blox-wrapper">
                                <input class="modern-blox v3" id="breakpointSelectorInput">
                                <div class="modern-blox-label">
                                    breakpointSelector
                                    <span class="hint">(str)</span>
                                </div>
                                <img src="https://lestevmisha.github.io/FlexGridify/img/arrow-right.svg"
                                    alt="arrow-right" class="send-btn">
                            </label>
                            <div class="b-text b-text_08 b-text_grey-dark v1 mt-05">
                                Sets an element to observe for media queries (columnBreakpoints), defaults to the main
                                screen (`window`).
                            </div>
                        </div>


                        <!-- NUMBER -->
                        <div class="b-text b-text_grey-dark mb-1 mt-1"><i>Number <span
                                    class="b-text b-text_08 b-text_grey-dark v1">Type</span></i></div>
                        <div class="flex v mb-1">
                            <label class="modern-blox-wrapper">
                                <input class="modern-blox v3" id="gapInput">
                                <div class="modern-blox-label">
                                    gap
                                    <span class="hint">(num)</span>
                                </div>
                                <img src="https://lestevmisha.github.io/FlexGridify/img/arrow-right.svg"
                                    alt="arrow-right" class="send-btn">
                            </label>
                            <div class="b-text b-text_08 b-text_grey-dark v1 mt-05">
                                Defines the space between elements within FlexGridify.
                            </div>
                        </div>
                        <div class="flex v mb-1">
                            <label class="modern-blox-wrapper">
                                <input class="modern-blox v3" id="marginTopInput">
                                <div class="modern-blox-label">
                                    marginTop
                                    <span class="hint">(num)</span>
                                </div>
                                <img src="https://lestevmisha.github.io/FlexGridify/img/arrow-right.svg"
                                    alt="arrow-right" class="send-btn">
                            </label>
                            <div class="b-text b-text_08 b-text_grey-dark v1 mt-05">
                                Sets the top margin for each element within FlexGridify.
                            </div>
                        </div>
                        <div class="flex v mb-1">
                            <label class="modern-blox-wrapper">
                                <input class="modern-blox v3" id="marginBottomInput">
                                <div class="modern-blox-label">
                                    marginBottom
                                    <span class="hint">(num)</span>
                                </div>
                                <img src="https://lestevmisha.github.io/FlexGridify/img/arrow-right.svg"
                                    alt="arrow-right" class="send-btn">
                            </label>
                            <div class="b-text b-text_08 b-text_grey-dark v1 mt-05">
                                Sets the bottom margin for each element within FlexGridify.
                            </div>
                        </div>
                        <div class="flex v mb-1">
                            <label class="modern-blox-wrapper">
                                <input class="modern-blox v3" id="defaultColumnCountInput">
                                <div class="modern-blox-label">
                                    defaultColumnCount
                                    <span class="hint">(num)</span>
                                </div>
                                <img src="https://lestevmisha.github.io/FlexGridify/img/arrow-right.svg"
                                    alt="arrow-right" class="send-btn">
                            </label>
                            <div class="b-text b-text_08 b-text_grey-dark v1 mt-05">
                                Specifies the default number of columns if no `columnBreakpoints` match or `responsive`
                                is
                                set to false.
                            </div>
                        </div>


                        <!-- JSON -->
                        <div class="b-text b-text_grey-dark mb-1 mt-1"><i>JSON <span
                                    class="b-text b-text_08 b-text_grey-dark v1">Type</span></i></div>
                        <div class="flex v mb-1">
                            <label class="modern-blox-wrapper">
                                <!-- Related hooks: <hoook_Qkl3m2JJJ_0> (for every element) -->
                                <textarea class="modern-blox modern-blox_textarea v3" id="columnBreakpointsTextarea"
                                    data-textarea-indent="true"></textarea>
                                <div class="modern-blox-label">
                                    columnBreakpoints
                                    <span class="hint">(obj)</span>
                                </div>
                                <img src="https://lestevmisha.github.io/FlexGridify/img/arrow-right.svg"
                                    alt="arrow-right" class="send-btn">
                            </label>
                            <div class="b-text b-text_08 b-text_grey-dark v1 mt-05">
                                Defines media queries and corresponding column counts for FlexGridify, influenced by
                                `breakpointSelector` and `enableResponsiveLayout`.
                            </div>
                        </div>
                        <div class="flex v mb-1">
                            <label class="modern-blox-wrapper">
                                <textarea class="modern-blox modern-blox_textarea v3" id="dragAndDropAnimationTextarea"
                                    data-textarea-indent="true"></textarea>
                                <div class="modern-blox-label">
                                    dragAndDropAnimation
                                    <span class="hint">(obj)</span>
                                </div>
                                <img src="https://lestevmisha.github.io/FlexGridify/img/arrow-right.svg"
                                    alt="arrow-right" class="send-btn">
                            </label>
                            <div class="b-text b-text_08 b-text_grey-dark v1 mt-05">
                                Defines animation properties for drag-and-drop functionality.
                            </div>
                        </div>


                        <!-- FUNCTION -->
                        <div class="b-text b-text_grey-dark mb-1 mt-1"><i>Function <span
                                    class="b-text b-text_08 b-text_grey-dark v1">Type</span></i></div>
                        <div class="flex v mb-1">
                            <label class="modern-blox-wrapper">
                                <textarea class="modern-blox modern-blox_textarea v3" id="onBreakpointChangeTextarea"
                                    data-textarea-indent="false">console.log("Press 'Enter', open Dev Tool (F12), resize the flexGridify - and see the result.");</textarea>
                                <div class="modern-blox-label">
                                    onBreakpointChange
                                    <span class="hint">(code/string)</span>
                                </div>
                                <img src="https://lestevmisha.github.io/FlexGridify/img/arrow-right.svg"
                                    alt="arrow-right" class="send-btn">
                            </label>
                            <div class="b-text b-text_08 b-text_grey-dark v1 mt-05">
                                Triggers a callback function every time `columnBreakpoints` (media query) is matched.
                            </div>
                        </div>
                        <div class="flex v mb-1">
                            <label class="modern-blox-wrapper">
                                <textarea class="modern-blox modern-blox_textarea v3" id="onDragAndDropChangeTextarea"
                                    data-textarea-indent="false">console.log("Current order: ", order);</textarea>
                                <div class="modern-blox-label">
                                    onDragAndDropChange
                                    <span class="hint">(code/string)</span>
                                </div>
                                <img src="https://lestevmisha.github.io/FlexGridify/img/arrow-right.svg"
                                    alt="arrow-right" class="send-btn">
                            </label>
                            <div class="b-text b-text_08 b-text_grey-dark v1 mt-05">
                                Triggers a callback function when an element is dropped.
                            </div>
                        </div>


                        <!-- BOOLEAN -->
                        <div class="b-text b-text_grey-dark mb-1 mt-1"><i>Boolean <span
                                    class="b-text b-text_08 b-text_grey-dark v1">Type</span></i></div>
                        <div class="flex v mb-1">
                            <label class="modern-blox-wrapper">
                                <input class="modern-blox v3" id="enableResponsiveLayoutInput">
                                <div class="modern-blox-label">
                                    enableResponsiveLayout
                                    <span class="hint">(bool)</span>
                                </div>
                                <img src="https://lestevmisha.github.io/FlexGridify/img/arrow-right.svg"
                                    alt="arrow-right" class="send-btn">
                            </label>
                            <div class="b-text b-text_08 b-text_grey-dark v1 mt-05">
                                Disables `columnBreakpoints` (media queries).
                            </div>
                        </div>
                        <div class="flex v mb-1">
                            <label class="modern-blox-wrapper">
                                <input class="modern-blox v3" id="enableDragAndDropInput">
                                <div class="modern-blox-label">
                                    enableDragAndDrop
                                    <span class="hint">(bool)</span>
                                </div>
                                <img src="https://lestevmisha.github.io/FlexGridify/img/arrow-right.svg"
                                    alt="arrow-right" class="send-btn">
                            </label>
                            <div class="b-text b-text_08 b-text_grey-dark v1 mt-05">
                                Enables drag-and-drop (DND) functionality.
                            </div>
                        </div>
                        <div class="flex v mb-1">
                            <label class="modern-blox-wrapper">
                                <input class="modern-blox v3" id="rememberDragAndDropPositionInput">
                                <div class="modern-blox-label">
                                    rememberDragAndDropPosition
                                    <span class="hint">(bool)</span>
                                </div>
                                <img src="https://lestevmisha.github.io/FlexGridify/img/arrow-right.svg"
                                    alt="arrow-right" class="send-btn">
                            </label>
                            <div class="b-text b-text_08 b-text_grey-dark v1 mt-05">
                                Saves the position of elements when their order changes.
                            </div>
                        </div>
                        <div class="flex v mb-1">
                            <label class="modern-blox-wrapper">
                                <input class="modern-blox v3" id="enableDynamicHeightInput">
                                <div class="modern-blox-label">
                                    enableDynamicHeight
                                    <span class="hint">(bool)</span>
                                </div>
                                <img src="https://lestevmisha.github.io/FlexGridify/img/arrow-right.svg"
                                    alt="arrow-right" class="send-btn">
                            </label>
                            <div class="b-text b-text_08 b-text_grey-dark v1 mt-05">
                                Automatically adjusts the height when child elements change size within FlexGridify.
                            </div>
                        </div>
                        <div class="flex v mb-1">
                            <label class="modern-blox-wrapper">
                                <input class="modern-blox v3" id="enableSmoothLoadingInput">
                                <div class="modern-blox-label">
                                    enableSmoothLoading
                                    <span class="hint">(bool)</span>
                                </div>
                                <img src="https://lestevmisha.github.io/FlexGridify/img/arrow-right.svg"
                                    alt="arrow-right" class="send-btn">
                            </label>
                            <div class="b-text b-text_08 b-text_grey-dark v1 mt-05">
                                Addresses the
                                <a class="b-text b-text_grey-dark" target="_blank"
                                    href="https://github.com/LestevMisha/FlexGridify?tab=readme-ov-file#3-flash-of-unstyled-content-problem">FOUC</a>
                                (Flash of Unstyled Content) problem.
                            </div>
                        </div>
                        <div class="flex v mb-5">
                            <label class="modern-blox-wrapper">
                                <input class="modern-blox v3" id="enableLogQueryInput">
                                <div class="modern-blox-label">
                                    enableLogQuery
                                    <span class="hint">(bool)</span>
                                </div>
                                <!-- Related hooks: <hoook_Asd4O68FdH> (for every element) -->
                                <img src="https://lestevmisha.github.io/FlexGridify/img/arrow-right.svg"
                                    alt="arrow-right" class="send-btn">
                            </label>
                            <div class="b-text b-text_08 b-text_grey-dark v1 mt-05">
                                Logs breakpoints to the console when resizing FlexGridify, if set to true.
                            </div>
                        </div>

                    </div>

                    <div class="fader top"></div>
                    <div class="fader btm"></div>
                </div>

            </div>

            <div class="flex v gap flex_light-border-left mob">

                <div class="flex h gap_05 mob">
                    <div class="b-text b-text_08 b-text_grey-dark v1">
                        Width x Height:
                        <!-- Related hooks: <hoook_Hg5Od206sa> -->
                        <span id="currentDimensions">-</span>
                    </div>
                    <div class="b-text b-text_08 b-text_grey-dark v1">
                        Breakpoint:
                        <span id="currentBreakpoint">-</span>
                    </div>
                    <div class="flex h gap">
                        <div class="b-text b-text_08 b-text_grey-dark v1">
                            Column Amount:
                            <span id="currentColumnAmount">-</span>
                        </div>
                        <div class="b-text b-text_08 b-text_grey-dark v1">
                            Font-size:
                            <span id="currentFontSize">-</span>
                        </div>
                    </div>
                </div>

                <!-- Related hooks: <hoook_Hg5Od206sa> -->
                <div class="element flexGridify flexGridify-init">
                    <div class="flex v ds-row">
                        <div class="back_num">1</div>
                        <div class="b-text b-text_08 emphasize crystal-blue">
                            Remember the Sabbath day, and keep it holy. Six days you shall labor and do all your work.
                            But the seventh day is a sabbath to the Lord your God; you shall not do any work
                        </div>
                    </div>

                    <label class="modern-blox-wrapper">
                        <div class="back_num">2</div>
                        <div class="modern-blox">
                            <div class="b-text b-text_grey-dark">
                                Whoever pursues righteousness and love finds life, prosperity and
                                honor.
                            </div>
                            <div class="modern-blox-label">Proverbs 21:21</div>
                        </div>
                    </label>

                    <label class="modern-blox-wrapper">
                        <div class="back_num">3</div>
                        <div class="modern-blox">
                            <div class="b-text b-text_grey-dark">
                                I sought the LORD, and He answered me and delivered me from all my fears.
                                <br />
                                Those who look to Him are radiant, and their faces shall never be ashamed.
                                <br /><br />
                                Oh, taste and see that the LORD is good!
                                Blessed is the man who takes refuge in Him!
                            </div>
                            <div class="modern-blox-label">Psalm 34:4–5, 8</div>
                        </div>
                    </label>

                    <label class="modern-blox-wrapper">
                        <div class="back_num">4</div>
                        <div class="modern-blox">
                            <div class="b-text b-text_grey-dark">
                                I have told you these things, so that in me you may have peace. In this world you
                                will have trouble. But take heart! I have overcome the world.
                            </div>
                            <div class="modern-blox-label">John 16:33</div>
                        </div>
                    </label>

                    <label class="modern-blox-wrapper">
                        <div class="back_num">5</div>
                        <div class="modern-blox">
                            <div class="b-text b-text_grey-dark">
                                A friend loves at all times, and a brother is born for a time of adversity.
                            </div>
                            <div class="modern-blox-label">Proverbs 17:17</div>
                        </div>
                    </label>

                    <label class="modern-blox-wrapper">
                        <div class="back_num">6</div>

                        <div class="modern-blox">
                            <div class="b-text b-text_grey-dark">
                                As the deer pants for the water brooks, So pants my soul for You, O God.
                            </div>
                            <div class="modern-blox-label">Psalm 42:1</div>
                        </div>
                    </label>

                    <label class="modern-blox-wrapper">
                        <div class="back_num">7</div>

                        <div class="modern-blox">
                            <div class="b-text b-text_grey-dark">
                                I have stored up your word in my heart, that I might not sin against you.
                            </div>
                            <div class="modern-blox-label">Psalm 119:11</div>
                        </div>
                    </label>

                    <label class="modern-blox-wrapper">
                        <div class="back_num">8</div>
                        <div class="modern-blox">
                            <div class="b-text b-text_grey-dark">
                                When I am afraid, I put my trust in you.
                            </div>
                            <div class="modern-blox-label">Psalms 56:3</div>
                        </div>
                    </label>

                    <label class="modern-blox-wrapper">
                        <div class="back_num">9</div>
                        <div class="modern-blox">
                            <div class="b-text b-text_grey-dark">
                                So we do not lose heart. Though our outer self is wasting away, our inner self is
                                being renewed day by day.
                                <br /><br />
                                For this light momentary affliction is preparing for us an eternal weight of
                                glory beyond all comparison, as we look not to the things that are seen but to the
                                things that are unseen.
                                <br /><br />
                                For the things that are seen are transient, but the things that are unseen are
                                eternal.
                            </div>
                            <div class="modern-blox-label">2 Corinthians 4:16-18</div>
                        </div>
                    </label>

                    <label class="modern-blox-wrapper">
                        <div class="back_num">10</div>
                        <div class="modern-blox">
                            <div class="b-text b-text_grey-dark">
                                The steadfast love of the Lord never ceases; his mercies never come to an end; they
                                are new every morning; great is your faithfulness.
                            </div>
                            <div class="modern-blox-label">Lamentations 3:22-23</div>
                        </div>
                    </label>

                    <label class="modern-blox-wrapper">
                        <div class="back_num">11</div>
                        <div class="modern-blox">
                            <div class="b-text b-text_grey-dark">
                                Trust in the Lord with all your heart, and do not lean on your own understanding. In
                                all your ways acknowledge him, and he will make straight your paths.
                            </div>
                            <div class="modern-blox-label">Proverbs 3:5-6</div>
                        </div>
                    </label>

                    <label class="modern-blox-wrapper">
                        <div class="back_num">12</div>
                        <div class="modern-blox">
                            <div class="b-text b-text_grey-dark">
                                For I know the plans I have for you, declares the Lord, plans for welfare and not
                                for evil, to give you a future and a hope.
                            </div>
                            <div class="modern-blox-label">Jeremiah 29:11</div>
                        </div>
                    </label>

                    <label class="modern-blox-wrapper">
                        <div class="back_num">13</div>
                        <div class="modern-blox">
                            <div class="b-text b-text_grey-dark">
                                Cast all your anxiety on him because he cares for you.
                            </div>
                            <div class="modern-blox-label">1 Peter 5:7</div>
                        </div>
                    </label>

                    <label class="modern-blox-wrapper">
                        <div class="back_num">14</div>
                        <div class="modern-blox">
                            <div class="b-text b-text_grey-dark">
                                He says, “Be still, and know that I am God; I will be exalted among the nations, I
                                will be exalted in the earth.”
                            </div>
                            <div class="modern-blox-label">Psalm 46:10</div>
                        </div>
                    </label>

                    <div class="flex v ds-row">
                        <div class="back_num">15</div>
                        <div class="b-text b-text_08 emphasize crystal-blue">
                            I put the Bible verses here, because I believe God wanted me that
                            <u>
                                anyone who sees this library would see them.
                            </u>
                        </div>
                    </div>


                    <label class="modern-blox-wrapper">
                        <div class="back_num">16</div>
                        <div class="modern-blox">
                            <div class="b-text b-text_grey-dark">
                                Renounce your sins by doing what is right, and your wickedness by being kind to the
                                oppressed. It may be that then..
                            </div>
                            <div class="modern-blox-label">Daniel & Nebuchadnezzar</div>
                        </div>
                    </label>

                    <label class="modern-blox-wrapper">
                        <div class="back_num">18</div>
                        <div class="modern-blox">
                            <div class="b-text b-text_grey-dark">
                                O people, the Lord has told you what is good, and this is what he requires of you:
                                to do
                                what is
                                right, to love mercy, and to walk humbly with your God.
                            </div>
                            <div class="modern-blox-label">Micah 6:8</div>
                        </div>
                    </label>

                    <label class="modern-blox-wrapper">
                        <div class="back_num">19</div>
                        <div class="modern-blox">
                            <div class="b-text b-text_grey-dark">
                                For if you forgive others their trespasses, your heavenly Father will
                                also forgive you.
                            </div>
                            <div class="modern-blox-label">Matthew 6:14</div>
                        </div>
                    </label>
                </div>
            </div>
        </div>
    </div>
   ```
    </details>

              
   ```html
        <script src="https://lestevmisha.github.io/FlexGridify/js/bundle.js"></script>
        <script src="https://lestevmisha.github.io/FlexGridify/js/main.js"></script>
    </body>

    </html>
   ```
   
</details>

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
        .child.child-1 { height: 5em; }
        .child.child-2 { height: 8em; }
    </style>
</head>
<body>
    <div class="flexGridify">
        <div class="child child-1">1</div>
        <div class="child child-2">2</div>
        <div class="child">3</div>
        <div class="child">4</div>
        <div class="child">5</div>
        <div class="child">6</div>
    </div>

    <!-- Similar options -->
    <!-- <script src="https://lestevmisha.github.io/FlexGridify/js/bundle.js"></script> -->
    <!-- <script src="./node_modules/flexgridify/dist/bundle.js"></script> -->
    <script src="https://unpkg.com/flexgridify/dist/bundle.js"></script>
    <script>
        const flexGridify = new FlexGridify(".flexGridify", {
            breakpointSelector: ".flexGridify",
        });
    </script>
</body>
</html>
```

### 2. Flash of Unstyled Content Problem

It's common for JavaScript to manipulate the HTML and CSS of a page as it loads, and sometimes this can cause a visible flash of unstyled or partially styled content, known as a Flash of Unstyled Content (FOUC).

To improve the user experience and hide JavaScript initialization, you should:

 1. Add these 4 lines of code into your styles:
```css
.flexGridify.flexGridify-init {
    opacity: 0;
    visibility: hidden;
}
```

2. Add `flexGridify-init` class to your flexGridify element.
3. Finally set `enableSmoothLoading` parameter to `true` and here we go.

Overall code
```html
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

        .child.child-1 { height: 5em; }
        .child.child-2 { height: 8em; }
        
        .flexGridify.flexGridify-init {
            opacity: 0;
            visibility: hidden;
        }
    </style>

</head>

<body>
    <div class="flexGridify flexGridify-init"> 
        <div class="child child-1">1</div>
        <div class="child child-2">2</div>
        <div class="child">3</div>
        <div class="child">4</div>
        <div class="child">5</div>
        <div class="child">6</div>
    </div>

    <!-- Similar options -->
    <!-- <script src="https://lestevmisha.github.io/FlexGridify/js/bundle.js"></script> -->
    <!-- <script src="./node_modules/flexgridify/dist/bundle.js"></script> -->
    <script src="https://unpkg.com/flexgridify/dist/bundle.js"></script>
    <script>
        const flexGridify = new FlexGridify(".flexGridify", {
            breakpointSelector: ".flexGridify",
            enableSmoothLoading: true, // reveals it only when initialized
        });
    </script>
</body>

</html>
```


### 3. Using ES6 Syntax

Note that you must use a web server for this approach as ES6 modules require the http protocol.

> [!IMPORTANT]
> See more here [ES6 docs](https://www.rfc-editor.org/rfc/rfc6454), if ran into issue check this [discussion](https://stackoverflow.com/questions/10752055/cross-origin-requests-are-only-supported-for-http-error-when-loading-a-local).

1. Clone the repo.
2. Move the `src` folder into your working directory.
3. Open `src/index.js` and remove the 2nd line of code (`import * as css from "./main.css";`), include `./src/main.css` in header instead, and here we go.
```html
<link rel="stylesheet" href="./src/main.css">
```

Overall code
```html
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

        .child.child-1 { height: 5em; }
        .child.child-2 { height: 8em; }
    </style>

    <style>
        .flexGridify.flexGridify-init {
            opacity: 0;
            visibility: hidden;
        }
    </style>

    <link rel="stylesheet" href="./src/main.css">
</head>

<body>
    <div class="flexGridify flexGridify-init"> 
        <div class="child child-1">1</div>
        <div class="child child-2">2</div>
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
            enableSmoothLoading: true, // reveals it only when initialized
        });
    </script>
</body>

</html>
```

## Usage

Create a new instance of `FlexGridify` by specifying a selector for the grid container and an optional object to customize the grid settings.

```javascript
const FlexGridify = new FlexGridify(".your-selector", {
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
});
```

## Options

#### **Boolean** *Type*
- **enableLogQuery** - Enables logging of breakpoint and query-related information to the console when set to `true`.
- **enableResponsiveLayout** - When set to `true`, enables the responsive layout that adjusts the number of columns based on the `columnBreakpoints`.
- **enableSmoothLoading** - When set to `true`, enables smooth loading of grid items, gradually removing the initialization class after a slight delay.
- **enableDynamicHeight** - Automatically adjusts the height of the grid container based on the height of its children when set to `true`.
- **enableDragAndDrop** - Enables drag-and-drop functionality for grid items when set to `true`.
- **rememberDragAndDropPosition** - Remembers the order of grid items after they have been dragged and dropped, saving the order to `localStorage`.

#### **Object** *Type*

- **dragAndDropAnimation** - Defines the animation properties for grid items during drag-and-drop interactions.
- **columnBreakpoints** - Defines the breakpoints and corresponding number of columns for the responsive layout. The keys represent the minimum width, and the values represent the number of columns.

#### **Function** *Type*

- **onDragAndDropChange** - A callback function that is triggered when the drag-and-drop order of grid items changes.
- **onBreakpointChange** - A callback function that is triggered when the grid layout changes due to a breakpoint.

#### **Number** *Type*

- **gap** - Defines the space between grid items. The value is expressed in the unit specified by `sizeUnit`.
- **marginTop** - Sets the top margin for each grid item, using the unit specified in `sizeUnit`.
- **marginBottom** - Sets the bottom margin for each grid item, using the unit specified in `sizeUnit`.
- **defaultColumnCount** - The default number of columns to display in the grid, if no breakpoints are matched.

#### **String** *Type*

- **sizeUnit** - The unit of measurement used for spacing and sizing within the grid. Can be either "em" or "px".
- **breakpointSelector** - Specifies the element or "window" that should be used for responsive breakpoints.

## Methods

### **Public Methods**

#### **getDefaultOptions** *Method*
- **Description:** Retrieves the default options for the `FlexGridify` class.

---

#### **initialize** *Method*
- **Parameters:**
  - `selector` (string, null) - The CSS selector for the element to be initialized.
  - `userOptions` (object) - Custom options provided by the user to override default settings.
- **Description:** Initializes the `FlexGridify` instance with the specified selector and user options.

---

#### **getBreakpointQuery** *Method*
- **Parameters:**
  - `query` (string) - The type of query to run, defaulting to "columns".
- **Description:** Returns the number of columns or the corresponding breakpoint value based on the current responsive layout and media queries.

---

#### **applyMarginTop** *Method*
- **Description:** Adds top margin to the grid items based on the `marginTop` option and `sizeUnit`.

---

#### **applyMarginBottom** *Method*
- **Description:** Adds bottom margin to the grid items based on the `marginBottom` option and `sizeUnit`.

---

#### **applyMargins** *Method*
- **Description:** Adds both top and bottom margins to the grid items based on the `marginTop` and `marginBottom` options and `sizeUnit`.

---

#### **applyHeightChange** *Method*
- **Parameters:**
  - `numCols` (number, optional) - The number of columns to consider for height adjustment.
- **Description:** Calculates and updates the height of the grid container based on the current column count and item heights.

---

#### **applyColumnClass** *Method*
- **Parameters:**
  - `numCols` (number, optional) - The number of columns to apply the class for.
- **Description:** Adds or updates the column class on the grid element, ensuring the correct number of columns is applied based on the responsive settings.

---

#### **applyColumnBreaks** *Method*
- **Parameters:**
  - `numCols` (number, optional) - The number of columns to apply breaks for.
- **Description:** Adds column breaks within the grid based on the number of columns, ensuring proper layout in the grid structure.

---

#### **applyGap** *Method*
- **Parameters:**
  - `numCols` (number, optional) - The number of columns to apply gap-related calculations for.
- **Description:** Calculates and applies gap-related CSS variables for the grid layout, setting row and column gaps, as well as column width calculation.

---

#### **reset** *Method*
- **Description:** Resets and updates the grid layout, recalculating margins, gaps, columns, and height.

---

#### **disconnectDynamicObservers** *Method*
- **Description:** Removes all dynamic resize observers from the grid items, preventing automatic height adjustments based on item size changes.

---

#### **connectDynamicObservers** *Method*
- **Description:** Adds dynamic resize observers to the grid items, enabling automatic height adjustments based on item size changes.

---

#### **resetBreakpoints** *Method*
- **Description:** Resets and reinitializes the breakpoint listeners for the grid.

---

#### **cleanupBreakpointListeners** *Method*
- **Description:** Removes all breakpoint listeners from the grid, including media query listeners and resize observers, cleaning up any unnecessary listeners.

---

#### **cleanupDndListeners** *Method*
- **Description:** Removes all drag-and-drop listeners from the grid items, disabling drag-and-drop functionality.

---

#### **reinitDragAndDrop** *Method*
- **Description:** Reinitializes the drag-and-drop functionality, setting up draggable items and saving their order in `localStorage` if `rememberDragAndDropPosition` is enabled.

---

### **Private Methods** (Prefixed with #)

#### **#clearColumnBreaks** *Method*
- **Description:** Removes all column breaks from the grid, cleaning up the layout.

---

#### **#typeOf** *Method*
- **Parameters:**
  - `property` (any) - The property to check.
  - `type` (string) - The expected type of the property.
- **Description:** Checks if the provided property matches the expected type, throwing a `TypeError` if not.

---

#### **#getMarginValue** *Method*
- **Parameters:**
  - `fontSize` (number) - The base font size used for margin calculations.
- **Description:** Calculates the total margin value based on the `marginTop` and `marginBottom` options and `sizeUnit`.

---

#### **#reload** *Method*
- **Parameters:**
  - `isBreakpoint` (boolean, optional) - Indicates if the reload is triggered by a breakpoint change.
  - `breakpoint` (number, optional) - The current breakpoint value.
- **Description:** Recalculates and reapplies grid layout settings, including margins, gaps, columns, and height, based on the current options and responsive settings. Also logs information if `enableLogQuery` is set to `true`.

---

#### **#setupFlexGridify** *Method*
- **Description:** Initializes the grid by setting up item classes, reordering items if drag-and-drop is enabled, and applying dynamic height adjustments if required.

---

#### **#setupBreakpointListener** *Method*
- **Description:** Sets up listeners for responsive breakpoints, using either `matchMedia` for the window or `matchElementMedia` for custom elements.

---

#### **#dynamicHeightUpdater** *Method*
- **Parameters:**
  - `child` (HTMLElement) - The grid item to observe for height changes.
- **Description:** Adds a resize observer to the grid item, triggering grid height recalculation whenever the item's height changes.

---

#### **#setupDragAndDropListeners** *Method*
- **Description:** Sets up drag-and-drop listeners for the grid items, enabling reordering of items within the grid.

---

#### **#saveOrderToStorage** *Method*
- **Description:** Saves the current order of grid items to `localStorage`, ensuring the order is remembered across page reloads if `rememberDragAndDropPosition` is enabled.

---

#### **#throughBreakpoints** *Method*
- **Parameters:**
  - `callback` (function) - A callback function to be executed for each breakpoint.
- **Description:** Iterates through the defined breakpoints, executing the callback function with the relevant breakpoint values.

---

#### **#check** *Method*
- **Description:** Validates the configuration options for the grid.


## FAQ
> Why not just use pure CSS?

Pure CSS can achieve similar layouts, using JavaScript with FlexGridify gives these key advantages:

* Dynamic Height: FlexGridify dynamically calculates the masonry container’s height, adjusting to different layouts and content sizes.
* Break Elements: It automatically manages "break" elements required for correct functioning based on the number of columns.
* Responsive Design: FlexGridify allows for varying numbers of columns at different breakpoints, enhancing flexibility and responsiveness.

In short, JavaScript provides flexebility and adaptability that CSS alone cannot achieve.

## Credits

[Gilbert Pellegrom](https://gilbitron.me), [Tobias Ahlin's article](https://tobiasahlin.com/blog/masonry-with-css/)
