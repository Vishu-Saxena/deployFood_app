const bcrypt = require('bcrypt');

// fucntion to hash password
const hashPassword = async(password)=>{
    try {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password , saltRounds);
        return hashedPassword;
    } catch (error) {
        console.log(error);
        console.log("error in hashing password");
    }
}

const comparePassword = async(userpassword , hpassword)=>{
    try {
        const compare = await bcrypt.compare(userpassword , hpassword);
        console.log(compare);
        return compare;
    } catch (error) {
        console.log(error);
        console.log("error in comparing password");
    }
}

module.exports = {hashPassword , comparePassword};