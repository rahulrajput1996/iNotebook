const jwt = require("jsonwebtoken");
const jwt_secret_string = "rahul is a good boy @#$ papa is my hero";

const fetchuser = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    return res.status(401).send({ error: "pls authenticate valid token" });
  }
  try {
    const mydata = jwt.verify(token, jwt_secret_string);
    req.myolduser = mydata.user;
    next();
  } catch (error) {
    return res.status(401).send({ error: "pls authenticate token" });
  }
};

module.exports = fetchuser;
