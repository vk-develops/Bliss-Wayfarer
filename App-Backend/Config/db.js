import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const connectionOfDb = await mongoose.connect(process.env.MONGO_DB_URI);
        console.log(`Database Connected to ${connectionOfDb.connection.host}`);
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
};

export default connectDB;
