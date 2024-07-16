import axios from "axios";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

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
        <div className="flex flex-col gap-4 p-6 bg-white shadow-lg rounded-lg">
            <h2>Diet Plan Component</h2>
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            <textarea
                value={userPrompt}
                onChange={(e) => setUserPrompt(e.target.value)}
                placeholder="Any specific requirements..."
                className="p-2 border rounded"
            />
            <button onClick={generateDietPlan} className="bg-blue-500 text-white p-2 rounded">Generate Diet Plan</button>
            {generatedDietPlan && (
                <div>
                    <h3>Generated Diet Plan:</h3>
                    <div>
                        {Object.entries(generatedDietPlan.daily_diet_plan).map(([meal, details]: any) => (
                            <div key={meal} className="p-2 border-b">
                                <h4 className="font-bold">{meal}</h4>
                                <p>Dish: {details.dish}</p>
                                <p>Amount: {details.amount}</p>
                                <p>Calories: {details.calories}</p>
                            </div>
                        ))}
                    </div>
                    <button onClick={saveDietPlan} className="bg-green-500 text-white p-2 rounded mt-4">Save Diet Plan</button>
                </div>
            )}
            {userDetails && (
                <div>
                    <h3>Saved Diet Plan:</h3>
                    <div>
                        {Object.entries(userDetails.daily_diet_plan).map(([meal, details]: any) => (
                            <div key={meal} className="p-2 border-b">
                                <h4 className="font-bold">{meal}</h4>
                                <p>Dish: {details.dish}</p>
                                <p>Amount: {details.amount}</p>
                                <p>Calories: {details.calories}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default GenerateDietPlan;