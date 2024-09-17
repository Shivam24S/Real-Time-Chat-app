const generateMessages = (username, text) => {
  return {
    username,
    text,
    createdAt: new Date().getTime(),
  };
};

const generateLocation = (username, url) => {
  return {
    username,
    text: url,
    createdAt: new Date().getTime(),
  };
};

export { generateMessages, generateLocation };
