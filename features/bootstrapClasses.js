

function generateSimpleClasses(prefix, values) {
    let classes = {};
    for (const val of values) {
        classes[`${prefix}-${val.key}`] = val.desc;
    }
    return classes;
}

function generateResponsiveClasses(prefix, values, breakpoints = ['sm', 'md', 'lg', 'xl', 'xxl']) {
    let classes = {};
    for (const bp of breakpoints) {
        for (const val of values) {
            classes[`${prefix}-${bp}-${val.key}`] = `${val.desc} on ${bp} and up.`;
        }
    }
    return classes;
}

const bootstrapClasses = {
    // -----------------------------------------------------------------------------
    //   1. Layout (Container, Grid, Columns, Gutters)
    // -----------------------------------------------------------------------------
    'container': 'Sets a max-width at each responsive breakpoint.',
    'container-fluid': 'Sets a width of 100% at all breakpoints.',
    ...generateSimpleClasses('container', [{ key: 'sm', desc: '100% wide until small breakpoint.' }, { key: 'md', desc: '100% wide until medium breakpoint.' }, { key: 'lg', desc: '100% wide until large breakpoint.' }, { key: 'xl', desc: '100% wide until extra large breakpoint.' }, { key: 'xxl', desc: '100% wide until extra extra large breakpoint.' }]),
    'row': 'Wrapper for columns.',
    'col': 'Basic column for auto-layout.',
    ...Object.fromEntries([...Array(12).keys()].map(i => [`col-${i + 1}`, `A column spanning ${i + 1} of 12.`])),
    'col-auto': 'Column width based on content.',
    ...generateResponsiveClasses('col', [{ key: 'auto', desc: 'Auto-width column' }, ...[...Array(12).keys()].map(i => ({ key: i + 1, desc: `Spans ${i + 1} columns` }))]),
    ...generateSimpleClasses('g', [...Array(6).keys()].map(i => ({ key: i, desc: `Sets gutter gap to size ${i}.` }))),
    ...generateSimpleClasses('gx', [...Array(6).keys()].map(i => ({ key: i, desc: `Sets horizontal gutter gap to size ${i}.` }))),
    ...generateSimpleClasses('gy', [...Array(6).keys()].map(i => ({ key: i, desc: `Sets vertical gutter gap to size ${i}.` }))),

    // -----------------------------------------------------------------------------
    //   2. Display, Flexbox, Float, Position, Z-Index
    // -----------------------------------------------------------------------------
    'd-none': 'Hides element.', 'd-inline': 'Displays as inline.', 'd-inline-block': 'Displays as inline-block.', 'd-block': 'Displays as block.', 'd-grid': 'Displays as grid.', 'd-flex': 'Enables flexbox.', 'd-inline-flex': 'Enables inline flexbox.',
    ...generateResponsiveClasses('d', [{ key: 'none', desc: 'Hide' }, { key: 'inline', desc: 'Display inline' }, { key: 'block', desc: 'Display block' }, { key: 'grid', desc: 'Display grid' }, { key: 'flex', desc: 'Display flex' }]),
    'float-start': 'Floats element to the left.', 'float-end': 'Floats element to the right.', 'float-none': 'Disables floating.',
    ...generateResponsiveClasses('float', [{ key: 'start', desc: 'Float left' }, { key: 'end', desc: 'Float right' }, { key: 'none', desc: 'Disable float' }]),
    'flex-row': 'Items display in a row.', 'flex-row-reverse': 'Reversed row.', 'flex-column': 'Items display in a column.', 'flex-column-reverse': 'Reversed column.',
    ...generateSimpleClasses('justify-content', [{ key: 'start', desc: 'Align to start.' }, { key: 'end', desc: 'Align to end.' }, { key: 'center', desc: 'Center align.' }, { key: 'between', desc: 'Space between.' }, { key: 'around', desc: 'Space around.' }, { key: 'evenly', desc: 'Space evenly.' }]),
    ...generateSimpleClasses('align-items', [{ key: 'start', desc: 'Align to start.' }, { key: 'end', desc: 'Align to end.' }, { key: 'center', desc: 'Center align.' }, { key: 'baseline', desc: 'Align to baseline.' }, { key: 'stretch', desc: 'Stretch to fill.' }]),
    'flex-wrap': 'Allows items to wrap.', 'flex-nowrap': 'Prevents wrapping.', 'flex-wrap-reverse': 'Allows wrapping in reverse.',
    ...generateSimpleClasses('order', [{ key: 'first', desc: 'First item' }, { key: 'last', desc: 'Last item' }, ...[...Array(6).keys()].map(i => ({ key: i, desc: `Order ${i}` }))]),
    'position-static': 'Static position.', 'position-relative': 'Relative position.', 'position-absolute': 'Absolute position.', 'position-fixed': 'Fixed position.', 'position-sticky': 'Sticky position.',
    ...['0', '50', '100'].flatMap(v => [['top', v], ['bottom', v], ['start', v], ['end', v]]).reduce((o, [p, v]) => ({ ...o, [`${p}-${v}`]: `Sets ${p} to ${v}%.` }), {}),
    'translate-middle': 'Centers element.',
    ...generateSimpleClasses('z-index', [{ key: '0', desc: 'z-index 0' }, { key: '1', desc: 'z-index 1' }, { key: '2', desc: 'z-index 2' }, { key: '3', desc: 'z-index 3' }]),

    // -----------------------------------------------------------------------------
    //   3. Spacing (Margin, Padding, Gap)
    // -----------------------------------------------------------------------------
    ...Object.fromEntries(['m', 'p'].flatMap(prop => ['', 't', 'b', 's', 'e', 'x', 'y'].flatMap(side => [...Array(6).keys(), 'auto'].map(size => {
        if (prop === 'p' && size === 'auto') return null;
        const key = `${prop}${side}-${size}`;
        const propName = prop === 'm' ? 'margin' : 'padding';
        const sideName = { t: 'top', b: 'bottom', s: 'start', e: 'end', x: 'x-axis', y: 'y-axis' }[side] || 'all sides';
        return [key, `Sets ${propName} on ${sideName} to size ${size}.`];
    }).filter(Boolean)))),
    ...Object.fromEntries(['sm', 'md', 'lg', 'xl', 'xxl'].flatMap(bp => ['m', 'p'].flatMap(prop => ['', 't', 'b', 's', 'e', 'x', 'y'].flatMap(side => [...Array(6).keys(), 'auto'].map(size => {
        if (prop === 'p' && size === 'auto') return null;
        const key = `${prop}${side}-${bp}-${size}`;
        return [key, `Sets spacing on ${bp} and up.`];
    }).filter(Boolean))))),
    ...generateSimpleClasses('gap', [...Array(6).keys()].map(i => ({ key: i, desc: `Sets gap size to ${i}` }))),

    // -----------------------------------------------------------------------------
    //   4. Text, Typography & Colors
    // -----------------------------------------------------------------------------
    'text-start': 'Left-aligns text.', 'text-center': 'Center-aligns text.', 'text-end': 'Right-aligns text.',
    'text-wrap': 'Allows text to wrap.', 'text-nowrap': 'Prevents text wrapping.', 'text-break': 'Breaks long words.',
    'text-lowercase': 'Lowercase text.', 'text-uppercase': 'Uppercase text.', 'text-capitalize': 'Capitalize words.',
    ...generateSimpleClasses('fs', [{ key: '1', desc: 'Font size 1' }, { key: '2', desc: 'Font size 2' }, { key: '3', desc: 'Font size 3' }, { key: '4', desc: 'Font size 4' }, { key: '5', desc: 'Font size 5' }, { key: '6', desc: 'Font size 6' }]),
    'fw-bold': 'Bold font.', 'fw-normal': 'Normal font weight.', 'fw-light': 'Light font.', 'fst-italic': 'Italic font.',
    'lh-1': 'Line height 1.', 'lh-sm': 'Small line height.', 'lh-base': 'Base line height.', 'lh-lg': 'Large line height.',
    'text-decoration-none': 'Removes text decoration.', 'text-decoration-underline': 'Underlines text.', 'text-decoration-line-through': 'Line-through text.',
    ...Object.fromEntries(['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark', 'body', 'muted', 'white', 'black-50', 'white-50'].flatMap(color => [
        [`text-${color}`, `Text color ${color}.`],
        [`link-${color}`, `Link color ${color}.`]
    ])),

    // -----------------------------------------------------------------------------
    //   5. Backgrounds, Borders, Shadows, Sizing
    // -----------------------------------------------------------------------------
    ...generateSimpleClasses('bg', ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark', 'white', 'transparent'].map(c => ({ key: c, desc: `Background color ${c}` }))),
    'bg-gradient': 'Adds a gradient background.',
    'border': 'Adds border.', 'border-0': 'Removes border.',
    ...['top', 'end', 'bottom', 'start'].map(s => `border-${s}`).reduce((o, k) => ({ ...o, [k]: `Adds ${k.split('-')[1]} border.` }), {}),
    ...generateSimpleClasses('border', [...Array(5).keys()].map(i => ({ key: i + 1, desc: `Border width size ${i + 1}` }))),
    'rounded': 'Adds border radius.', 'rounded-0': 'Removes border radius.',
    ...generateSimpleClasses('rounded', [{ key: '1', desc: 'Small radius' }, { key: '2', desc: 'Medium radius' }, { key: '3', desc: 'Large radius' }]),
    'rounded-circle': 'Circular shape.', 'rounded-pill': 'Pill shape.',
    'shadow': 'Adds a box shadow.', 'shadow-sm': 'Adds a small box shadow.', 'shadow-lg': 'Adds a large box shadow.', 'shadow-none': 'Removes box shadow.',
    'w-25': 'Width 25%.', 'w-50': 'Width 50%.', 'w-75': 'Width 75%.', 'w-100': 'Width 100%.', 'w-auto': 'Width auto.',
    'h-25': 'Height 25%.', 'h-50': 'Height 50%.', 'h-75': 'Height 75%.', 'h-100': 'Height 100%.', 'h-auto': 'Height auto.',
    'mw-100': 'Max-width 100%.', 'mh-100': 'Max-height 100%.',

    // -----------------------------------------------------------------------------
    //   6. Other Utilities (Visibility, Overflow, Interaction)
    // -----------------------------------------------------------------------------
    'visible': 'Makes element visible.', 'invisible': 'Hides element but maintains space.',
    'visually-hidden': 'Hides element, accessible to screen readers.', 'visually-hidden-focusable': 'Hides element until focused.',
    'overflow-auto': 'Adds scrollbars on overflow.', 'overflow-hidden': 'Hides overflow.', 'overflow-visible': 'Shows overflow.', 'overflow-scroll': 'Always show scrollbars.',
    'pe-none': 'Disables pointer events.', 'pe-auto': 'Enables pointer events.',
    'clearfix': 'Clears floats.', 'stretched-link': 'Makes an entire containing block clickable.',

    // -----------------------------------------------------------------------------
    //   7. Component Modifier Classes
    // -----------------------------------------------------------------------------
    'btn': 'Base button class.', 'btn-close': 'Dismiss button.', ...['lg', 'sm'].map(s => `btn-${s}`).reduce((o, k) => ({ ...o, [k]: `${k.split('-')[1] === 'lg' ? 'Large' : 'Small'} button.` }), {}),
    ...generateSimpleClasses('btn', ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark', 'link'].map(c => ({ key: c, desc: `${c.charAt(0).toUpperCase() + c.slice(1)} button.` }))),
    ...generateSimpleClasses('btn-outline', ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark'].map(c => ({ key: c, desc: `Outlined ${c} button.` }))),
    'alert': 'Base alert class.', 'alert-dismissible': 'Makes an alert dismissible.',
    'card': 'Base card class.', 'card-body': 'Card content.', 'card-title': 'Card title.', 'card-text': 'Card text.', 'card-img-top': 'Image at top of card.',
    'modal': 'Base modal class.', 'modal-dialog': 'Modal dialog container.', 'modal-content': 'Modal content container.',
    'nav': 'Base nav component.', 'nav-tabs': 'Tabbed nav.', 'nav-pills': 'Pill nav.', 'nav-link': 'Link in nav.', 'nav-item': 'Item in nav.',
    'navbar': 'Base navbar class.', 'navbar-brand': 'Navbar brand.', 'navbar-toggler': 'Navbar toggle button.', 'navbar-collapse': 'Collapsible navbar content.',
    'dropdown': 'Base dropdown class.', 'dropdown-toggle': 'Dropdown toggle.', 'dropdown-menu': 'Dropdown menu.', 'dropdown-item': 'Item in dropdown.',
    'list-group': 'Base list group.', 'list-group-item': 'Item in list group.',
};

module.exports = bootstrapClasses;