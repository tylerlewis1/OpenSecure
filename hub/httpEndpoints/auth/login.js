const express = require('express');
const users = require('./users.json');
const fs = require('fs');
const { create } = require('domain');
const tokenStore = require(__dirname + '/tokenStore.json');
module.exports = async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const auth = await isAuthenticated(username, password);
    if(!auth.auth) return res.status(401).json({ message: "Invalid credentials" });
    const token = await gennerateToken(auth);
    res.json({ message: "Login successful", user: auth, token });
}
   
const isAuthenticated = (username, password) => {
     const foundUser = users.users.find(u => {
        return u.username === username && u.password === password;
    });
    if(foundUser) {
        return { auth: true, username: foundUser.username, role: foundUser.role };
    } else return { auth: false };
}

const gennerateToken = async(user) => {
    const token = Math.random().toString(36).substring(2);
    tokenStore.tokens.push({ 
        token, 
        username: user.username, 
        role: user.role,
        createdAt: new Date().toISOString()
    });
    await fs.writeFileSync(__dirname + "/tokenStore.json", JSON.stringify(tokenStore, null, 2));
    return token;
};