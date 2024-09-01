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

  socket.emit("sendMessage", message);
});
