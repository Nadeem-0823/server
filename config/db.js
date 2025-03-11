import mongoose from "mongoose";
import colors from 'colors';

const connectDB = async ()=>{

    try {
        await mongoose.connect(process.env.mongoURL);
        console.log(`Database Connected: ${mongoose.connection.host}`);
    } catch (error) {
        console.log(`Connection Error: ${error}`.bgRed.white);
        process.exit(1);
    }

};

export default connectDB;