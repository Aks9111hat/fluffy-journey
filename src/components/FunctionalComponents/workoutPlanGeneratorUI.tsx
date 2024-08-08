"use client"
import axios from "axios";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import Loader from "@/components/Loaders/Loader";


interface WorkoutPlanProps {
    email: any;
}

const GenerateWorkoutPlan: React.FC<WorkoutPlanProps> = ({ email }) => {
    const [userDetails, setUserDetails] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [userPrompt, setUserPrompt] = useState<string>('');
    const [workoutSplit, setWorkoutSplit] = useState<string>('push-pull-legs');
    const [generatedWorkoutPlan, setGeneratedWorkoutPlan] = useState<any>(null);

    const getUserDetails = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.post('/api/users/getPlans', { email });
            if (response.data.success && response.data.userPlans.workoutPlan) {
                setUserDetails(response.data.userPlans.workoutPlan);
                toast.success(response.data.message);
            } else {
                setError("No Workout Plan Found");
                toast.error("No Workout Plan found");
            }
        } catch (error: any) {
            setError("Workout Plan Not Found");
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    const generateWorkoutPlan = async () => {
        setLoading(true);
        setError(null);
        try {
            console.log(email)
            console.log(userPrompt)
            console.log(workoutSplit)
            const response = await axios.post('/api/genai/workoutPlanGenerator', { email, userPrompt, workoutSplit });
            if (response.data.success && response.data.workoutPlan) {
                setGeneratedWorkoutPlan(response.data.workoutPlan);
                toast.success("Workout Plan Generated Successfully");
            } else {
                setError("Failed to Generate Workout Plan");
                toast.error("Failed to Generate Workout Plan");
            }
        } catch (error: any) {
            setError("Error Generating Workout Plan");
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    const saveWorkoutPlan = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.post('/api/users/savePlan', { email, workoutPlan: generatedWorkoutPlan });
            if (response.data.success) {
                toast.success("Workout Plan Saved Successfully");
            } else {
                setError("Failed to Save Workout Plan");
                toast.error("Failed to Save Workout Plan");
            }
        } catch (error: any) {
            setError("Error Saving Workout Plan");
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (email) {
            getUserDetails();
        }
    }, [email]);

    return (
        <div className="flex flex-col gap-4 p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold">Workout Plan Component</h2>
            {loading && <p className="flex text-center"><Loader /></p>}
            {error && <p className="text-red-500">Error: {error}</p>}
            <textarea
                value={userPrompt}
                onChange={(e) => setUserPrompt(e.target.value)}
                placeholder="Any specific requirements..."
                className="p-2 border rounded"
            />
            <select
                value={workoutSplit}
                onChange={(e) => setWorkoutSplit(e.target.value)}
                className="p-2 border rounded"
            >
                <option value="push-pull-legs">Push-Pull-Legs</option>
                <option value="upper-lower-split">Upper-Lower Split</option>
                <option value="double-muscle">Double Muscle</option>
                <option value="full-body">Full Body</option>
                <option value="body-part-split">Body Part Split</option>
            </select>
            <button onClick={generateWorkoutPlan} className="bg-blue-500 text-white p-2 rounded">Generate Workout Plan</button>
            {generatedWorkoutPlan && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <h3 className="text-xl font-bold mt-4">Generated Workout Plan:</h3>
                    <div className="mt-2">
                        {Object.entries(generatedWorkoutPlan.weekly_workout_plan).map(([day, details]: any) => (
                            <div key={day} className="p-2 border-b">
                                <h4 className="font-bold">{day}</h4>
                                <p>Warmup: {details.warmup.exercise} - {details.warmup.duration}</p>
                                {details.main_workout.map((exercise: any, index: number) => (
                                    <p key={index}>Main Workout: {exercise.exercise} - {exercise.sets} sets of {exercise.reps} reps</p>
                                ))}
                                <p>Cooldown: {details.cooldown.exercise} - {details.cooldown.duration}</p>
                            </div>
                        ))}
                    </div>
                    <button onClick={saveWorkoutPlan} className="bg-green-500 text-white p-2 rounded mt-4">Save Workout Plan</button>
                </motion.div>
            )}
            {userDetails && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <h3 className="text-xl font-bold mt-4">Saved Workout Plan:</h3>
                    <div className="mt-2">
                        {Object.entries(userDetails.weekly_workout_plan).map(([day, details]: any) => (
                            <div key={day} className="p-2 border-b">
                                <h4 className="font-bold">{day}</h4>
                                <p>Warmup: {details.warmup.exercise} - {details.warmup.duration}</p>
                                {details.main_workout.map((exercise: any, index: number) => (
                                    <p key={index}>Main Workout: {exercise.exercise} - {exercise.sets} sets of {exercise.reps} reps</p>
                                ))}
                                <p>Cooldown: {details.cooldown.exercise} - {details.cooldown.duration}</p>
                            </div>
                        ))}
                    </div>
                </motion.div>
            )}
        </div>
    );
};

export default GenerateWorkoutPlan;
