const mongoose = require('mongoose')
const userModel = require('./../models/users.model')
const messageTypes = require('../../responses')
const _ = require('lodash')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config({ path: './config/config.env' });

class Users {
  constructor() {
    this.message = messageTypes.user
  }
  //user signup
  signUp = async (req, res) => {
    try {
      const { username, email, password, age, address } = req.body
      var salt = bcrypt.genSaltSync(parseInt(process.env.SALT))
      var hashPassword = bcrypt.hashSync(password, salt)

      let newUser = await userModel.create({
        username: username,
        email: email,
        phoneNumber: req.body.phoneNumber,
        age: req.body.age,
        address: req.body.address,
        password: hashPassword,
      })
      if (newUser) {
        return res
          .status(201)
          .json({
            message: this.message.userCreatedSuccessfully,
            data: newUser,
          })
      } else {
        return res.status(409).json({ message: 'User not created!!' })
      }
    } catch (err) {
      console.log(err)
      return res.status(500).json({ message: 'Internal Server Error!!' })
    }
  };

  //user login
  login = async (req, res) => {
    try {
      const payload = {
        _id: req.user._id,
        email: req.user.email,
        password: req.user.password,
      }
      const token = jwt.sign(payload, 'thisistheonlineassignmentforbinaryveda', { expiresIn: 86400 });
      payload['token'] = token;
      if (token) {
        await userModel.updateOne({ email: payload.email }, { $set: { token: token } })

        return res.status(200).json({ message: this.message.userLoggedInSuccessfully, data: payload })
      }
    } catch (err) {
      return res.status(500).send({ message: "Internal Server error !!" })
    }
  }
}

module.exports = new Users()
