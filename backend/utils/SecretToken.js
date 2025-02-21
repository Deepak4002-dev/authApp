import jwt from 'jsonwebtoken'

const tokenGeneration = (data)=>{
  return jwt.sign(data,process.env.JWT_SECRET_KEY,{expiresIn: "1h" })
}

export default tokenGeneration


