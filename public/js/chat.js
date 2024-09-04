const socket = io();

// socket.on("countUpdated", (count) => {
//   console.log("count has been updated", count);
// });

// document.querySelector("#increment").addEventListener("click", (count) => {
//   socket.emit("increment", count);
// });

// rendering messages

const messageTemplate = document.querySelector("#message-template").innerHTML;
const $messages = document.querySelector("#messages");

socket.on("message", (msg) => {
  console.log(msg);

  const html = Mustache.render(messageTemplate, {
    msg,
  });
  $messages.insertAdjacentHTML("beforeend", html);
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

// const socket = io();

// // socket.on("countUpdated", (count) => {
// //   console.log("count has been updated", count);
// // });

// // document.querySelector("#increment").addEventListener("click", (count) => {
// //   socket.emit("increment", count);
// // });

// // rendering messages
// const messageTemplate = document.querySelector("#message-template").innerHTML;
// const $messages = document.querySelector("#messages");

// // elements
// const $messageForm = document.querySelector("#msg-form");
// const $messageFormInput = $messageForm.querySelector("input");
// const $messageFormButton = $messageForm.querySelector("button");

// socket.on("message", (msg) => {
//   console.log(msg);

//   const html = Mustache.render(messageTemplate, { msg });
//   $messages.insertAdjacentHTML("beforeend", html);
// });

// $messageForm.addEventListener("submit", (e) => {
//   e.preventDefault();

//   const message = e.target.elements.message.value;

//   $messageFormButton.setAttribute("disabled", "disabled");

//   socket.emit("sendMessage", message, (error) => {
//     $messageFormButton.removeAttribute("disabled");

//     $messageFormInput.value = "";
//     $messageFormInput.focus();

//     if (error) {
//       return console.log("Error:", error);
//     }
//     console.log("Message was delivered!");
//   });
// });

// const $locationButton = document.querySelector("#location");

// $locationButton.addEventListener("click", () => {
//   if (!navigator.geolocation) {
//     return alert("Your browser does not support geolocation");
//   }

//   $locationButton.setAttribute("disabled", "disabled");

//   navigator.geolocation.getCurrentPosition((position) => {
//     const lat = position.coords.latitude;
//     const lon = position.coords.longitude;

//     socket.emit("shareLocation", lat, lon, (serverMsg) => {
//       console.log("Location was captured!", "ServerMsg:", serverMsg);
//       $locationButton.removeAttribute("disabled");
//     });
//   });
// });
