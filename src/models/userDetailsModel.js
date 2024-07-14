import mongoose from "mongoose";

const userDetailSchema = new mongoose.Schema({
    email : {
        type: String,
        required: [true,"Please provide a Email"],
        unique: true,
    },
    dateOfBirth : {
        type: Date,
        required: [true,"Please provide Date of birth"],
    },    
    gender : {
        type: String,
        required: [true,"Please provide a gender"],
    },
    height : {
        type: Number,
        required: [true,"Please provide Height"],
    },    
    weight : {
        type: Number,
        required: [true,"Please provide Weight"],
    },    
    bmi : {
        type: Number,
        required: [true,"Please provide Weight"],
    },    
    country : {
        type: String,
        required: [true,"Please provide a country"],
    },
    noOfMeals : {
        type: Number,
        required: [true,"Please provide Number of Meals"],
    },    
    userHealthGoal : {
        type: String,
        required: [true,"Please provide Health Goal"],
    },
    dietTypePreference : {
        type: String,
        required: [true,"Please provide a diet type"],
    },
    exerciseFrequency : {
        type: Number,
        required: [true,"Please provide a exercise frequency"],
    },
    medicalHistory : {
        type: String,
        required: false,
    },
    profilePicture: {
        type: String, // Store path to the image file
        required: false,
    },
    fitnessLevel: { 
        type: String, 
        required: [true,"Please provide your fitness levels"] 
    },
    preferredWorkoutType: { 
        type: String, 
        required: [true,"Please provide your preferred workout"] 
    },
    timeAvailability: { 
        type: String, 
        required: [true,"Please provide your Time available per day for workout"] 
    },
    equipmentAvailable: { 
        type: String, 
        required: [true,"Please provide your Equipments available to you"] 
    },
})

const userDetail = mongoose.models.userDetails || mongoose.model("userDetails",userDetailSchema)

export default userDetail;