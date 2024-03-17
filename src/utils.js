const brcypt = require ("bcrypt");

const createHash = (password)=>{
    const hashedPassword = brcypt.hashSync(password, brcypt.genSaltSync(10));
    return hashedPassword
}

const isValidPassword = (user, password) =>{
    const isValid = brcypt.compareSync (password, user.password)
    return isValid
}

module.exports = {
    createHash,
    isValidPassword
}