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
  } else {
    throw new Error("user not found");
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

export default { addUsers, removeUser, getUserInChatRoom, getUser };
