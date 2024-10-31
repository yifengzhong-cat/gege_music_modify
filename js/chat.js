class AIChat {
    constructor() {
        this.chatOutput = document.getElementById('chat-output');
        this.chatInput = document.getElementById('chat-input');
        this.sendButton = document.getElementById('send-btn');
        this.isProcessing = false;
        this.conversationHistory = [];
        
        this.initEventListeners();
    }

    initEventListeners() {
        this.sendButton.addEventListener('click', () => this.sendMessage());
        this.chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.sendMessage();
            }
        });
    }

    async sendMessage() {
        if (this.isProcessing) return;
        
        const message = this.chatInput.value.trim();
        if (!message) return;

        this.addMessage(message, 'user');
        this.chatInput.value = '';
        
        try {
            this.isProcessing = true;
            this.sendButton.disabled = true;
            
            console.log('Sending message to local API...');
            const response = await fetch('http://192.168.1.115:8881/infer', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    model: "gpt-3.5-turbo",
                    messages: [
                        {
                            role: "system",
                            content: "你是钟格英专属的AI助手。你需要以专业、友好的方式回答问题。"
                        },
                        ...this.conversationHistory,
                        {
                            role: "user",
                            content: message
                        }
                    ],
                    temperature: 0.7,
                    max_tokens: 1000
                })
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.error?.message || `HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log('API Response:', data);

            if (!data.choices || !data.choices[0] || !data.choices[0].message) {
                throw new Error('Invalid response format from API');
            }

            const aiResponse = data.choices[0].message.content;
            
            this.conversationHistory.push(
                { role: "user", content: message },
                { role: "assistant", content: aiResponse }
            );
            
            if (this.conversationHistory.length > 10) {
                this.conversationHistory = this.conversationHistory.slice(-10);
            }
            
            this.addMessage(aiResponse, 'ai');
        } catch (error) {
            console.error('AI响应错误:', error);
            this.addMessage(`抱歉，我暂时无法回答。错误信息：${error.message}`, 'ai');
        } finally {
            this.isProcessing = false;
            this.sendButton.disabled = false;
        }
    }

    addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        
        if (sender === 'ai') {
            const formattedText = text
                .replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>')
                .replace(/\n/g, '<br>');
            messageDiv.innerHTML = formattedText;
        } else {
            messageDiv.textContent = text;
        }
        
        this.chatOutput.appendChild(messageDiv);
        this.chatOutput.scrollTop = this.chatOutput.scrollHeight;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.aiChat = new AIChat();
}); 