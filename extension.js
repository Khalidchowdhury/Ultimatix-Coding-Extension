const vscode = require('vscode');

const acfCompletionProvider = require('./features/acfCompletions');
const bootstrapCompletionProvider = require('./features/bootstrapCompletions');
const wordpressCompletionProvider = require('./features/wordpressCompletions');

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	console.log('Congratulations, your "Ultimatix Coding" extension is now active!');

	acfCompletionProvider.register(context);
	bootstrapCompletionProvider.register(context);
	wordpressCompletionProvider.register(context);
}


function deactivate() { }

module.exports = {
	activate,
	deactivate
};