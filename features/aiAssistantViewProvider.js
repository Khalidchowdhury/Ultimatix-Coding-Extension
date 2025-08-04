const vscode = require('vscode');
const fetch = require('node-fetch');
const md = require('markdown-it')({
  html: true, // Markdown এর ভেতরে HTML ট্যাগকে অনুমতি দেওয়া
  linkify: true, // URL কে লিঙ্কে পরিণত করা
  typographer: true, // সুন্দর টাইপোগ্রাফির জন্য
});

class AiAssistantViewProvider {
  constructor(extensionUri) {
    this._extensionUri = extensionUri;
  }

  resolveWebviewView(webviewView, context, _token) {
    this._view = webviewView;

    webviewView.webview.options = {
      enableScripts: true,
      localResourceRoots: [this._extensionUri],
    };

    webviewView.webview.html = this._getHtml(webviewView.webview);

    webviewView.webview.onDidReceiveMessage(async (message) => {
      if (message.type === 'ask') {
        const responseText = await this._askOpenRouter(message.value);
        const formattedResponse = md.render(responseText);

        webviewView.webview.postMessage({
          type: 'aiResponse',
          value: formattedResponse,
        });
      }
    });
  }

  async _askOpenRouter(userInput) {
    const apiKey = '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';

    if (!apiKey) {
      return '❌ **Error:** API Key not found inside the code.';
    }

    const messages = [];
    const content = [];
    content.push({ type: 'text', text: userInput.question });
    if (userInput.fileData) {
      content.push({ type: 'image_url', image_url: { url: userInput.fileData } });
    }
    messages.push({ role: 'user', content: content });

    try {
      const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'https://ultimatix-coding.vscode',
          'X-Title': 'Ultimatix Coding AI',
        },
        body: JSON.stringify({
          model: 'openai/gpt-4o',
          messages: messages,
          max_tokens: 3000
        })
      });

      if (!res.ok) {
        const errorBody = await res.text();
        throw new Error(`API Error: ${res.status} ${res.statusText} - ${errorBody}`);
      }

      const data = await res.json();

      // --- সঠিক সিনট্যাক্স ---
      return data.choices?.[0]?.message?.content || '❌ AI থেকে কোনো উত্তর পাওয়া যায়নি।';

    } catch (err) {
      console.error(err);
      return `❌ **Error:** ${err.message}`;
    }
  }

  _getHtml(webview) {
    const nonce = getNonce();
    const highlightJsCssUri = 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/github-dark.min.css';
    const highlightJsScriptUri = 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js';

    return /*html*/ `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta http-equiv="Content-Security-Policy" content="default-src 'none'; img-src ${webview.cspSource} https: data:; style-src 'unsafe-inline' ${webview.cspSource} https://cdnjs.cloudflare.com; script-src 'nonce-${nonce}' https://cdnjs.cloudflare.com;">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        
        <link rel="stylesheet" href="${highlightJsCssUri}">

        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; background-color: #1e1e1e; color: #d4d4d4; padding: 10px; display: flex; flex-direction: column; height: 100vh; box-sizing: border-box; }
          #chat-container { flex-grow: 1; overflow-y: auto; padding-right: 5px; }
          .message-container { display: flex; margin-bottom: 12px; }
          .message-bubble { max-width: 85%; padding: 10px 15px; border-radius: 18px; white-space: pre-wrap; word-wrap: break-word; }
          .user-message .message-bubble { background-color: #0e639c; color: white; border-top-right-radius: 4px; margin-left: auto; }
          .ai-message .message-bubble { background-color: #2d2d30; color: #d4d4d4; border-top-left-radius: 4px; padding: 1px 15px; }
          .ai-message .message-bubble p:first-child { margin-top: 12px; }
          .ai-message .message-bubble p:last-child { margin-bottom: 12px; }
          #input-area { display: flex; flex-direction: column; border-top: 1px solid #333; padding-top: 10px; }
          textarea { width: 100%; height: 60px; background: #252526; color: #d4d4d4; border: 1px solid #444; padding: 8px; resize: vertical; border-radius: 4px; box-sizing: border-box; }
          #controls { display: flex; justify-content: space-between; align-items: center; margin-top: 8px; }
          #fileInput { display: none; }
          #file-label { background: #3a3d41; padding: 5px 10px; cursor: pointer; border-radius: 4px; }
          #askBtn { background-color: #0e639c; color: white; border: none; padding: 5px 15px; cursor: pointer; border-radius: 4px; }
          #imagePreview { max-width: 100px; max-height: 50px; margin-top: 5px; border-radius: 4px; display: none; }
          .loading { text-align: center; color: #888; }
          
          pre { position: relative; }
          pre code.hljs {
            display: block;
            overflow-x: auto;
            padding: 1em;
            background: #1e1e1e;
            border-radius: 5px;
            border: 1px solid #444;
          }
          .copy-btn {
            position: absolute;
            top: 5px;
            right: 5px;
            background: #3c3c3c;
            color: #ccc;
            border: none;
            padding: 3px 8px;
            border-radius: 3px;
            cursor: pointer;
            opacity: 0.5;
            transition: opacity 0.2s;
          }
          pre:hover .copy-btn { opacity: 1; }
        </style>
      </head>
      <body>
        <div id="chat-container"></div>
        <div id="input-area">
            <textarea id="question" placeholder="Ask a question or attach a file..."></textarea>
            <div id="controls">
                <label for="fileInput" id="file-label">📎 Attach File</label>
                <input type="file" id="fileInput" accept="image/*" />
                <button id="askBtn">Ask</button>
            </div>
            <img id="imagePreview" />
            <span id="fileName" style="font-size: 12px; color: #888;"></span>
        </div>

        <script nonce="${nonce}" src="${highlightJsScriptUri}"></script>
        
        <script nonce="${nonce}">
          const vscode = acquireVsCodeApi();
          const askBtn = document.getElementById('askBtn');
          const questionInput = document.getElementById('question');
          const chatContainer = document.getElementById('chat-container');
          const fileInput = document.getElementById('fileInput');

          function appendMessage(htmlContent, className, isLoading = false) {
              const existingLoading = chatContainer.querySelector('.loading');
              if (existingLoading) {
                  existingLoading.remove();
              }
              
              if (!htmlContent && !isLoading) return;

              const messageContainer = document.createElement('div');
              messageContainer.className = 'message-container ' + className;
              
              const bubble = document.createElement('div');
              bubble.className = 'message-bubble';
              bubble.innerHTML = htmlContent;
              
              bubble.querySelectorAll('pre code').forEach((block) => {
                hljs.highlightElement(block);
                const pre = block.parentElement;
                if (pre.querySelector('.copy-btn')) return; // যদি বাটন আগে থেকেই থাকে

                const copyButton = document.createElement('button');
                copyButton.className = 'copy-btn';
                copyButton.textContent = 'Copy';
                copyButton.onclick = () => {
                  navigator.clipboard.writeText(block.textContent);
                  copyButton.textContent = 'Copied!';
                  setTimeout(() => { copyButton.textContent = 'Copy'; }, 2000);
                };
                pre.appendChild(copyButton);
              });
              
              if(isLoading) {
                  messageContainer.classList.add('loading');
              }
              
              messageContainer.appendChild(bubble);
              chatContainer.appendChild(messageContainer);
              chatContainer.scrollTop = chatContainer.scrollHeight;
          }
          
          function askQuestion() {
            const question = questionInput.value.trim();
            if (!question && !fileData) return;
            if (question) {
                appendMessage('<p>' + question.replace(/</g, "<").replace(/>/g, ">") + '</p>', 'user-message');
            }
            const messagePayload = { question, fileData };
            vscode.postMessage({ type: 'ask', value: messagePayload });
            questionInput.value = "";
            fileInput.value = "";
            fileData = null;
            document.getElementById('imagePreview').style.display = 'none';
            document.getElementById('fileName').textContent = '';
            appendMessage('<p>⏳ Thinking...</p>', 'ai-message', true);
          }

          askBtn.addEventListener('click', askQuestion);
          questionInput.addEventListener('keydown', (e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  askQuestion();
              }
          });
          window.addEventListener('message', event => {
            const message = event.data;
            if (message.type === 'aiResponse') {
              appendMessage(message.value, 'ai-message');
            }
          });
          
          let fileData = null;
          fileInput.addEventListener('change', () => {
            const file = fileInput.files[0];
            if (file) {
              const reader = new FileReader();
              reader.onload = e => {
                fileData = e.target.result;
                const imagePreview = document.getElementById('imagePreview');
                const fileNameSpan = document.getElementById('fileName');
                if (file.type.startsWith('image/')) {
                  imagePreview.src = fileData;
                  imagePreview.style.display = 'block';
                  fileNameSpan.textContent = '';
                } else {
                  imagePreview.style.display = 'none';
                  fileNameSpan.textContent = file.name;
                }
              };
              reader.readAsDataURL(file);
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
  AiAssistantViewProvider,
};