import mongoose from "mongoose";

const Schema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        max: 1000
    },
    // nombre: {
    //     type: String,
    //     required: true,
    //     max: 1000
    // },
    // apellido: {
    //     type: String,
    //     required: true,
    //     max: 1000
    // },
    // email: {
    //     type: String,
    //     required: true,
    //     max: 100
    // },
    created_at: {
        type: Date,
        required: true
    },
    // updated_at: {
    //     type: Date
    // },
    password: {
        type: String,
        required: true,
        max: 10000
    }
});

export const UserModel = mongoose.model("User", Schema);