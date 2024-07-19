// //Component to render Diet plan (It requires email in the prop)

// import axios from "axios";
// import { useState, useEffect } from "react";
// import toast from "react-hot-toast";

// interface DietPlanProps {
//     email: any;
// }

// const UserDietPlan: React.FC<DietPlanProps> = ({ email }) => {
//     const [userDetails, setUserDetails] = useState<any>(null);
//     const [loading, setLoading] = useState<boolean>(false);
//     const [error, setError] = useState<string | null>(null);

//     const getUserDetails = async () => {
//         setLoading(true);
//         setError(null);
//         try {
//             const response = await axios.post('/api/users/getPlans', { email: email });
//             if (response.data.success && response.data.userPlans.dietPlan) {
//                 setUserDetails(response.data.userPlans.dietPlan);
//                 toast.success(response.data.message);
//             } else {
//                 setError("No Diet Plan Found");
//                 toast.error(response.data.message)
//             }
//         } catch (error: any) {
//             setError("Diet Plan Not Found");
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
//             <h2>Diet Plan Component</h2>
//             {loading && <p>Loading...</p>}
//             {error && <p>Error: {error}</p>}
//             {userDetails && (
//                 <div>
//                     <h3>Diet Plan:</h3>
//                     <div>
//                         {Object.entries(userDetails.daily_diet_plan).map(([meal, details]: any) => (
//                             <div key={meal}>
//                                 <h4>{meal}</h4>
//                                 <p>Dish: {details.dish}</p>
//                                 <p>Amount: {details.amount}</p>
//                                 <p>Calories: {details.calories}</p>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default UserDietPlan;

import axios from "axios";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import Loader from "@/components/Loader";


interface DietPlanProps {
    email: any;
}

const UserDietPlan: React.FC<DietPlanProps> = ({ email }) => {
    const [userDetails, setUserDetails] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const getUserDetails = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.post('/api/users/getPlans', { email: email });
            if (response.data.success && response.data.userPlans.dietPlan) {
                setUserDetails(response.data.userPlans.dietPlan);
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

    useEffect(() => {
        if (email) {
            getUserDetails();
        }
    }, [email]);

    return (
        <div className="flex flex-col items-center p-6 bg-gray-50 shadow-lg rounded-lg w-full max-w-lg mx-auto">
            <h2 className="text-2xl font-bold mb-4">Your Diet Plan</h2>
            {loading && <p className="text-blue-500"><Loader /></p>}
            {error && <p className="text-red-500">Error: {error}</p>}
            {userDetails && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="w-full"
                >
                    {Object.entries(userDetails.daily_diet_plan).map(([meal, details]: any) => (
                        <motion.div
                            key={meal}
                            className="p-4 mb-4 bg-white rounded-lg shadow-md"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <h3 className="text-xl font-semibold capitalize mb-2">{meal.replace('_', ' ')}</h3>
                            <p><strong>Dish:</strong> {details.dish}</p>
                            <p><strong>Amount:</strong> {details.amount}</p>
                            <p><strong>Calories:</strong> {details.calories}</p>
                            <div className="mt-2">
                                <h4 className="font-medium">Nutrients:</h4>
                                <p><strong>Protein:</strong> {details.nutrients.protein}</p>
                                <p><strong>Carbohydrates:</strong> {details.nutrients.carbohydrates}</p>
                                <p><strong>Fat:</strong> {details.nutrients.fat}</p>
                                <p><strong>Fiber:</strong> {details.nutrients.fiber}</p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            )}
        </div>
    );
};

export default UserDietPlan;
