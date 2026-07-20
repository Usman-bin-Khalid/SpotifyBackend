require('dotenv').config();

const mongoose = require('mongoose');

async function connectDB() {
   try {
       await mongoose.connect(process.env.MONGO_URI, );
   // '/' is ky bd jo likhyn gyn wo database ka name hoga, agr database exist nhi krta to wo create ho jaye ga
   console.log('Connected to MongoDB');
   } catch (error) {
       console.error('Error connecting to MongoDB:', error);
   }
}




module.exports = connectDB;