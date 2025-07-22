const vscode = require('vscode');
const acfCompletionProvider = require('./features/acfCompletions');

function activate(context) {
	console.log('Extension "Ultimatix Coding" is now active.');
	acfCompletionProvider.register(context);
}

function deactivate() { }

module.exports = {
	activate,
	deactivate
};
