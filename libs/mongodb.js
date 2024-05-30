import mongoose, { connect } from "mongoose";

const connectMongoDB = async () =>{
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connect to the MongoDB server");
    } catch (error) {
        console.log("Couldn't connect to MongoDB");
    }
}

export default connectMongoDB;