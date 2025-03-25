import mongoose from "mongoose";
import { v4 as uuid } from 'uuid';
import { UserInDB } from "../types";

const UserSchema = new mongoose.Schema<UserInDB>({
    id: { type: String, default: uuid, unique: true },
    username: {
        type: String,
        required: true,
        unique: true 
    },
    password: {
        type: String,
        required: true
    }
});

const userModel = mongoose.model('User', UserSchema);

export default userModel;