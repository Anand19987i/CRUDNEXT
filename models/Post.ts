import mongoose, { Model, Document, Schema, Types } from "mongoose";
import { User } from "./User";

export interface IPost extends Document {
    _id: string;
    title: string;
    content: string;
    author: string | User;
    createdAt: string;
    updatedAt: string;
}

const PostSchema: Schema<IPost> = new Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: false,
    }
}, { timestamps: true })

const Post: Model<IPost> = mongoose.models.Post || mongoose.model<IPost>("Post", PostSchema);
export default Post;