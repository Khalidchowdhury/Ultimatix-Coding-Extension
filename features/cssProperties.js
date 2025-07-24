const cssProperties = {
    // --- Layout & Box Model ---
    'display': {
        description: 'Specifies the display behavior of an element.',
        values: ['block', 'inline', 'inline-block', 'flex', 'inline-flex', 'grid', 'inline-grid', 'none', 'contents', 'table', 'table-row', 'table-cell', 'list-item']
    },
    'position': {
        description: 'Specifies the type of positioning method used for an element.',
        values: ['static', 'relative', 'absolute', 'fixed', 'sticky']
    },
    'top': { description: 'Specifies the top position of a positioned element.', values: ['auto', '0', '50%', '100%', '10px', '2rem'] },
    'right': { description: 'Specifies the right position of a positioned element.', values: ['auto', '0', '50%', '100%', '10px', '2rem'] },
    'bottom': { description: 'Specifies the bottom position of a positioned element.', values: ['auto', '0', '50%', '100%', '10px', '2rem'] },
    'left': { description: 'Specifies the left position of a positioned element.', values: ['auto', '0', '50%', '100%', '10px', '2rem'] },
    'z-index': { description: 'Specifies the stack order of a positioned element.', values: ['auto', '0', '1', '10', '100', '999', '-1'] },
    'float': { description: 'Specifies whether an element should float.', values: ['left', 'right', 'none'] },
    'clear': { description: 'Specifies on which sides of an element floating elements are not allowed to float.', values: ['left', 'right', 'both', 'none'] },
    'overflow': { description: 'Specifies what happens if content overflows an element\'s box.', values: ['visible', 'hidden', 'scroll', 'auto'] },
    'overflow-x': { description: 'Specifies what happens to the left/right edges of the content if it overflows.', values: ['visible', 'hidden', 'scroll', 'auto'] },
    'overflow-y': { description: 'Specifies what happens to the top/bottom edges of the content if it overflows.', values: ['visible', 'hidden', 'scroll', 'auto'] },

    // --- Sizing ---
    'width': { description: 'Sets the width of an element.', values: ['auto', '100%', '50%', '200px', '50vw', 'max-content', 'min-content', 'fit-content'] },
    'height': { description: 'Sets the height of an element.', values: ['auto', '100%', '50%', '200px', '50vh', 'max-content', 'min-content', 'fit-content'] },
    'min-width': { description: 'Sets the minimum width of an element.', values: ['0', '100%', '200px', 'max-content'] },
    'max-width': { description: 'Sets the maximum width of an element.', values: ['none', '100%', '800px', 'max-content'] },
    'min-height': { description: 'Sets the minimum height of an element.', values: ['0', '100%', '200px', 'max-content'] },
    'max-height': { description: 'Sets the maximum height of an element.', values: ['none', '100%', '600px', 'max-content'] },
    'box-sizing': { description: 'Defines how the width and height of an element are calculated.', values: ['content-box', 'border-box'] },

    // --- Spacing (Margin & Padding) ---
    'margin': { description: 'Sets the margin area on all four sides.', values: ['auto', '0', '1rem', '10px', '10px 20px'] },
    'margin-top': { description: 'Sets the top margin of an element.', values: ['auto', '0', '1rem', '10px'] },
    'margin-right': { description: 'Sets the right margin of an element.', values: ['auto', '0', '1rem', '10px'] },
    'margin-bottom': { description: 'Sets the bottom margin of an element.', values: ['auto', '0', '1rem', '10px'] },
    'margin-left': { description: 'Sets the left margin of an element.', values: ['auto', '0', '1rem', '10px'] },
    'padding': { description: 'Sets the padding area on all four sides.', values: ['0', '1rem', '10px', '10px 20px'] },
    'padding-top': { description: 'Sets the top padding of an element.', values: ['0', '1rem', '10px'] },
    'padding-right': { description: 'Sets the right padding of an element.', values: ['0', '1rem', '10px'] },
    'padding-bottom': { description: 'Sets the bottom padding of an element.', values: ['0', '1rem', '10px'] },
    'padding-left': { description: 'Sets the left padding of an element.', values: ['0', '1rem', '10px'] },

    // --- Flexbox & Grid ---
    'gap': { description: 'Sets the gap between flex/grid items.', values: ['1rem', '10px', 'normal'] },
    'flex-direction': { description: 'Defines the direction of the main-axis.', values: ['row', 'row-reverse', 'column', 'column-reverse'] },
    'flex-wrap': { description: 'Specifies whether flex items are forced onto one line or can wrap.', values: ['nowrap', 'wrap', 'wrap-reverse'] },
    'justify-content': { description: 'Aligns flex items along the main-axis.', values: ['flex-start', 'flex-end', 'center', 'space-between', 'space-around', 'space-evenly'] },
    'align-items': { description: 'Aligns flex items along the cross-axis.', values: ['stretch', 'flex-start', 'flex-end', 'center', 'baseline'] },
    'align-content': { description: 'Aligns flex lines within a flex container.', values: ['flex-start', 'flex-end', 'center', 'space-between', 'space-around', 'stretch'] },
    'align-self': { description: 'Aligns a single flex item on the cross-axis.', values: ['auto', 'flex-start', 'flex-end', 'center', 'baseline', 'stretch'] },
    'grid-template-columns': { description: 'Defines the columns of the grid.', values: ['repeat(3, 1fr)', '100px 1fr 100px', 'none'] },
    'grid-template-rows': { description: 'Defines the rows of the grid.', values: ['repeat(2, 1fr)', '100px 1fr', 'none'] },

    // --- Typography (Font & Text) ---
    'color': { description: 'Sets the color of text.', values: ['#000000', '#FFFFFF', 'red', 'blue', 'green', 'rgba(0,0,0,0.5)', 'transparent', 'currentColor'] },
    'font-family': { description: 'Specifies the font for an element.', values: ['sans-serif', 'serif', 'monospace', '"Times New Roman"', 'Arial', 'Helvetica'] },
    'font-size': { description: 'Sets the size of the font.', values: ['1rem', '16px', '1.2em', '80%', 'small', 'medium', 'large'] },
    'font-weight': { description: 'Sets the weight of the font.', values: ['normal', 'bold', 'bolder', 'lighter', '100', '400', '700', '900'] },
    'font-style': { description: 'Specifies the font style for a text.', values: ['normal', 'italic', 'oblique'] },
    'line-height': { description: 'Sets the distance between lines.', values: ['normal', '1.5', '2', '24px'] },
    'text-align': { description: 'Specifies the horizontal alignment of text.', values: ['left', 'right', 'center', 'justify'] },
    'text-decoration': { description: 'Specifies the decoration added to text.', values: ['none', 'underline', 'overline', 'line-through'] },
    'text-transform': { description: 'Controls the capitalization of text.', values: ['none', 'capitalize', 'uppercase', 'lowercase'] },
    'letter-spacing': { description: 'Increases or decreases the space between characters in a text.', values: ['normal', '1px', '2px', '-1px'] },
    'word-spacing': { description: 'Increases or decreases the white space between words.', values: ['normal', '2px', '4px'] },
    'text-shadow': { description: 'Adds shadow to text.', values: ['1px 1px 2px black', 'none'] },

    // --- Backgrounds & Borders ---
    'background': { description: 'A shorthand for all background properties.', values: ['#FFFFFF', 'url("image.jpg")', 'transparent'] },
    'background-color': { description: 'Sets the background color.', values: ['#FFFFFF', 'red', 'blue', 'transparent'] },
    'background-image': { description: 'Sets one or more background images.', values: ['url("image.jpg")', 'none', 'linear-gradient(to right, red, blue)'] },
    'background-repeat': { description: 'Sets if/how a background image will be repeated.', values: ['repeat', 'repeat-x', 'repeat-y', 'no-repeat'] },
    'background-position': { description: 'Sets the starting position of a background image.', values: ['center', 'top left', '50% 50%'] },
    'background-size': { description: 'Specifies the size of the background images.', values: ['auto', 'cover', 'contain', '100% 100%'] },
    'background-attachment': { description: 'Sets whether a background image scrolls with the rest of the page, or is fixed.', values: ['scroll', 'fixed', 'local'] },
    'border': { description: 'A shorthand property for border-width, border-style, and border-color.', values: ['1px solid black', 'none'] },
    'border-width': { description: 'Sets the width of the four borders.', values: ['1px', 'medium'] },
    'border-style': { description: 'Sets the style of the four borders.', values: ['solid', 'dotted', 'dashed', 'double', 'none'] },
    'border-color': { description: 'Sets the color of the four borders.', values: ['black', '#FF0000'] },
    'border-radius': { description: 'Rounds the corners of an element\'s outer border edge.', values: ['5px', '50%', '0'] },

    // --- Transitions, Transforms & Animations ---
    'transition': { description: 'A shorthand property for transition-property, transition-duration, etc.', values: ['all 0.3s ease-in-out', 'width 2s'] },
    'transition-property': { description: 'Specifies the name of the CSS property the transition effect is for.', values: ['all', 'width', 'color'] },
    'transition-duration': { description: 'Specifies how many seconds or milliseconds a transition effect takes to complete.', values: ['0.3s', '2s', '500ms'] },
    'transition-timing-function': { description: 'Specifies the speed curve of the transition effect.', values: ['ease', 'linear', 'ease-in', 'ease-out', 'ease-in-out'] },
    'transform': { description: 'Applies a 2D or 3D transformation to an element.', values: ['none', 'rotate(45deg)', 'scale(1.5)', 'translate(10px, 20px)'] },
    'animation': { description: 'A shorthand property for all the animation properties.', values: ['my-animation 3s infinite'] },

    // --- Other Visual Properties ---
    'opacity': { description: 'Sets the opacity level for an element.', values: ['1', '0.5', '0'] },
    'visibility': { description: 'Specifies whether an element is visible or hidden.', values: ['visible', 'hidden', 'collapse'] },
    'cursor': { description: 'Specifies the mouse cursor to be displayed when pointing over an element.', values: ['auto', 'default', 'pointer', 'wait', 'text', 'move', 'not-allowed'] },
    'box-shadow': { description: 'Attaches one or more shadows to an element.', values: ['none', '2px 2px 5px rgba(0,0,0,0.3)'] },
    'filter': { description: 'Defines effects (e.g., blurring or color shifting) on an element.', values: ['none', 'blur(5px)', 'grayscale(100%)', 'brightness(1.5)'] },
    'list-style-type': { description: 'Specifies the type of list-item marker.', values: ['disc', 'circle', 'square', 'decimal', 'none'] }
};

module.exports = cssProperties;