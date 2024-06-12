const users = [];

const addUser = (user) => {
  users.push(user);
  console.log(users);
};

const getUsers = () => {
  console.log(users);
  return users;
};

module.exports = {
  addUser,
  getUsers
};
