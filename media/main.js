
(function () {
    const vscode = acquireVsCodeApi();
    const messageList = document.getElementById('message-list');
    const input = document.getElementById('prompt-input');
    const submitButton = document.getElementById('submit-button');

    submitButton.addEventListener('click', () => {
        sendMessage();
    });

    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });

    function sendMessage() {
        const value = input.value.trim();
        if (value) {
            addMessage('user', value);
            vscode.postMessage({ type: 'askAI', value: value });
            input.value = '';
        }
    }

    function addMessage(role, text) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${role}-message`;
        messageDiv.textContent = text;
        messageList.appendChild(messageDiv);
        messageList.scrollTop = messageList.scrollHeight;
    }

    function updateLastMessage(text) {
        const lastMessage = messageList.lastChild;
        if (lastMessage && lastMessage.classList.contains('assistant-message')) {
            lastMessage.textContent = text;
        }
    }

    window.addEventListener('message', (event) => {
        const message = event.data;
        switch (message.type) {
            case 'addMessage':
                addMessage(message.role, message.value);
                break;
            case 'updateLastMessage':
                updateLastMessage(message.value);
                break;
            case 'showError':
                updateLastMessage(`Error: ${message.value}`);
                break;
        }
    });
}());