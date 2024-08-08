import axios from "axios";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import Loader from "@/components/Loaders/Loader";

interface DietPlanProps {
    email: any;
}

const UserDietPlan: React.FC<DietPlanProps> = ({ email }) => {
    const [userDetails, setUserDetails] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [selectedMeal, setSelectedMeal] = useState<any>(null);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [totals, setTotals] = useState<any>({ calories: 0, protein: 0, carbohydrates: 0, fat: 0, fiber: 0 });

    const getUserDetails = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.post('/api/users/getPlans', { email: email });
            if (response.data.success && response.data.userPlans.dietPlan) {
                const dietPlan = response.data.userPlans.dietPlan;
                setUserDetails(dietPlan);
                calculateTotals(dietPlan);
                toast.success(response.data.message);
            } else {
                setError("No Diet Plan Found");
                toast.error(response.data.message);
            }
        } catch (error: any) {
            setError("Diet Plan Not Found");
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    const calculateTotals = (dietPlan: any) => {
        const totals = { calories: 0, protein: 0, carbohydrates: 0, fat: 0, fiber: 0 };
        Object.values(dietPlan.daily_diet_plan).forEach((meal: any) => {
            totals.calories += meal.calories;
            totals.protein += parseInt(meal.nutrients.protein);
            totals.carbohydrates += parseInt(meal.nutrients.carbohydrates);
            totals.fat += parseInt(meal.nutrients.fat);
            totals.fiber += parseInt(meal.nutrients.fiber);
        });
        setTotals(totals);
    };

    useEffect(() => {
        if (email) {
            getUserDetails();
        }
    }, [email]);

    const handleMealClick = (meal: any) => {
        setSelectedMeal(meal);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedMeal(null);
    };

    return (
        <div className="flex flex-col items-center p-6 bg-gray-50 shadow-lg rounded-lg w-full max-w-lg mx-auto">
            <h2 className="text-2xl font-bold mb-4">Your Diet Plan</h2>
            {loading && <p className="text-blue-500"><Loader /></p>}
            {error && <p className="text-red-500">Error: {error}</p>}
            {userDetails && (
                <div className="w-full">                    
                    {Object.keys(userDetails.daily_diet_plan).map((mealKey: any) => (
                        <button
                            key={mealKey}
                            onClick={() => handleMealClick(userDetails.daily_diet_plan[mealKey])}
                            className="w-full p-2 mb-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                        >
                            {mealKey.replace('_', ' ')}
                        </button>
                    ))}
                    <div className="mb-4 p-4 bg-white rounded-lg shadow-md">
                        <h3 className="text-xl font-semibold mb-2">Total Nutritional Intake</h3>
                        <p><strong>Total Calories:</strong> {totals.calories} kcal</p>
                        <p><strong>Total Protein:</strong> {totals.protein} grams</p>
                        <p><strong>Total Carbohydrates:</strong> {totals.carbohydrates} grams</p>
                        <p><strong>Total Fat:</strong> {totals.fat} grams</p>
                        <p><strong>Total Fiber:</strong> {totals.fiber} grams</p>
                    </div>
                </div>
            )}

            {showModal && selectedMeal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md"
                    >
                        <h3 className="text-xl font-semibold mb-2">{selectedMeal.dish}</h3>
                        <p><strong>Amount:</strong> {selectedMeal.amount}</p>
                        <p><strong>Calories:</strong> {selectedMeal.calories}</p>
                        <div className="mt-2">
                            <h4 className="font-medium">Nutrients:</h4>
                            <p><strong>Protein:</strong> {selectedMeal.nutrients.protein}</p>
                            <p><strong>Carbohydrates:</strong> {selectedMeal.nutrients.carbohydrates}</p>
                            <p><strong>Fat:</strong> {selectedMeal.nutrients.fat}</p>
                            <p><strong>Fiber:</strong> {selectedMeal.nutrients.fiber}</p>
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

export default UserDietPlan;

