const express = require("express");
const app = express();
const jwt = require('jsonwebtoken');
const cors = require('cors');
const { authenticateJWT } = require("./middleware/auth");
const PORT =4000 ;

require('dotenv').config();
app.use(express.json());

app.use(cors());
app.get("/", (req, res) => {
  res.send("Welcome to the home page!");
});

app.get("/details", authenticateJWT, (req, res) => {
  res.json({
    message: "This is a protected route",
    user: req.user 
  });
});


app.post("/login", (req, res) => {
  const { username, password } = req.body;
  
  if (username === "user" && password === "pass") {
    const user = { username: username };
    const token = jwt.sign(user, process.env.Secret_Token  );

    res.json({
      message: "Login successful",
      token: token
    });
  } else {
    res.status(401).json({
      message: "Invalid credentials"
    });
  }
});


app.listen(4000, () => {
  console.log(`Server is running on port ${PORT}`);
});
