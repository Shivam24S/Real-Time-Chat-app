const socket = io();

// socket.on("countUpdated", (count) => {
//   console.log("count has been updated", count);
// });

// document.querySelector("#increment").addEventListener("click", (count) => {
//   socket.emit("increment", count);
// });

socket.on("message", (msg) => {
  console.log(msg);
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
    });
    $locationButton.removeAttribute("disabled", "disabled");
  });
});
