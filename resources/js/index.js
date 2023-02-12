const nameInput = document.getElementById("my-name-input");
const myMessage = document.getElementById("my-message");
const sendButton = document.getElementById("send-button");
const chatBox = document.getElementById("chat");
const serverURL = 'https://it3049c-chat-application.herokuapp.com/messages';

function updateMessages() {
  this.fetchMessages();
  this.formatMessages();
  this.updateChatBox();

};

function fetchMessages() {
  return fetch(serverURL)
  .then(response => response.json())
};

async function updateMessages() {
  const messages = await fetchMessages();
  console.log(messages);
  let formatMessages = "";
  messages.forEach(message => {
    formatMessages += formatMessage(message, nameInput.value);
  });
  chatBox.innerHTML = formatMessages;

}