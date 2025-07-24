const vscode = require('vscode');
const cssProperties = require('./cssProperties.js');

function createPropertyItem(prop, data) {
    const item = new vscode.CompletionItem(prop, vscode.CompletionItemKind.Property);
    item.insertText = new vscode.SnippetString(`${prop}: $1;`);
    item.documentation = new vscode.MarkdownString(data.description);
    return item;
}

function createValueItem(value) {
    return new vscode.CompletionItem(value, vscode.CompletionItemKind.Value);
}

function createCustomSnippet(label, prefix, body, detail) {
    const item = new vscode.CompletionItem(label, vscode.CompletionItemKind.Snippet);
    item.insertText = new vscode.SnippetString(body.join('\n'));
    item.detail = detail;
    item.documentation = new vscode.MarkdownString(`Inserts a template for a ${detail}.`);
    item.filterText = prefix;
    return item;
}

const customSnippets = [
    createCustomSnippet(
        'CSS: Comment Block', 'css-comment',
        ['/**', ' *', ' * ${1:Block comment title}', ' *', ' */'],
        'Standard CSS Block Comment'
    ),
    createCustomSnippet(
        'CSS: Section Comment', 'css-section',
        ['/*=============================================', '=            ${1:Section title}            =', '=============================================*/'],
        'Large Section Comment Block'
    ),
    createCustomSnippet(
        'CSS: End Section Comment', 'css-section-end',
        ['/*=====  End of ${1:Section title}  ======*/'],
        'End of Section Comment Block'
    ),
    createCustomSnippet(
        'CSS: Subsection Comment', 'css-subsection',
        ['/*----------  ${1:Subsection title}  ----------*/'],
        'Subsection Comment Block'
    ),
    createCustomSnippet(
        'WordPress: Theme Style Header', 'wp-theme-style',
        ['/*', 'Theme Name: ${1:My Awesome Theme}', 'Theme URI: ${2:https://example.com/my-awesome-theme/}', 'Author: ${3:Your Name}', 'Author URI: ${4:https://example.com/}', 'Description: ${5:A brief description...}', 'Tags: blog, one-column, custom-background, custom-colors, custom-logo, custom-menu, editor-style, featured-images, footer-widgets, rtl-language-support, theme-options, threaded-comments, translation-ready, block-styles', 'Version: ${6:1.0.0}', 'Requires at least: ${7:5.8}', 'Tested up to: ${8:6.0}', 'Requires PHP: ${9:7.4}', 'License: GNU General Public License v2 or later', 'License URI: http://www.gnu.org/licenses/gpl-2.0.html', 'Text Domain: ${10:my-awesome-theme}', '*/'],
        'WordPress Theme Stylesheet Header'
    ),
    createCustomSnippet(
        'WordPress: Child Theme Style Header', 'wp-child-theme-style',
        ['/*', 'Theme Name: ${1:My Child Theme}', 'Template: ${2:parent-theme-folder-name}', 'Description: ${3:A child theme...}', 'Author: ${4:Your Name}', 'Version: ${5:1.0}', 'Text Domain: ${6:my-child-theme}', '*/'],
        'WordPress Child Theme Stylesheet Header'
    ),
    createCustomSnippet(
        'WordPress: Plugin Details Header', 'wp-plugin-details',
        ['<?php', '/**', ' * Plugin Name: ${1:My Simple Plugin}', ' * Description: ${2:A brief description...}', ' * Version: ${3:1.0}', ' * Author: ${4:Your Name}', ' * Author URI: ${5:https://example.com/}', ' * License: GPL2 or later', ' * Text Domain: ${6:my-simple-plugin}', ' */'],
        'WordPress Plugin Header'
    )
];

function register(context) {
    const provider = vscode.languages.registerCompletionItemProvider(
        ['css', 'scss', 'less', 'php'],
        {
            provideCompletionItems(document, position) {
                const linePrefix = document.lineAt(position).text.substring(0, position.character);
                const valueRegex = /([a-zA-Z-]+)\s*:\s*([a-zA-Z0-9-]*)$/;
                const valueMatch = linePrefix.match(valueRegex);

                if (valueMatch) {
                    const propName = valueMatch[1];
                    if (cssProperties[propName] && cssProperties[propName].values) {
                        return cssProperties[propName].values.map(createValueItem);
                    }
                } else {
                    const properties = Object.keys(cssProperties).map(prop => createPropertyItem(prop, cssProperties[prop]));
                    return [...properties, ...customSnippets];
                }
                return undefined;
            }
        },
        ':', ' ', '-'
    );
    context.subscriptions.push(provider);
}

module.exports = { register };