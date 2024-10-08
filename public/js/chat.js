const socket = io();

// rendering messages

const messageTemplate = document.querySelector("#message-template").innerHTML;
const $messages = document.querySelector("#messages");

// user and room detail

const { username, room } = Qs.parse(location.search, {
  ignoreQueryPrefix: true,
});

console.log("query data", username, room);

const autoScroll = () => {
  // Ensure there are messages
  const $newMessage = $messages.lastElementChild;
  if (!$newMessage) return;

  // Get height of the new message
  const newMessageStyle = getComputedStyle($newMessage);
  const newMessageMargin = parseInt(newMessageStyle.marginBottom);
  const newMessageHeight = $newMessage.offsetHeight + newMessageMargin;

  // Visible height
  const visibleHeight = $messages.offsetHeight;

  // Height of message container
  const containerHeight = $messages.scrollHeight;

  // How far have I scrolled?
  const scrollOffset = $messages.scrollTop + visibleHeight;

  // Auto-scroll if we're at the bottom
  if (containerHeight - newMessageHeight <= scrollOffset + 1) {
    $messages.scrollTop = $messages.scrollHeight;
  }
};

socket.on("message", (msg) => {
  console.log(msg);

  const html = Mustache.render(messageTemplate, {
    username: msg.username,
    msg: msg.text,
    createdAt: moment(msg.createdAt).format("h:mm a"),
  });
  $messages.insertAdjacentHTML("beforeend", html);
  autoScroll();
});

socket.on("location-url", (url) => {
  console.log(url);
});

// location url template

const locationTemplate = document.querySelector("#location-template").innerHTML;
const $locations = document.querySelector("#locations");

socket.on("location-url", (url) => {
  const locationUrl = Mustache.render(locationTemplate, {
    username: url.username,
    url: url.text,
    createdAt: moment(url.createdAt).format("h:mm a"),
  });

  $messages.insertAdjacentHTML("beforeend", locationUrl);
  autoScroll();
});

// elements

const $messageForm = document.querySelector("#msg-form");
const $messageFormInput = $messageForm.querySelector("input");
const $messageFormButton = $messageForm.querySelector("button");

$messageForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const message = e.target.elements.message.value;

  $messageFormButton.setAttribute("disabled", "disabled");

  socket.emit("sendMessage", message, (error) => {
    $messageFormButton.removeAttribute("disabled", "disabled");
    ($messageFormInput.value = ""), $messageFormInput.focus();
    if (error) {
      return console.log("error", error);
    }
    console.log("message was delivered!");
  });
});

const $locationButton = document.querySelector("#location");

$locationButton.addEventListener("click", () => {
  if (!navigator.geolocation) {
    alert("your browser does not support geolocation");
  }
  $locationButton.setAttribute("disabled", "disabled");
  navigator.geolocation.getCurrentPosition((position) => {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    // console.log("latitude " + " " + lat, "longitude " + " " + lon);

    $locationButton.setAttribute("disabled", "disabled");

    socket.emit("shareLocation", lat, lon, (serverMsg) => {
      console.log("location was captured!", "serverMsg:", serverMsg);
      $locationButton.removeAttribute("disabled", "disabled");
    });
  });
});

socket.emit("join", { username, room }, (error) => {
  if (error) {
    alert(error);
    location.href = "/";
  }
});

// sidebar

const sideBarTemplate = document.querySelector("#sidebar-template").innerHTML;

socket.on("roomData", ({ room, users }) => {
  const html = Mustache.render(sideBarTemplate, {
    room,
    users,
  });
  document.querySelector("#sidebar").innerHTML = html;
});
