import mongoose from "mongoose";

const userPlansSchema = new mongoose.Schema({
    email : {
        type: String,
        required: [true,"Please provide a Email"],
        unique: true,
    },
    dietPlan : {
        type: Object,
        required: false,
    },    
    workoutPlan : {
        type: Object,
        required: false,
    },
})

const userPlans = mongoose.models.userPlans || mongoose.model("userPlans",userPlansSchema)

export default userPlans;