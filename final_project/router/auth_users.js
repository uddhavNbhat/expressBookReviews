const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();
const { getUsers,addUser } = require('./middleware/users');
const { authenticate } = require('./middleware/authenticate.js');

const users = getUsers();
const isValid = (username)=>{
  if(!username){
    return false;
  }
  return users.some(user => user.username === username);
}

const authenticatedUser = (username,password)=>{
  if(!username || !password){
    return false;
  }
  return users.some(user => user.username === username && user.password === password);
}

//only registered users can login
regd_users.post("/login", (req, res) => {
  const { username, password } = req.body;
  try {
      if (!isValid(username)) {
          return res.json("Enter a correct username");
      }
      if (!authenticatedUser(username, password)) {
          return res.json("Please enter a correct password");
      }
      const token = jwt.sign({ username }, "fingerprint_customer", { expiresIn: '1h' });
      return res.status(200).json({ message: "Logged in successfully", token });
  } catch (err) {
      console.log(err);
      res.status(400).json("400 Error");
  }
});

// Add a book review
regd_users.put("/auth/review/:isbn", authenticate, (req, res) => {
  const { isbn } = req.params;
  const { review } = req.body;
  const username = req.user.username;
  try {
      if (!books[isbn]) {
          return res.status(404).json({ message: "Book not found" });
      }
      if (!books[isbn].reviews) {
          books[isbn].reviews = {};
      }
      books[isbn].reviews[username] = review;
      return res.status(200).json({ message: "Review added/modified successfully" });
  } catch (err) {
      console.log(err);
      res.status(400).json({ message: "400 Error" });
  }
});
module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
