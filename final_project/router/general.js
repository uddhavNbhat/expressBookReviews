const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
const { addUser, getUsers } = require('./middleware/users');
const public_users = express.Router();

public_users.post("/register", (req, res) => {
  const { username, password } = req.body;
  try {
    if (!username || !password) {
      return res.json("Please enter password or username");
    }
    const users = getUsers();
    if (users.some(user => user.username === username)) {
      return res.json("Username already taken");
    }
    addUser({ username, password });
    return res.status(200).json("Registration successful");
  } catch (err) {
    console.log(err);
    res.status(400).json("400 Error occured! Bad request");
  }
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  try{
    let bookTitles = Object.keys(books).reduce((titles, key) => {
      titles[key] = books[key].title;
      return titles;
    }, {});
    res.status(200).json(bookTitles);
  }
  catch(err){
    console.log(err);
    res.status(400).json("400 Error occured! Bad request");
  }
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  try{
    const isbn = req.params.isbn;
    if(isbn){
      res.status(200).json(books[isbn]);
    }
    else{
      res.status(404).json("ISBN not found");
    }
  }
  catch(err){
    console.log(err);
    res.status(400).json("400 Error occured! Bad request");
  }
 });

// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  try{
    const author = req.params.author;
    for(x in books){
      if(books[x].author === author){
        return res.status(200).json(books[x]);
      }
    }
  }
  catch(err){
    console.log(err);
    res.status(400).json("400 Error occured! Bad request");
  }
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  try{
    const title = req.params.title;
    for(x in books){
      if(books[x].title === title){
        return res.status(200).json(books[x]);
      }
    }
  }
  catch(err){
    console.log(err);
    res.status(400).json("400 Error occured! Bad request");
  }
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.general = public_users;
