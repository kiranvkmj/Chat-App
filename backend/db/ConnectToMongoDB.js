import mongoose  from "mongoose";

const connectToMongoDB= async()=>{
    try {
        await mongoose.connect(process.env.MONGO_DB_URI);
        console.log("connected to mongodb");
    } catch (error) {
        console.log("error has occured",error.message);
    }

}
export default connectToMongoDB;
// 27017


// // A script to clean up the database
// import mongoose from 'mongoose';
// import User from './models/user.model.js';

// (async () => {
//   await mongoose.connect('mongodb://localhost:5000/chat-app-db', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   });

//   await User.deleteMany({ username: { $in: [null, ""] } });

//   console.log('Cleanup complete');
//   process.exit(0);
// })();


