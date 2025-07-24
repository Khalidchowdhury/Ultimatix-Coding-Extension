const vscode = require('vscode');
const axios = require('axios');

class AiAssistantViewProvider {
    constructor(extensionUri) {
        this._extensionUri = extensionUri;
    }

    resolveWebviewView(webviewView, context, token) {
        this._view = webviewView;
        webviewView.webview.options = {
            enableScripts: true,
            localResourceRoots: [this._extensionUri]
        };
        webviewView.webview.html = this._getHtmlForWebview(webviewView.webview);

        webviewView.webview.onDidReceiveMessage(async (data) => {
            if (data.type === 'askAI') {
                try {
                    const editor = vscode.window.activeTextEditor;
                    const selectedCode = editor ? editor.document.getText(editor.selection) : '';
                    const fullPrompt = `User question: "${data.value}"\n\nCode context (if any):\n\`\`\`\n${selectedCode}\n\`\`\``;

                    this._view.webview.postMessage({ type: 'addMessage', role: 'assistant', value: 'Thinking...' });

                    const aiResponse = await this.callGeminiApi(fullPrompt);

                    this._view.webview.postMessage({ type: 'updateLastMessage', value: aiResponse });

                } catch (error) {
                    console.error(error);
                    this._view.webview.postMessage({ type: 'showError', value: 'Failed to get response from AI.' });
                }
            }
        });
    }

    async callGeminiApi(prompt) {
        const apiKey = 'AIzaSyDZpvf1APcD2PdYU8OJiuC7NCDDQEtGf2g';


        const modelName = 'gemini-1.5-flash-latest';

        const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`;

        try {
            const requestBody = {
                contents: [{
                    parts: [{ text: prompt }]
                }]
            };

            const response = await axios.post(url, requestBody);

            if (response.data && response.data.candidates && response.data.candidates.length > 0) {
                return response.data.candidates[0].content.parts[0].text;
            } else {
                return 'Sorry, I received an empty response from the AI. Please try rephrasing your question.';
            }
        } catch (error) {
            console.error("--- Gemini API Call Failed ---");
            if (error.response) {
                console.error("Status:", error.response.status);
                console.error("Data:", JSON.stringify(error.response.data, null, 2));
            } else {
                console.error("General Error:", error.message);
            }
            console.error("--------------------------");

            const errorMessage = error.response ? `API Error: ${error.response.data.error.message}` : `Network Error: ${error.message}`;
            return `An error occurred: ${errorMessage}. Please check your API key and network connection.`;
        }
    }

    _getHtmlForWebview(webview) {
        const scriptUri = webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, 'media', 'main.js'));
        const styleUri = webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, 'media', 'main.css'));

        return `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link href="${styleUri}" rel="stylesheet">
            <title>Ultimatix AI</title>
        </head>
        <body>
            <div id="chat-container">
                <div id="message-list"></div>
                <div id="input-area">
                    <textarea id="prompt-input" placeholder="Ask anything..."></textarea>
                    <button id="submit-button">➤</button>
                </div>
            </div>
            <script src="${scriptUri}"></script>
        </body>
        </html>`;
    }
}

module.exports = {
    AiAssistantViewProvider
};