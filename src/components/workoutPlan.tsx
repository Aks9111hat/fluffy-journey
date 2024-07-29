// import axios from "axios";
// import { useState, useEffect } from "react";
// import toast from "react-hot-toast";

// interface WorkoutPlanProps {
//     email: any;
// }

// const UserWorkoutPlan: React.FC<WorkoutPlanProps> = ({ email }) => {
//     const [userDetails, setUserDetails] = useState<any>(null);
//     const [loading, setLoading] = useState<boolean>(false);
//     const [error, setError] = useState<string | null>(null);

//     const getUserDetails = async () => {
//         setLoading(true);
//         setError(null);
//         try {
//             const response = await axios.post('/api/users/getPlans', { email: email });
//             if (response.data.success && response.data.userPlans.workoutPlan) {
//                 setUserDetails(response.data.userPlans.workoutPlan);
//                 toast.success(response.data.message);
//             } else {
//                 setError("No Workout Plan Found");
//                 toast.error("No Workout Plan found")
//             }
//         } catch (error: any) {
//             setError(error.message);
//             toast.error(error.message);
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         if (email) {
//             getUserDetails();
//         }
//     }, [email]);

//     return (
//         <div className="flex flex-col gap-4 p-6 bg-white shadow-lg rounded-lg">
//             <h2>Workout Plan Component</h2>
//             {loading && <p>Loading...</p>}
//             {error && <p>Error: {error}</p>}
//             {userDetails && (
//                 <div>
//                     <h3>Workout Plan:</h3>
//                     <div>
//                         {Object.entries(userDetails.weekly_workout_plan).map(([day, plan]: any) => (
//                             <div key={day}>
//                                 <h4>{day}</h4>
//                                 <p>Warmup: {plan.warmup.exercise} for {plan.warmup.duration}, Calories: {plan.warmup.calories}</p>
//                                 <h5>Main Workout:</h5>
//                                 {plan.main_workout.map((exercise: any, index: number) => (
//                                     <div key={index}>
//                                         <p>Exercise: {exercise.exercise}</p>
//                                         <p>Sets: {exercise.sets}</p>
//                                         <p>Reps: {exercise.reps}</p>
//                                         <p>Calories: {exercise.calories}</p>
//                                     </div>
//                                 ))}
//                                 <p>Cooldown: {plan.cooldown.exercise} for {plan.cooldown.duration}, Calories: {plan.cooldown.calories}</p>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default UserWorkoutPlan;

import axios from "axios";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import Loader from "@/components/Loader";

interface WorkoutPlanProps {
    email: any;
}

const UserWorkoutPlan: React.FC<WorkoutPlanProps> = ({ email }) => {
    const [userDetails, setUserDetails] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

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

    useEffect(() => {
        if (email) {
            getUserDetails();
        }
    }, [email]);

    return (
        <div className="flex flex-col items-center p-6 bg-gray-50 shadow-lg rounded-lg w-full max-w-lg mx-auto">
            <h2 className="text-2xl font-bold mb-4">Your Workout Plan</h2>
            {loading && <p className="text-blue-500"><Loader /></p>}
            {error && <p className="text-red-500">Error: {error}</p>}
            {userDetails && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="w-full"
                >
                    {Object.entries(userDetails.weekly_workout_plan).map(([day, plan]: any) => (
                        <motion.div
                            key={day}
                            className="p-4 mb-4 bg-white rounded-lg shadow-md"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <h3 className="text-xl font-semibold capitalize mb-2">{day.replace('_', ' ')}</h3>
                            <div className="mb-2">
                                <h4 className="font-medium">Warmup</h4>
                                <p><strong>Exercise:</strong> {plan.warmup.exercise}</p>
                                <p><strong>Duration:</strong> {plan.warmup.duration}</p>
                                <p><strong>Calories:</strong> {plan.warmup.calories}</p>
                            </div>
                            <div className="mb-2">
                                <h4 className="font-medium">Main Workout</h4>
                                {plan.main_workout.map((exercise: any, index: number) => (
                                    <div key={index} className="mb-2">
                                        <p><strong>Exercise:</strong> {exercise.exercise}</p>
                                        <p><strong>Sets:</strong> {exercise.sets}</p>
                                        <p><strong>Reps:</strong> {exercise.reps}</p>
                                        <p><strong>Calories:</strong> {exercise.calories}</p>
                                    </div>
                                ))}
                            </div>
                            <div>
                                <h4 className="font-medium">Cooldown</h4>
                                <p><strong>Exercise:</strong> {plan.cooldown.exercise}</p>
                                <p><strong>Duration:</strong> {plan.cooldown.duration}</p>
                                <p><strong>Calories:</strong> {plan.cooldown.calories}</p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            )}
        </div>
    );
};

export default UserWorkoutPlan;
