import axios from "axios";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import Loader from "@/components/Loaders/Loader";


interface DietPlanProps {
    email: any;
}

const GenerateDietPlan: React.FC<DietPlanProps> = ({ email }) => {
    const [userDetails, setUserDetails] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [userPrompt, setUserPrompt] = useState<string>('');
    const [generatedDietPlan, setGeneratedDietPlan] = useState<any>(null);

    const getUserDetails = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.post('/api/users/getPlans', { email });
            if (response.data.success && response.data.userPlans.dietPlan) {
                setUserDetails(response.data.userPlans.dietPlan);
                toast.success(response.data.message);
            } else {
                setError("No Diet Plan Found");
                toast.error("No Diet Plan found");
            }
        } catch (error: any) {
            setError("Diet Plan Not Found");
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    const generateDietPlan = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.post('/api/genai/dietPlanGenerator', { email, userPrompt });
            if (response.data.success && response.data.dietPlan) {
                setGeneratedDietPlan(response.data.dietPlan);
                toast.success("Diet Plan Generated Successfully");
            } else {
                setError("Failed to Generate Diet Plan");
                toast.error("Failed to Generate Diet Plan");
            }
        } catch (error: any) {
            setError("Error Generating Diet Plan");
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    const saveDietPlan = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.post('/api/users/savePlan', { email, dietPlan: generatedDietPlan });
            if (response.data.success) {
                toast.success("Diet Plan Saved Successfully");
            } else {
                setError("Failed to Save Diet Plan");
                toast.error("Failed to Save Diet Plan");
            }
        } catch (error: any) {
            setError("Error Saving Diet Plan");
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
            <h2 className="text-2xl font-bold mb-4">Generate Diet Plan</h2>
            {loading && <p className="text-blue-500"><Loader /></p>}
            {error && <p className="text-red-500">Error: {error}</p>}
            <textarea
                value={userPrompt}
                onChange={(e) => setUserPrompt(e.target.value)}
                placeholder="Any specific requirements..."
                className="w-full p-2 border rounded mb-4"
            />
            <button
                onClick={generateDietPlan}
                className="bg-blue-500 text-white p-2 rounded w-full mb-4 hover:bg-blue-600 transition"
            >
                Generate Diet Plan
            </button>
            {generatedDietPlan && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="w-full"
                >
                    <h3 className="text-xl font-semibold mb-2">Generated Diet Plan:</h3>
                    <div className="bg-white p-4 rounded-lg shadow-md">
                        {Object.entries(generatedDietPlan.daily_diet_plan).map(([meal, details]: any) => (
                            <motion.div
                                key={meal}
                                className="p-4 mb-4 border-b"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <h4 className="font-bold capitalize mb-2">{meal.replace('_', ' ')}</h4>
                                <p><strong>Dish:</strong> {details.dish}</p>
                                <p><strong>Amount:</strong> {details.amount}</p>
                                <p><strong>Calories:</strong> {details.calories}</p>
                                <div className="mt-2">
                                    <h5 className="font-medium">Nutrients:</h5>
                                    <p><strong>Protein:</strong> {details.nutrients.protein}</p>
                                    <p><strong>Carbohydrates:</strong> {details.nutrients.carbohydrates}</p>
                                    <p><strong>Fat:</strong> {details.nutrients.fat}</p>
                                    <p><strong>Fiber:</strong> {details.nutrients.fiber}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                    <button
                        onClick={saveDietPlan}
                        className="bg-green-500 text-white p-2 rounded w-full mt-4 hover:bg-green-600 transition"
                    >
                        Save Diet Plan
                    </button>
                </motion.div>
            )}
            {userDetails && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="w-full mt-4"
                >
                    <h3 className="text-xl font-semibold mb-2">Saved Diet Plan:</h3>
                    <div className="bg-white p-4 rounded-lg shadow-md">
                        {Object.entries(userDetails.daily_diet_plan).map(([meal, details]: any) => (
                            <motion.div
                                key={meal}
                                className="p-4 mb-4 border-b"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <h4 className="font-bold capitalize mb-2">{meal.replace('_', ' ')}</h4>
                                <p><strong>Dish:</strong> {details.dish}</p>
                                <p><strong>Amount:</strong> {details.amount}</p>
                                <p><strong>Calories:</strong> {details.calories}</p>
                                <div className="mt-2">
                                    <h5 className="font-medium">Nutrients:</h5>
                                    <p><strong>Protein:</strong> {details.nutrients.protein}</p>
                                    <p><strong>Carbohydrates:</strong> {details.nutrients.carbohydrates}</p>
                                    <p><strong>Fat:</strong> {details.nutrients.fat}</p>
                                    <p><strong>Fiber:</strong> {details.nutrients.fiber}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            )}
        </div>
    );
};

export default GenerateDietPlan;
