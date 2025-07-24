const vscode = require('vscode');

const acfCompletionProvider = require('./features/acfCompletions');
const bootstrapCompletionProvider = require('./features/bootstrapCompletions');
const wordpressCompletionProvider = require('./features/wordpressCompletions');
const { AiAssistantViewProvider } = require('./features/aiAssistantViewProvider');
const cssCompletionProvider = require('./features/cssCompletions');

function activate(context) {
	console.log('Congratulations, your "Ultimatix Coding" extension is now active!');

	acfCompletionProvider.register(context);
	bootstrapCompletionProvider.register(context);
	wordpressCompletionProvider.register(context);
	cssCompletionProvider.register(context);

	const provider = new AiAssistantViewProvider(context.extensionUri);
	context.subscriptions.push(
		vscode.window.registerWebviewViewProvider("ultimatix.aiAssistantView", provider)
	);
}

function deactivate() { }

module.exports = {
	activate,
	deactivate
};