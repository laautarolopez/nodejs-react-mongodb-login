import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://root:root@cluster0.c3uekw4.mongodb.net/?retryWrites=true&w=majority');
        console.log('DB is conected');
    } catch(error) {
        console.log(error);
    }
}