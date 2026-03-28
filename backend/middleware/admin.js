// const admin = (req, res, next) => {
//   if (req.user.role !== "admin") {
//     return res.status(403).json({ message: "Admin access only" });
//   }
//   next();
// };

// module.exports = admin;

const admin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  }else{
    res.status(401).json({message:"Admin access only"});
  }
};

module.exports = admin;
