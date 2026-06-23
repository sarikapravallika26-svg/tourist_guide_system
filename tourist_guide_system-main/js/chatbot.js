const chatWindow = document.getElementById('chatWindow');
const assistantForm = document.getElementById('assistantForm');
const assistantInput = document.getElementById('assistantInput');
const suggestionButtons = document.querySelectorAll('.suggestion-btn');

const assistantResponses = {
  'best places in goa': 'Goa is perfect for beach lovers. Visit Baga, Anjuna, Calangute, and the quieter south Goa shores during winter months.',
  'budget trip to hyderabad': 'Hyderabad can be budget-friendly with local street food, public transport, and affordable heritage tours around Charminar and Golconda.',
  'best season to visit kashmir': 'The best time is April to October. Spring and summer bring pleasant weather, while October shows vibrant autumn colors.',
  'top wildlife safaris in india': 'Consider Ranthambore, Kaziranga, Bandhavgarh, and Jim Corbett for amazing wildlife experiences and tiger sightings.'
};

function appendMessage(text, type) {
  if (!chatWindow) return;
  const bubble = document.createElement('div');
  bubble.className = `chat-bubble ${type}`;
  bubble.textContent = text;
  chatWindow.appendChild(bubble);
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

function getBotResponse(message) {
  const key = message.toLowerCase().trim();
  return assistantResponses[key] || 'That sounds exciting! I recommend exploring local guides and top-reviewed spots for the best experience.';
}

function sendMessage(message) {
  appendMessage(message, 'user');
  appendMessage('Typing...', 'bot');
  setTimeout(() => {
    const lastBubble = chatWindow.querySelector('.chat-bubble.bot:last-child');
    if (lastBubble) lastBubble.textContent = getBotResponse(message);
  }, 900);
}

if (assistantForm) {
  assistantForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const message = assistantInput.value.trim();
    if (!message) {
      showToast('Type a question to start the chat');
      return;
    }
    sendMessage(message);
    assistantInput.value = '';
  });
}

suggestionButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const text = button.textContent;
    assistantInput.value = text;
    assistantInput.focus();
  });
});
