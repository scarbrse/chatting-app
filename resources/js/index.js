const nameInput = document.getElementById("my-name-input");
const myMessage = document.getElementById("my-message");
const sendButton = document.getElementById("send-button");
const chatBox = document.getElementById("chat");
const serverURL = `https://it3049c-chat.fly.dev/messages`;
const MILLISECONDS_IN_TEN_SECONDS = 10000;
nameSave = document.getElementById("save-name");



do {
chatBox.classList.add('d-none');
myMessage.classList.add('d-none');
sendButton.classList.add('d-none');
} while (!localStorage.getItem('username'));



nameSave.addEventListener("click", function(){
  const username = nameInput.value.trim();
  if (username !== "") {
  localStorage.setItem('username', JSON.stringify(username));
 chatBox.classList.remove('d-none');
 myMessage.classList.remove('d-none');
 sendButton.classList.remove('d-none');
  }
});


async function updateMessagesInChatBox(callback) {

  const messages = await fetchMessages();
  console.log(messages);

  let formattedMessages = "";
  const username = JSON.parse(localStorage.getItem("username"));
  messages.forEach(message => {
    formattedMessages += formatMessage(message, username);
  });
  chatBox.innerHTML = formattedMessages;
}


updateMessagesInChatBox();
setInterval(updateMessagesInChatBox, MILLISECONDS_IN_TEN_SECONDS);

function fetchMessages() {
  return fetch(serverURL)
      .then( response => response.json())
}


function formatMessage(message, username) {
  console.log(message);
  const time = new Date(message.timestamp);
  const formattedTime = `${time.getHours()}:${time.getMinutes()}`;

  if (username === message.sender) {
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
                  ${message.text}
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
      value: text,
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

   // render the new message in the chat box
   chatBox.innerHTML += formatMessage({
    sender: sender,
    value: message,
    timestamp: new Date()
  }, nameInput.value); 
  
});
