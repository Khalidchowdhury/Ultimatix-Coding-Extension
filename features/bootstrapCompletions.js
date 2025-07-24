const vscode = require('vscode');
const bootstrapClasses = require('./bootstrapClasses');

function createSnippetItem({ label, prefix, body, detail, documentation }) {
    const item = new vscode.CompletionItem(label, vscode.CompletionItemKind.Snippet);
    item.insertText = new vscode.SnippetString(body);
    item.detail = detail;
    item.documentation = new vscode.MarkdownString(documentation || `Bootstrap Snippet: ${label}`);
    item.filterText = prefix;
    return item;
}

function createClassItem(className, description) {
    const item = new vscode.CompletionItem(className, vscode.CompletionItemKind.Value);
    item.detail = 'Bootstrap CSS Class';
    item.documentation = new vscode.MarkdownString(description);
    return item;
}

function getBootstrapComponentSnippets() {
    const snippetsData = {
        "BS: Container": { prefix: "bs-container", detail: "Layout", body: "<div class=\"container${1|-fluid}\">\n\t${2}\n</div>", documentation: "Creates a Bootstrap container." },
        "BS: Grid Row": { prefix: "bs-row", detail: "Layout", body: "<div class=\"row\">\n\t<div class=\"col\">\n\t\t${1}\n\t</div>\n</div>", documentation: "Creates a Bootstrap grid row." },
        "BS: Column": { prefix: "bs-col", detail: "Layout", body: "<div class=\"col-${1|sm,md,lg,xl|}-${2:6}\">\n\t${3}\n</div>", documentation: "Creates a Bootstrap column." },
        "BS: Form": { prefix: "bs-form", detail: "Form", body: "<form>\n\t${1}\n</form>", documentation: "Creates a form element." },
        "BS: Input - Text": { prefix: "bs-input-text", detail: "Form", body: "<div class=\"mb-3\">\n\t<label for=\"${1:textInput}\" class=\"form-label\">${2:Text Label}</label>\n\t<input type=\"text\" class=\"form-control\" id=\"${1:textInput}\" placeholder=\"${3:Enter text}\">\n</div>", documentation: "Text input field." },
        "BS: Input - Email": { prefix: "bs-input-email", detail: "Form", body: "<div class=\"mb-3\">\n\t<label for=\"${1:emailInput}\" class=\"form-label\">${2:Email address}</label>\n\t<input type=\"email\" class=\"form-control\" id=\"${1:emailInput}\" placeholder=\"name@example.com\">\n</div>", documentation: "Email input field." },
        "BS: Input - Password": { prefix: "bs-input-password", detail: "Form", body: "<div class=\"mb-3\">\n\t<label for=\"${1:passwordInput}\" class=\"form-label\">${2:Password}</label>\n\t<input type=\"password\" class=\"form-control\" id=\"${1:passwordInput}\">\n</div>", documentation: "Password input field." },
        "BS: Input - File": { prefix: "bs-input-file", detail: "Form", body: "<div class=\"mb-3\">\n\t<label for=\"${1:formFile}\" class=\"form-label\">${2:File input}</label>\n\t<input class=\"form-control\" type=\"file\" id=\"${1:formFile}\">\n</div>", documentation: "File input field." },
        "BS: Textarea": { prefix: "bs-textarea", detail: "Form", body: "<div class=\"mb-3\">\n\t<label for=\"${1:textarea}\" class=\"form-label\">${2:Textarea}</label>\n\t<textarea class=\"form-control\" id=\"${1:textarea}\" rows=\"3\"></textarea>\n</div>", documentation: "Textarea input." },
        "BS: Checkbox": { prefix: "bs-check", detail: "Form", body: "<div class=\"form-check\">\n\t<input class=\"form-check-input\" type=\"checkbox\" value=\"\" id=\"${1:flexCheckDefault}\">\n\t<label class=\"form-check-label\" for=\"${1:flexCheckDefault}\">\n\t\t${2:Default checkbox}\n\t</label>\n</div>", documentation: "Checkbox input." },
        "BS: Radio": { prefix: "bs-radio", detail: "Form", body: "<div class=\"form-check\">\n\t<input class=\"form-check-input\" type=\"radio\" name=\"${1:radioGroup}\" id=\"${2:radioDefault1}\">\n\t<label class=\"form-check-label\" for=\"${2:radioDefault1}\">\n\t\t${3:Default radio}\n\t</label>\n</div>", documentation: "Radio button input." },
        "BS: Switch": { prefix: "bs-switch", detail: "Form", body: "<div class=\"form-check form-switch\">\n\t<input class=\"form-check-input\" type=\"checkbox\" id=\"${1:flexSwitchCheck}\">\n\t<label class=\"form-check-label\" for=\"${1:flexSwitchCheck}\">${2:Switch}</label>\n</div>", documentation: "Switch-style checkbox." },
        "BS: Input - Range": { prefix: "bs-range", detail: "Form", body: "<label for=\"${1:customRange}\" class=\"form-label\">${2:Range}</label>\n<input type=\"range\" class=\"form-range\" id=\"${1:customRange}\">", documentation: "Range slider input." },
        "BS: Select": { prefix: "bs-select", detail: "Form", body: "<select class=\"form-select\" aria-label=\"${1:Default select example}\">\n\t<option selected>Open this select menu</option>\n\t<option value=\"1\">One</option>\n\t<option value=\"2\">Two</option>\n</select>", documentation: "Select dropdown." },
        "BS: Floating Label": { prefix: "bs-floating-label", detail: "Form", body: "<div class=\"form-floating mb-3\">\n\t<input type=\"${1|text,email,password|}\" class=\"form-control\" id=\"${2:floatingInput}\" placeholder=\"${3:placeholder}\">\n\t<label for=\"${2:floatingInput}\">${4:Label text}</label>\n</div>", documentation: "Input with a floating label." },
        "BS: Input Group": { prefix: "bs-input-group", detail: "Form", body: "<div class=\"input-group mb-3\">\n\t<span class=\"input-group-text\" id=\"${1:addon}\">${2:@}</span>\n\t<input type=\"text\" class=\"form-control\" placeholder=\"${3:Username}\" aria-label=\"Username\" aria-describedby=\"${1:addon}\">\n</div>", documentation: "Input with an addon." },
        "BS: Accordion": { prefix: "bs-accordion", detail: "Component", body: "<div class=\"accordion\" id=\"${1:accordionExample}\">\n\t<div class=\"accordion-item\">\n\t\t<h2 class=\"accordion-header\" id=\"headingOne\">\n\t\t\t<button class=\"accordion-button\" type=\"button\" data-bs-toggle=\"collapse\" data-bs-target=\"#collapseOne\">Accordion Item #1</button>\n\t\t</h2>\n\t\t<div id=\"collapseOne\" class=\"accordion-collapse collapse show\" data-bs-parent=\"#${1:accordionExample}\">\n\t\t\t<div class=\"accordion-body\">${2}</div>\n\t\t</div>\n\t</div>\n</div>", documentation: "Accordion component." },
        "BS: Alert": { prefix: "bs-alert", detail: "Component", body: "<div class=\"alert alert-${1|primary,secondary,success,danger,warning,info,light,dark|}\" role=\"alert\">\n\t${2:A simple alert!}\n</div>", documentation: "Alert message box." },
        "BS: Badge": { prefix: "bs-badge", detail: "Component", body: "<span class=\"badge bg-${1|primary,secondary,success,danger,warning,info,light,dark|}\">${2:New}</span>", documentation: "Badge for notifications or labels." },
        "BS: Breadcrumb": { prefix: "bs-breadcrumb", detail: "Component", body: "<nav aria-label=\"breadcrumb\">\n\t<ol class=\"breadcrumb\">\n\t\t<li class=\"breadcrumb-item\"><a href=\"#\">Home</a></li>\n\t\t<li class=\"breadcrumb-item active\" aria-current=\"page\">Library</li>\n\t</ol>\n</nav>", documentation: "Breadcrumb navigation." },
        "BS: Button": { prefix: "bs-btn", detail: "Component", body: "<button type=\"button\" class=\"btn btn-${1|primary,secondary,success,danger,warning,info,light,dark|}\">${2:Button}</button>", documentation: "Standard button." },
        "BS: Button Group": { prefix: "bs-btn-group", detail: "Component", body: "<div class=\"btn-group\" role=\"group\">\n\t<button type=\"button\" class=\"btn btn-primary\">Left</button>\n\t<button type=\"button\" class=\"btn btn-primary\">Middle</button>\n\t<button type=\"button\" class=\"btn btn-primary\">Right</button>\n</div>", documentation: "Group of buttons." },
        "BS: Card": { prefix: "bs-card", detail: "Component", body: "<div class=\"card\" style=\"width: 18rem;\">\n\t<img src=\"${1:...}\" class=\"card-img-top\" alt=\"...\">\n\t<div class=\"card-body\">\n\t\t<h5 class=\"card-title\">${2:Card title}</h5>\n\t\t<p class=\"card-text\">${3:Some quick example text...}</p>\n\t\t<a href=\"#\" class=\"btn btn-primary\">Go somewhere</a>\n\t</div>\n</div>", documentation: "Card component." },
        "BS: Carousel": { prefix: "bs-carousel", detail: "Component", body: "<div id=\"${1:carouselControls}\" class=\"carousel slide\" data-bs-ride=\"carousel\">\n\t<div class=\"carousel-inner\">\n\t\t<div class=\"carousel-item active\">\n\t\t\t<img src=\"${2:...}\" class=\"d-block w-100\" alt=\"...\">\n\t\t</div>\n\t</div>\n\t<button class=\"carousel-control-prev\" type=\"button\" data-bs-target=\"#${1:carouselControls}\" data-bs-slide=\"prev\"><span class=\"carousel-control-prev-icon\"></span></button>\n\t<button class=\"carousel-control-next\" type=\"button\" data-bs-target=\"#${1:carouselControls}\" data-bs-slide=\"next\"><span class=\"carousel-control-next-icon\"></span></button>\n</div>", documentation: "Carousel slideshow." },
        "BS: Dropdown": { prefix: "bs-dropdown", detail: "Component", body: "<div class=\"dropdown\">\n\t<button class=\"btn btn-secondary dropdown-toggle\" type=\"button\" data-bs-toggle=\"dropdown\">Dropdown</button>\n\t<ul class=\"dropdown-menu\">\n\t\t<li><a class=\"dropdown-item\" href=\"#\">Action</a></li>\n\t</ul>\n</div>", documentation: "Dropdown menu." },
        "BS: List Group": { prefix: "bs-list-group", detail: "Component", body: "<ul class=\"list-group\">\n\t<li class=\"list-group-item\">An item</li>\n\t<li class=\"list-group-item\">A second item</li>\n</ul>", documentation: "List group." },
        "BS: Modal": { prefix: "bs-modal", detail: "Component", body: "<button type=\"button\" class=\"btn btn-primary\" data-bs-toggle=\"modal\" data-bs-target=\"#${1:exampleModal}\">Launch modal</button>\n\n<div class=\"modal fade\" id=\"${1:exampleModal}\" tabindex=\"-1\">\n\t<div class=\"modal-dialog\">\n\t\t<div class=\"modal-content\">\n\t\t\t<div class=\"modal-header\"><h5 class=\"modal-title\">${2:Modal title}</h5><button type=\"button\" class=\"btn-close\" data-bs-dismiss=\"modal\"></button></div>\n\t\t\t<div class=\"modal-body\"><p>${3:Modal body text...}</p></div>\n\t\t\t<div class=\"modal-footer\"><button type=\"button\" class=\"btn btn-secondary\" data-bs-dismiss=\"modal\">Close</button><button type=\"button\" class=\"btn btn-primary\">Save</button></div>\n\t\t</div>\n\t</div>\n</div>", documentation: "Modal dialog." },
        "BS: Navbar": { prefix: "bs-navbar", detail: "Component", body: "<nav class=\"navbar navbar-expand-lg navbar-light bg-light\">\n\t<div class=\"container-fluid\">\n\t\t<a class=\"navbar-brand\" href=\"#\">Navbar</a>\n\t\t<button class=\"navbar-toggler\" type=\"button\" data-bs-toggle=\"collapse\" data-bs-target=\"#navbarNav\"><span class=\"navbar-toggler-icon\"></span></button>\n\t\t<div class=\"collapse navbar-collapse\" id=\"navbarNav\">\n\t\t\t<ul class=\"navbar-nav\">\n\t\t\t\t<li class=\"nav-item\"><a class=\"nav-link\" href=\"#\">Home</a></li>\n\t\t\t</ul>\n\t\t</div>\n\t</div>\n</nav>", documentation: "Navbar component." },
        "BS: Navs & Tabs": { prefix: "bs-navs", detail: "Component", body: "<ul class=\"nav nav-${1|tabs,pills}\" id=\"${2:myTab}\" role=\"tablist\">\n\t<li class=\"nav-item\" role=\"presentation\"><button class=\"nav-link active\" data-bs-toggle=\"tab\" data-bs-target=\"#home\">Home</button></li>\n\t<li class=\"nav-item\" role=\"presentation\"><button class=\"nav-link\" data-bs-toggle=\"tab\" data-bs-target=\"#profile\">Profile</button></li>\n</ul>\n<div class=\"tab-content\" id=\"${2:myTab}Content\">\n\t<div class=\"tab-pane fade show active\" id=\"home\">${3}</div>\n\t<div class=\"tab-pane fade\" id=\"profile\">${4}</div>\n</div>", documentation: "Navs and tabs." },
        "BS: Offcanvas": { prefix: "bs-offcanvas", detail: "Component", body: "<a class=\"btn btn-primary\" data-bs-toggle=\"offcanvas\" href=\"#${1:offcanvas}\">Link</a>\n\n<div class=\"offcanvas offcanvas-start\" id=\"${1:offcanvas}\">\n\t<div class=\"offcanvas-header\"><h5 class=\"offcanvas-title\">${2:Offcanvas}</h5><button type=\"button\" class=\"btn-close text-reset\" data-bs-dismiss=\"offcanvas\"></button></div>\n\t<div class=\"offcanvas-body\">${3}</div>\n</div>", documentation: "Offcanvas sidebar." },
        "BS: Pagination": { prefix: "bs-pagination", detail: "Component", body: "<nav>\n\t<ul class=\"pagination\">\n\t\t<li class=\"page-item\"><a class=\"page-link\" href=\"#\">Previous</a></li>\n\t\t<li class=\"page-item\"><a class=\"page-link\" href=\"#\">1</a></li>\n\t\t<li class=\"page-item\"><a class=\"page-link\" href=\"#\">Next</a></li>\n\t</ul>\n</nav>", documentation: "Pagination component." },
        "BS: Placeholder": { prefix: "bs-placeholder", detail: "Component", body: "<p class=\"placeholder-glow\"><span class=\"placeholder col-6\"></span></p>", documentation: "Placeholder loading animation." },
        "BS: Popover": { prefix: "bs-popover", detail: "Component", body: "<button type=\"button\" class=\"btn btn-danger\" data-bs-toggle=\"popover\" title=\"${1:Popover title}\" data-bs-content=\"${2:Popover content.}\">Toggle popover</button>", documentation: "Popover component." },
        "BS: Progress Bar": { prefix: "bs-progress", detail: "Component", body: "<div class=\"progress\">\n\t<div class=\"progress-bar\" role=\"progressbar\" style=\"width: 25%;\">25%</div>\n</div>", documentation: "Progress bar." },
        "BS: Spinner": { prefix: "bs-spinner", detail: "Component", body: "<div class=\"spinner-border text-${1|primary,secondary,success,danger,warning,info,light,dark|}\" role=\"status\">\n\t<span class=\"visually-hidden\">Loading...</span>\n</div>", documentation: "Loading spinner." },
        "BS: Toast": { prefix: "bs-toast", detail: "Component", body: "<div class=\"toast show\" role=\"alert\">\n\t<div class=\"toast-header\"><strong class=\"me-auto\">Bootstrap</strong><button type=\"button\" class=\"btn-close\" data-bs-dismiss=\"toast\"></button></div>\n\t<div class=\"toast-body\">${1:Toast message.}</div>\n</div>", documentation: "Toast notification." },
        "BS: Tooltip": { prefix: "bs-tooltip", detail: "Component", body: "<button type=\"button\" class=\"btn btn-secondary\" data-bs-toggle=\"tooltip\" data-bs-placement=\"top\" title=\"${1:Tooltip}\">Tooltip</button>", documentation: "Tooltip component." },
        "BS: Flexbox Container": { prefix: "bs-flex", detail: "Utility", body: "<div class=\"d-flex justify-content-${1|start,end,center,between,around|} align-items-${2|start,end,center,baseline,stretch|}\">\n\t${3}\n</div>", documentation: "Flexbox container." },
        "BS: Spacing": { prefix: "bs-spacing", detail: "Utility", body: "${1|m,p|}${2|t,b,s,e,x,y,|} - ${3|0,1,2,3,4,5,auto|}", documentation: "Margin and padding utility." },
        "BS: HTML5 Boilerplate": {
            prefix: "bs5",
            detail: "Bootstrap Setup",
            documentation: "Creates a complete HTML5 boilerplate with Bootstrap 5 CSS and JS.",
            body: [
                '<!doctype html>',
                '<html lang="en">',
                '<head>',
                '  <!-- Required meta tags -->',
                '  <meta charset="utf-8">',
                '  <meta name="viewport" content="width=device-width, initial-scale=1">',
                '  <title>${1:Bootstrap Boilerplate}</title>',
                '  <!-- Bootstrap CSS -->',
                '  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">',
                '</head>',
                '<body>',
                '  <h1>${2:Hello, world!}</h1>',
                '\n\t${0}\n',
                '  <!-- Optional JavaScript; choose one of the two! -->',
                '\n  <!-- Option 1: Bootstrap Bundle with Popper -->',
                '  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>',
                '\n  <!-- Option 2: Separate Popper and Bootstrap JS -->',
                '  <!--',
                '  <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.10.2/dist/umd/popper.min.js" integrity="sha384-7+zCNj/IqJ95wo16oMtfsKbZ9ccEh31eOz1HGyDuCQ6wgnyJNSYdrPa03rtR1zdB" crossorigin="anonymous"></script>',
                '  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.min.js" integrity="sha384-QJHtvGhmr9XOIpI6YVutG+2QOK9T+ZnN4kzFN1RtK3zEFEIsxhlmWl5/YESvpZ13" crossorigin="anonymous"></script>',
                '  -->',
                '</body>',
                '</html>'
            ].join('\n')
        },
        "BS: CSS Link": {
            prefix: "bs-css",
            detail: "Bootstrap Setup",
            documentation: "Inserts the Bootstrap 5 CSS CDN link.",
            body: '<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">'
        },
        "BS: JS Links (Separate)": {
            prefix: "bs-js-separate",
            detail: "Bootstrap Setup",
            documentation: "Inserts separate Popper and Bootstrap JS CDN links.",
            body: [
                '<script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.10.2/dist/umd/popper.min.js" integrity="sha384-7+zCNj/IqJ95wo16oMtfsKbZ9ccEh31eOz1HGyDuCQ6wgnyJNSYdrPa03rtR1zdB" crossorigin="anonymous"></script>',
                '<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.min.js" integrity="sha384-QJHtvGhmr9XOIpI6YVutG+2QOK9T+ZnN4kzFN1RtK3zEFEIsxhlmWl5/YESvpZ13" crossorigin="anonymous"></script>'
            ].join('\n')
        },
        "BS: JS Link (Bundle)": {
            prefix: "bs-js-bundle",
            detail: "Bootstrap Setup",
            documentation: "Inserts the Bootstrap 5 JS Bundle CDN link (includes Popper).",
            body: '<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>'
        },
    };
    return Object.entries(snippetsData).map(([label, data]) => createSnippetItem({ label, ...data }));
}

function getBootstrapClassSuggestions() {
    return Object.entries(bootstrapClasses).map(([className, description]) => {
        return createClassItem(className, description);
    });
}

function register(context) {
    const provider = vscode.languages.registerCompletionItemProvider(
        ['php', 'html'],
        {
            provideCompletionItems(document, position) {
                const linePrefix = document.lineAt(position).text.substring(0, position.character);
                const isInsideClassAttribute = /class\s*=\s*["'][^"']*/.test(linePrefix);

                if (isInsideClassAttribute) {
                    return getBootstrapClassSuggestions();
                }

                return getBootstrapComponentSnippets();
            }
        },
        ' ', '"', "'"
    );
    context.subscriptions.push(provider);
}

module.exports = { register };