import mongoose from "mongoose";

const exerciseStatsSchema = new mongoose.Schema({
    
    email : {
        type: String,
    },
    exerciseName : {
        type: String,
    },
    sets : {
        type: Array,
    },
    // reps : {
    //     type: Number,
    // },
    weight : {
        type: Number,
    },
    
    recordDate:Date,
})

const exerciseStats = mongoose.models.exerciseStats || mongoose.model("exerciseStats",exerciseStatsSchema)

export default exerciseStats;