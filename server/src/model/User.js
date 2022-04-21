import mongoose from 'mongoose';

const Schema = mongoose.Schema;

var userSchema = new Schema(
    {
        firstName : { type: String },
        lastName : { type: String },
        email : { type: String },
        password : { type: String },
        persona : { type: String },
})

const User = mongoose.model("User", userSchema);
export default User;
