const crypto = require("crypto");

module.exports.hashPassword = (inputPassword, salt) => {
  return(
    crypto
      .createHash("sha512")
      .update(inputPassword + salt)
      .digest("hex")
  )
};

module.exports.hashCode = () => {
  let key_one = crypto.randomBytes(256).toString('hex').substr(100, 5);
  let key_two = crypto.randomBytes(256).toString('hex').substr(100, 5);
  let key_for_verify = key_one + key_two;
  return (
    key_for_verify
  )
}

module.exports.companyCode = () => {
  let key_one = crypto.randomBytes(256).toString('hex').substr(100, 5);
  return (
    key_one
  )
}