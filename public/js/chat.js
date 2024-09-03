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

document.querySelector("#msg-form").addEventListener("submit", (e) => {
  e.preventDefault();

  const message = e.target.elements.message.value;

  socket.emit("sendMessage", message, (error) => {
    if (error) {
      return console.log("error", error);
    }
    console.log("message was delivered!");
  });
});

document.querySelector("#location").addEventListener("click", () => {
  if (!navigator.geolocation) {
    alert("your browser does not support geolocation");
  }

  navigator.geolocation.getCurrentPosition((position) => {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    // console.log("latitude " + " " + lat, "longitude " + " " + lon);

    socket.emit("shareLocation", lat, lon, (serverMsg) => {
      console.log("location was captured!", "serverMsg:", serverMsg);
    });
  });
});
