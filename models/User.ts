import mongoose, { Document, Model, ObjectId, Schema, Types } from "mongoose";

export interface User extends Document {
    _id: Types.ObjectId;
    name: string;
    email: string;
    password: string;
}

const UserSchema: Schema<User> = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: false,
    }
})

const User: Model<User> = mongoose.models.User || mongoose.model<User>("User", UserSchema);
export default User;