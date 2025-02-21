import mongoose from "mongoose";
async function DBconnection(){
  try{
    const conn = await mongoose.connect(process.env.MONGO_URI)
    console.log(process.env.MONGO_URI)
    console.log(conn.connection.host)
  }
  catch(error){
    console.log("MongoDb connection failed",messagee)
    process.exit(1)
  }
}

export default DBconnection
