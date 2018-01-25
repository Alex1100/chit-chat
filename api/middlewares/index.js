const jwt = require('jsonwebtoken');

const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.body.token || req.params.token;
    const decoded = await jwt.verify(token, process.env.jwtSecret);
    req.decoded = decoded;
    next();
  } catch (e) {
    console.log("ERROR IN MIDDLEWARE: ", e);
    return res.status(403).json({
      errorMessage: "No token provided, must be set on the Verified Header"
    })
  }
};

function VigenereAutokeyCipher(ok, abc) {

  this.encode = (str) => {
    let ignore = 0;
    let key = ok;
    return str.split('').map((z, i) => {
      if(abc.indexOf(z) == -1) {
        ignore++; return z;
      }

      key = key.concat(z);
      return abc[(abc.indexOf(z) + abc.indexOf(key[i - ignore])) % abc.length];
    }).join('');
  };

  this.decode = (str) => {
    let ignore = 0;
    let key = ok;
    return str.split('').map((z, i) => {
      if(abc.indexOf(z) == -1) {
        ignore++;
        return z;
      }

      let ind = abc.indexOf(z) - abc.indexOf(key[i - ignore]);
      let out = abc[ind < 0 ? ind + abc.length : ind];
      key = key.concat(out);
      return out;
    }).join('');
  };
}

module.exports = {
  isAuthenticated,
  VigenereAutokeyCipher
};
