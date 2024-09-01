const socket = io();

socket.on("countUpdated", (count) => {
  console.log("count has been updated", count);
});

document.querySelector("#increment").addEventListener("click", (count) => {
  socket.emit("increment", count);
});
