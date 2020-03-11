const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

const password = "secret";
const saltRounds = 10;