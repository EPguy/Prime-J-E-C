/*
    GET /api/auth/check
*/


exports.check = (req, res) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).json({
      success: false,
      message: "not logged in"
    });
  }

  jwt.verify(token, secretObj.secret, (err, decoded) => {
    if(err) {
      return res.status(403).json({
        success: false,
        message: err.message
      })
    } else {
      return res.send({
        success: true,
        info: decoded
      })
    }
  });
};

exports.f = (req, res) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).json({
      success: false,
      message: "not logged in"
    });
  }

  jwt.verify(token, secretObj.secret, (err, decoded) => {
    if(err) {
      return res.status(403).json({
        success: false,
        message: err.message
      })
    } else {
      return res.send({
        success: true,
        info: decoded
      })
    }
  });
};