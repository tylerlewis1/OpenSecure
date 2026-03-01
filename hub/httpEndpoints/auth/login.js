const users = require('./users.json');
const fs = require('fs');
const tokenStore = require(__dirname + '/tokenStore.json');
module.exports = async (req, res) => {
    const username = req.body.username || null;
    const password = req.body.password || null;
    if(!username || !password) return res.status(400).json({ message: "Username and password are required" });
    if(typeof username !== 'string' || typeof password !== 'string') return res.status(400).json({ message: "Username and password must be strings" });
    
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
    await fs.writeFileSync(__dirname + "/tokenStore.json", JSON.stringify(tokenStore, null, 2)).catch(err => {
        console.error("Error writing token store file:", err);
        return;
    });
    return token;
};