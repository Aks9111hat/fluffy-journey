//Component to render Diet plan (It requires email in the prop)

import axios from "axios";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

interface DietPlanProps {
    email: any;
}

const UserDetailsInfo: React.FC<DietPlanProps> = ({ email }) => {
    const [userDetails, setUserDetails] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const getUserDetails = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.post('/api/users/savePlan', { email: email });
            if (response.data.success && response.data.updatedUser.dietPlan) {
                setUserDetails(response.data.updatedUser.dietPlan);
                toast.success(response.data.message);
            } else {
                setError("No Diet Plan Found");
                toast.error("No Diet Plan found")
            }
        } catch (error: any) {
            setError("Diet Plan Not Found");
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
            {userDetails && (
                <div>
                    <h3>Diet Plan:</h3>
                    <div>
                        {Object.entries(userDetails.daily_diet_plan).map(([meal, details]: any) => (
                            <div key={meal}>
                                <h4>{meal}</h4>
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

export default UserDetailsInfo;
