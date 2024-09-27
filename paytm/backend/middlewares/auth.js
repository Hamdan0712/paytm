const express = require("express");
const jwt = require("jsonwebtoken");
const JWT_SECRET = require("../config.js");

const authMiddleware = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    res.status(403).json({
      message: "You are not authenticated",
    });
  }

  try {
    const decodedToken = jwt.verify(token, JWT_SECRET);

    if (decodedToken.userId) {
      req.userId = decodedToken.userId;
      next();
    } else {
      res.status(403).json({
        message: "there was an error while verifiying the token",
      });
    }
  } catch (err) {
    res.status(403).json({
      message: "there was an error while verifiying the token",
    });
  }
};
module.exports = { authMiddleware };
