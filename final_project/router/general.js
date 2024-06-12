const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
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
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.general = public_users;
