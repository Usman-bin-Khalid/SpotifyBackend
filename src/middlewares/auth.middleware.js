// Middlewares request ky andr jo bhi data ata hy usko read kr skty hyn
// modify kr skty hyn and also response bhi send krskty hyn

const jwt = require('jsonwebtoken');

async function authArtist (req, res , next)  {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({message : 'Unauthorized'});

    try {
          const decoded = jwt.verify(token, process.env.JWT_SECRET);
          if(decoded.role !== 'artist') {
            return res.status(403).json({message : 'You do not have access'});
          }
          req.user = decoded;
          next();
    } catch (error) {
      return res.status(401).json({message : 'Unauthorized'});
    }
  }
}

async function authUser (req , res , next) {
  const token = req.cookies.token,
  if (!token) {
    res.status(401).json({message : 'Unauthorized'});
  }
  try {
       const decoded = jwt.verify(token , process.env.JWT_SECRET);
       if (decoded.role !== 'artist' && docoded.role !== 'user') {
        return res.status(403).json({message : "You don't have access"});
       }
       req.user = decoded;
       next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({message : 'Unauthorized'});
  }

}
module.exports = {authArtist , authUser};