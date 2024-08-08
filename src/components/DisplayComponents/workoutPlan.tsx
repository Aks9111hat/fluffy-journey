import axios from "axios";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import Loader from "@/components/Loaders/Loader";
import ExerciseStats from "@/components/FunctionalComponents/saveExerciseStats";
import ExerciseStatsDisplay from "@/components/DisplayComponents/ExerciseStats";

interface WorkoutPlanProps {
    email: any;
}

const UserWorkoutPlan: React.FC<WorkoutPlanProps> = ({ email }) => {
    const [userDetails, setUserDetails] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [selectedDay, setSelectedDay] = useState<any>(null);
    const [selectedDayKey, setSelectedDayKey] = useState<string | null>(null);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [showExerciseStats, setShowExerciseStats] = useState<{ [key: string]: boolean }>({});
    const [showExerciseStatsDisplay, setShowExerciseStatsDisplay] = useState<{ [key: string]: boolean }>({});

    const toggleExerciseStats = (exerciseName: string) => {
        setShowExerciseStats(prevState => ({
            ...prevState,
            [exerciseName]: !prevState[exerciseName]
        }));
    };

    const toggleExerciseStatsDisplay = (exerciseName: string) => {
        setShowExerciseStatsDisplay(prevState => ({
            ...prevState,
            [exerciseName]: !prevState[exerciseName]
        }));
    };

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

    const handleDayClick = (dayKey: string, day: any) => {
        setSelectedDay(day);
        setSelectedDayKey(dayKey);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedDay(null);
        setSelectedDayKey(null);
    };

    return (
        <div className="flex flex-col items-center p-6 bg-gray-50 shadow-lg rounded-lg w-full max-w-lg mx-auto">
            <h2 className="text-2xl font-bold mb-4">Your Workout Plan</h2>
            {loading && <p className="text-blue-500"><Loader /></p>}
            {error && <p className="text-red-500">Error: {error}</p>}
            {userDetails && (
                <div className="w-full">
                    {Object.keys(userDetails.weekly_workout_plan).map((dayKey: any) => (
                        <button
                            key={dayKey}
                            onClick={() => handleDayClick(dayKey, userDetails.weekly_workout_plan[dayKey])}
                            className="w-full p-2 mb-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                        >
                            {dayKey.replace('_', ' ')}
                        </button>
                    ))}
                </div>
            )}

            {showModal && selectedDay && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md max-h-screen overflow-y-auto"
                    >
                        <h3 className="text-xl font-semibold capitalize mb-2">{selectedDayKey?.replace('_', ' ')}</h3>
                        <div className="mb-2">
                            <h4 className="font-medium">Warmup</h4>
                            <p><strong>Exercise:</strong> {selectedDay.warmup.exercise}</p>
                            <p><strong>Duration:</strong> {selectedDay.warmup.duration}</p>
                            <p><strong>Calories:</strong> {selectedDay.warmup.calories}</p>
                            {/* <button
                                onClick={() => toggleExerciseStats(selectedDay.warmup.exercise)}
                                className="mt-2 bg-green-500 text-white p-2 rounded-lg hover:bg-green-600"
                            >
                                {showExerciseStats[selectedDay.warmup.exercise] ? 'Hide' : 'Record Stats'}
                            </button>
                            {showExerciseStats[selectedDay.warmup.exercise] && (
                                <ExerciseStats email={email} exerciseName={selectedDay.warmup.exercise} />
                            )} */}
                        </div>

                        <div className="mb-2">
                            <h4 className="font-medium">Main Workout</h4>
                            {selectedDay.main_workout.map((exercise: any, index: number) => (
                                <div key={index} className="mb-2">
                                    <p><strong>Exercise:</strong> {exercise.exercise}</p>
                                    <p><strong>Sets:</strong> {exercise.sets}</p>
                                    <p><strong>Reps:</strong> {exercise.reps}</p>
                                    <p><strong>Calories:</strong> {exercise.calories}</p>
                                    <button
                                        onClick={() => toggleExerciseStats(exercise.exercise)}
                                        className="mt-2 bg-green-500 text-white p-2 rounded-lg hover:bg-green-600"
                                    >
                                        {showExerciseStats[exercise.exercise] ? 'Hide' : 'Record Stats'}
                                    </button>
                                    {showExerciseStats[exercise.exercise] && (
                                        <ExerciseStats email={email} exerciseName={exercise.exercise} />
                                    )}
                                    <button
                                        onClick={() => toggleExerciseStatsDisplay(exercise.exercise)}
                                        className="mt-2 bg-purple-500 text-white p-2 rounded-lg hover:bg-purple-600"
                                    >
                                        {showExerciseStatsDisplay[exercise.exercise] ? 'Hide Stats' : 'View Stats'}
                                    </button>
                                    {showExerciseStatsDisplay[exercise.exercise] && (
                                        <ExerciseStatsDisplay email={email} exerciseName={exercise.exercise} />
                                    )}
                                    
                                </div>
                            ))}
                        </div>

                        <div>
                            <h4 className="font-medium">Cooldown</h4>
                            <p><strong>Exercise:</strong> {selectedDay.cooldown.exercise}</p>
                            <p><strong>Duration:</strong> {selectedDay.cooldown.duration}</p>
                            <p><strong>Calories:</strong> {selectedDay.cooldown.calories}</p>
                            {/* <button
                                onClick={() => toggleExerciseStats(selectedDay.cooldown.exercise)}
                                className="mt-2 bg-green-500 text-white p-2 rounded-lg hover:bg-green-600"
                            >
                                {showExerciseStats[selectedDay.cooldown.exercise] ? 'Hide' : 'Record Stats'}
                            </button>
                            {showExerciseStats[selectedDay.cooldown.exercise] && (
                                <ExerciseStats email={email} exerciseName={selectedDay.cooldown.exercise} />
                            )} */}
                        </div>

                        <button
                            onClick={closeModal}
                            className="mt-4 bg-red-500 text-white p-2 rounded-lg hover:bg-red-600"
                        >
                            Close
                        </button>
                    </motion.div>
                </div>
            )}
        </div>
    );
};

export default UserWorkoutPlan;
