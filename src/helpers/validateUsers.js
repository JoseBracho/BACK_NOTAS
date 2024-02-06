const User = require("../models/user.models");

const nameValidator = (name = "") => {
    const phrase = new RegExp(/^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/);
    const validating = phrase.test(name);
    if(!validating){
        throw new Error("Invalid name");
    }else{
        return true;
    }
}
const nameUpdate = async (name = "") => {
    const phrase = new RegExp(/^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/);
    const validating = phrase.test(name);
    if(!validating && name != ""){
        throw new Error("Invalid name");
    }else{
        return true;
    }
}
const userNameValidator = async (userName = "") => {
    const phrase = new RegExp(/\s/);
    const validating = phrase.test(userName.trim());
    if(validating){
        throw new Error("Invalid username: Blanks are not accepted");
    } 
    const user = await User.findOne( { userName } );
    if(user){
        throw new Error("UserName already exists");
    }
    return true;
}

const passwordValidator = (password = "") => {
    const phrase = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{6,}/);
    const validating = phrase.test(password);
    if(!validating){
        throw new Error("Invalid password: its length must be greater than 5 digits, it must contain a lowercase, an uppercase, a number and a special character");
    }else{
        return true;
    }
}
module.exports = {
    nameValidator,
    nameUpdate,
    userNameValidator,
    passwordValidator
}