import axios from "axios";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

interface WorkoutPlanProps {
    email: any;
}

const UserWorkoutInfo: React.FC<WorkoutPlanProps> = ({ email }) => {
    const [userDetails, setUserDetails] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const getUserDetails = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.post('/api/users/savePlan', { email: email});
            if (response.data.success && response.data.updatedUser.workoutPlan){
            setUserDetails(response.data.updatedUser.workoutPlan);
            toast.success(response.data.message);
        }else{
            setError("No Workout Plan Found");
            toast.error("No Workout Plan found")
            }
        } catch (error: any) {
            setError(error.message);
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
            {userDetails && (
                <div>
                    <h3>Workout Plan:</h3>
                    <div>
                        {Object.entries(userDetails.weekly_workout_plan).map(([day, plan]: any) => (
                            <div key={day}>
                                <h4>{day}</h4>
                                <p>Warmup: {plan.warmup.exercise} for {plan.warmup.duration}, Calories: {plan.warmup.calories}</p>
                                <h5>Main Workout:</h5>
                                {plan.main_workout.map((exercise: any, index: number) => (
                                    <div key={index}>
                                        <p>Exercise: {exercise.exercise}</p>
                                        <p>Sets: {exercise.sets}</p>
                                        <p>Reps: {exercise.reps}</p>
                                        <p>Calories: {exercise.calories}</p>
                                    </div>
                                ))}
                                <p>Cooldown: {plan.cooldown.exercise} for {plan.cooldown.duration}, Calories: {plan.cooldown.calories}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserWorkoutInfo;
