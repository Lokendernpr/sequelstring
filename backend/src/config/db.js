const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/mern_auth',{
            useNewUrlParser : true,
            iserUnifiedTopology: true,
        });
        console.log('Mongodb Connected');
        } catch (error){
            console.error('Failed to connect to MongoDB:', error);
            process.exit(1);
        }
};

module.exports = connectDB