const mongoose= require('mongoose');
const hello =async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Mongo Db Connected');
    }
    catch(err){
     console.error("❌ MongoDB connection failed:", err.message);
    process.exit(1);
    }
};
module.exports =hello