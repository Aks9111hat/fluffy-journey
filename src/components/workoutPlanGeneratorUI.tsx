import axios from "axios";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

interface WorkoutPlanProps {
    email: any;
}

const GenerateWorkoutPlan: React.FC<WorkoutPlanProps> = ({ email }) => {
    const [userDetails, setUserDetails] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [userPrompt, setUserPrompt] = useState<string>('');
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
            const response = await axios.post('/api/genai/workoutPlanGenerator', { email, userPrompt });
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
            <h2>Workout Plan Component</h2>
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            <textarea
                value={userPrompt}
                onChange={(e) => setUserPrompt(e.target.value)}
                placeholder="Any specific requirements..."
                className="p-2 border rounded"
            />
            <button onClick={generateWorkoutPlan} className="bg-blue-500 text-white p-2 rounded">Generate Workout Plan</button>
            {generatedWorkoutPlan && (
                <div>
                    <h3>Generated Workout Plan:</h3>
                    <div>
                        {Object.entries(generatedWorkoutPlan.weekly_workout_plan).map(([day, details]: any) => (
                            <div key={day} className="p-2 border-b">
                                <h4 className="font-bold">{day}</h4>
                                <p>Warmup: {details.warmup.exercise} - {details.warmup.duration}</p>
                                <p>Main Workout: {details.main_workout.exercise} - {details.main_workout.sets} sets of {details.main_workout.reps} reps</p>
                                <p>Cooldown: {details.cooldown.exercise} - {details.cooldown.duration}</p>
                            </div>
                        ))}
                    </div>
                    <button onClick={saveWorkoutPlan} className="bg-green-500 text-white p-2 rounded mt-4">Save Workout Plan</button>
                </div>
            )}
            {userDetails && (
                <div>
                    <h3>Saved Workout Plan:</h3>
                    <div>
                        {Object.entries(userDetails.weekly_workout_plan).map(([day, details]: any) => (
                            <div key={day} className="p-2 border-b">
                                <h4 className="font-bold">{day}</h4>
                                <p>Warmup: {details.warmup.exercise} - {details.warmup.duration}</p>
                                <p>Main Workout: {details.main_workout.exercise} - {details.main_workout.sets} sets of {details.main_workout.reps} reps</p>
                                <p>Cooldown: {details.cooldown.exercise} - {details.cooldown.duration}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default GenerateWorkoutPlan;
