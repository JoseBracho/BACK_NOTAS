const bcrypt = require("bcrypt");

const generateJsonwebtoken = require("../helpers/generateJsonwebtoken");
const User = require("../models/user.models");

const login = async (req, res) => {
    const body = req.body;
    const { userName, password } = body;  
    try {
      let user = await User.findOne({ userName });
      const validatePassword = bcrypt.compareSync(password, user?.password);
      if (!validatePassword) {
        return res.status(400).json({
          done: false,
          error: "The username or password is incorrect",
        });
      }
      let token = await generateJsonwebtoken(user._id)
      return res.json({ 
        done: true, 
        token 
      });
    } catch (err) {
      return res.status(400).json({
        done: false,
        error: "The username or password is incorrect",
      });
    }    
}

const register = async (req, res) => {
    const body = req.body
    body.password = bcrypt.hashSync(body.password, 10);
    try{
        const user = new User(body)
        const userDB = await user.save();
        return res.status(201).json({
            done: true,
            userDB
        })
    }catch(err){
        return res.status(400).json({
            done: false,
            err
        })
    }
}
module.exports = {
    login,
    register
}