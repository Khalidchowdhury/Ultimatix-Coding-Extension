const vscode = require('vscode');
const fetch = require('cross-fetch');



const OPENROUTER_API_KEY = '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';

class AiAssistantViewProvider {
  constructor(extensionUri) {
    this._extensionUri = extensionUri;
  }

  resolveWebviewView(webviewView, context, _token) {
    this._view = webviewView;

    webviewView.webview.options = {
      enableScripts: true,
      localResourceRoots: [this._extensionUri]
    };

    webviewView.webview.html = this._getHtml(webviewView.webview);

    webviewView.webview.onDidReceiveMessage(async message => {
      if (message.type === 'ask') {
        const userInput = message.value;

        try {
          const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${OPENROUTER_API_KEY}`
            },
            body: JSON.stringify({
              model: "openai/gpt-4o-mini",
              messages: [{ role: "user", content: userInput }]
            })
          });

          const data = await response.json();

          const aiReply = data.choices && data.choices[0].message.content
            ? data.choices[0].message.content
            : "দুঃখিত, রেসপন্স পাওয়া যায়নি।";

          webviewView.webview.postMessage({
            type: 'response',
            value: aiReply
          });

        } catch (error) {
          webviewView.webview.postMessage({
            type: 'response',
            value: `Error: ${error.message}`
          });
        }
      }
    });
  }

  _getHtml(webview) {
    const nonce = getNonce();
    return /*html*/ `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta http-equiv="Content-Security-Policy" content="default-src 'none'; img-src https: data:; style-src 'unsafe-inline'; script-src 'nonce-${nonce}';" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <style>
          body {
            font-family: Consolas, monospace;
            background-color: #1e1e1e;
            color: #d4d4d4;
            padding: 10px;
          }
          .title {
            font-weight: bold;
            font-size: 16px;
            margin-bottom: 10px;
          }
          textarea {
            width: 100%;
            height: 60px;
            background-color: #252526;
            color: #d4d4d4;
            border: 1px solid #333;
            padding: 8px;
            margin-bottom: 10px;
            resize: vertical;
          }
          button {
            padding: 5px 15px;
            background-color: #0e639c;
            color: white;
            border: none;
            cursor: pointer;
            margin-bottom: 10px;
          }
          .response {
            background-color: #2d2d30;
            padding: 10px;
            margin-top: 10px;
            border-radius: 4px;
            white-space: pre-wrap;
          }
          input[type="file"] {
            margin-top: 10px;
          }
        </style>
      </head>
      <body>
        <div class="title">🤖 Ultimatix AI Assistant</div>
        <textarea id="question" placeholder="Ask your coding question..."></textarea>
        <button id="askBtn">Ask</button>
        <input type="file" id="fileInput" />
        <div class="response" id="responseBox">Waiting for your question...</div>

        <script nonce="${nonce}">
          const vscode = acquireVsCodeApi();

          const askBtn = document.getElementById('askBtn');
          const questionInput = document.getElementById('question');
          const responseBox = document.getElementById('responseBox');

          askBtn.addEventListener('click', () => {
            const question = questionInput.value.trim();
            if (question.length === 0) return;

            vscode.postMessage({
              type: 'ask',
              value: question
            });

            responseBox.textContent = "⏳ Thinking...";
          });

          window.addEventListener('message', event => {
            const message = event.data;
            if (message.type === 'response') {
              responseBox.textContent = message.value;
            }
          });
        </script>
      </body>
      </html>
    `;
  }
}

function getNonce() {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < 32; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

module.exports = {
  AiAssistantViewProvider
};
