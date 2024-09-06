const users = [];

// addUsers

const addUsers = ({ id, username, room }) => {
  // clean the data
  const userName = username.trim().toLowerCase();
  const Room = room.trim().toLowerCase();

  //   validate data
  if (!userName || !Room) {
    return {
      error: "username and room are required",
    };
  }

  // check for existing user
  const existingUser = users.find((user) => {
    return user.username === userName && user.room === Room;
  });

  if (existingUser) {
    return {
      error: "user already in use",
    };
  }

  //   storing the user
  const user = { id, username: userName, room: Room };
  users.push(user);
  return { user };
};

// remove user

const removeUser = (id) => {
  const index = users.findIndex((user) => user.id === id);

  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
};

// get user

const getUser = (id) => {
  const user = users.find((user) => user.id === id);
  return user;
};

//get User in chat room

const getUserInChatRoom = (room) => {
  return users.filter((user) => user.room === room);
};

// checking

// clean the data
addUsers({
  id: 1,
  username: "  Shiv",
  room: "   Random",
});

console.log(users);

// check for existing user
const res = addUsers({
  id: 2,
  username: "shiv",
  room: "random",
});

console.log(res);

// validate data is no data provided
const res3 = addUsers({ id: 33, username: "", room: "" });
console.log(res3);

//adding new user in trim and lower case
const res4 = addUsers({
  id: 4,
  username: "   SSS",
  room: "      abcd",
});

console.log(res4);
console.log(users);

// checking for remove user

const removeRes = removeUser(4);

console.log("removed user", removeRes);
console.log("left user", users);

// get user checking

const gettingUser = getUser(1);

console.log("getting user", gettingUser);

// checking for getUserInChatRoom

const sameRoom = addUsers({
  id: 5,
  username: "shivay",
  room: "random",
});

const gettingSameRoomUser = getUserInChatRoom("random");

console.log("gettingSameRoomUser", gettingSameRoomUser);
