import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

const isAdmin = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized Access" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY); // Verify JWT
    const user = await User.findOne({ email: decoded.email });

    if (!user || user.role !== 'admin') {
      return res.status(403).json({ message: 'Unauthorized: User is not an admin' });
    }

    req.user = decoded; // Attach user info to request
    next(); // Continue to the protected route
  } catch (error) {
    console.error(error); // Log the error
    return res.status(400).json({ message: 'Invalid token or session expired.' });
  }
};

const isUser = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized Access" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const user = await User.findOne({ email: decoded.email });

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    // Optional: Ensure the user is not an admin
    if (user.role === 'admin') {
      return res.status(403).json({ message: "Admins cannot access user routes" });
    }

    req.user = user;
    next(); // Proceed to next middleware
  } catch (error) {
    console.error(error); // Log the error
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: "Session expired. Please log in again." });
    }
    return res.status(400).json({ message: "Invalid token or session expired." });
  }
};

export { isAdmin, isUser };







// import jwt from 'jsonwebtoken'
// import User from '../models/user.model.js';

// const isAdmin = async (req, res, next) => {
//   const token = req.cookies.token;

//   if (!token) {
//     return res.status(401).json({ message: "Unauthorized Access" });
//   }

//   try {
//     const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY); // Verify JWT
//     const user = await User.findOne(decoded.email)
//     if (user.role !=='admin') {
//       return res.status(403).json({messsage:'Unauthorized: User is not an admin'})
//    }
//     req.user = decoded; // Attach user info to request
//     next(); // Continue to the protected route
//   } catch (error) {
//     console.log(error)
//   }
// };

// const isUser = async (req,res,next)=>{
//   const token = req.cookies.token
//   if(!token)
//   {
//     return res.json(402).json({ message: "Access Denied. No token provided." })
//   }
//   try{
//     const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY)
//     const user = await User.findOne({email:decoded.email})
//     if(!user)
//     {
//       return res.status(401).json({messsage:"'user not found'"})
//     }
//     req.user = user
//     next()
//   }
//   catch(error)
//   {
//     console.log(error)
//     return res.status(400).json({ message: "Invalid token or session expired." });
//   }
// };

// export {isAdmin, isUser}


