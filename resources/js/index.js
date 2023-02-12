const nameInput = document.getElementById("my-name-input");
const myMessage = document.getElementById("my-message");
const sendButton = document.getElementById("send-button");
const chatBox = document.getElementById("chat");
const serverURL = `http://localhost:8080`;
const MILLISECONDS_IN_TEN_SECONDS = 10000;


async function updateMessagesInChatBox() {

  const messages = await fetchMessages();
  console.log(messages);

  let formattedMessages = "";
  messages.forEach(message => {
    formattedMessages += formatMessage(message, nameInput.value);
  });
  console.log(formattedMessages);
  chatBox.innerHTML = formattedMessages;
  console.log(chatBox.innerHTML);
}

updateMessagesInChatBox();
setInterval(updateMessagesInChatBox, MILLISECONDS_IN_TEN_SECONDS);

async function fetchMessages() {
  const response = await fetch('/messages');
  const messages = await response.json();
  return messages;
}

function formatMessage(message, nameInput) {
  const time = new Date(message.timestamp);
  const formattedTime = `${time.getHours()}:${time.getMinutes()}`;

  if (nameInput === message.sender) {
      return `
      <div class="mine messages">
          <div class="message">
              ${message.value}
          </div>
          <div class="sender-info">
              ${formattedTime}
          </div>
      </div>
      `
  } else {
      return `
          <div class="yours messages">
              <div class="message">
                  ${message.value}
              </div>
              <div class="sender-info">
                  ${message.sender} ${formattedTime}
              </div>
          </div>
      `
  };
}

function sendMessages(username, text) {
  const newMessage = {
      sender: username,
      text: text,
      timestamp: new Date()
  }

  fetch (serverURL, {
    method: `POST`, 
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(newMessage)
});
}

sendButton.addEventListener("click", function() {
  const sender = nameInput.value;
  const message = myMessage.value;

  sendMessages(sender,message);
  myMessage.value = "";
});


