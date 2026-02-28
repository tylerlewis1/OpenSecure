const express = require('express');
const users = require('./users.json');

module.exports = async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const auth = await isAuthenticated(username, password);
    if(!auth.auth) return res.status(401).json({ message: "Invalid credentials" });
    res.json({ message: "Login successful", user: auth });
}
   
const isAuthenticated = (username, password) => {
     const foundUser = users.users.find(u => {
        return u.username === username && u.password === password;
    });
    if(foundUser) {
        return { auth: true, username: foundUser.username, role: foundUser.role };
    } else return { auth: false };
  
}