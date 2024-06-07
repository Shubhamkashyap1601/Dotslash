import mongoose from "mongoose";

const resource = new mongoose.Schema({
    domain: {
        type: String,
        enum: ['cpdsa', 'webdev', 'appdev', 'ml'],
        required: true,
    },
    type: {
        type: String,
        enum: ['books', 'websites', 'videos'],
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    owner: {
        type: String,
    },
    description: {
        type: String,
    },
    link: {
        type: String,
        required: true,
    }
}, {timestamps: true})

export const Resource = mongoose.model("Resource", resource);