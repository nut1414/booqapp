const { sign, verify } = require("jsonwebtoken");

export default createToken(user);{
  const accessToken = sign({ username : user.username, id : user.UserID },  process.env.JWT_SECRET, { expiresIn: "30d" });
  return async function (res) {
    res.status(200).json({ Token: accessToken });
  }
}