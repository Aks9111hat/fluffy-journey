import axios from "axios";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import Loader from "@/components/Loaders/Loader";
import { Line } from "react-chartjs-2";
import "chart.js/auto"; // Ensure you have chart.js installed

interface ExerciseStatsDisplayProps {
    email: any;
    exerciseName: string;
}

interface Set {
    reps: number;
    weight: number;
}

interface ExerciseStat {
    _id: string;
    sets: Set[];
    recordDate: string;
}

const ExerciseStatsDisplay: React.FC<ExerciseStatsDisplayProps> = ({ email, exerciseName }) => {
    const [stats, setStats] = useState<ExerciseStat[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [startDate, setStartDate] = useState<string>("");
    const [endDate, setEndDate] = useState<string>("");

    const fetchStats = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.post('/api/users/getExerciseStats', { email, exerciseName, startDate, endDate });
            if (response.data.success) {
                setStats(response.data.stats);
                toast.success(response.data.message);
            } else {
                setError("Failed to retrieve exercise stats");
                toast.error("Failed to retrieve exercise stats");
            }
        } catch (error: any) {
            setError("Error retrieving exercise stats");
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (email && exerciseName) {
            fetchStats();
        }
    }, [email, exerciseName, startDate, endDate]);

    const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => setStartDate(e.target.value);
    const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => setEndDate(e.target.value);

    const data = {
        labels: stats.map(stat => new Date(stat.recordDate).toLocaleDateString()),
        datasets: [
            {
                label: "Weight",
                data: stats.map(stat => stat.sets.reduce((total, set) => total + set.weight, 0)),
                borderColor: "rgba(75, 192, 192, 1)",
                backgroundColor: "rgba(75, 192, 192, 0.2)"
            }
        ]
    };

    return (
        <div className="p-4 bg-white rounded shadow-lg w-full max-w-xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Exercise Stats: {exerciseName}</h2>
            <div className="mb-4">
                <label className="block mb-2">Start Date</label>
                <input
                    type="date"
                    value={startDate}
                    onChange={handleStartDateChange}
                    className="w-full p-2 border rounded"
                />
            </div>
            <div className="mb-4">
                <label className="block mb-2">End Date</label>
                <input
                    type="date"
                    value={endDate}
                    onChange={handleEndDateChange}
                    className="w-full p-2 border rounded"
                />
            </div>
            <button
                onClick={fetchStats}
                className="mb-4 w-full py-2 px-4 bg-blue-600 text-white rounded shadow hover:bg-blue-700"
            >
                Fetch Stats
            </button>
            {loading && <Loader />}
            {error && <p className="text-red-500">{error}</p>}
            {stats.length > 0 && (
                <>
                    <div className="mb-4">
                        <Line data={data} />
                    </div>
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white">
                            <thead>
                                <tr>
                                    <th className="py-2">Date</th>
                                    <th className="py-2">Sets</th>
                                    <th className="py-2">Total Weight</th>
                                </tr>
                            </thead>
                            <tbody>
                                {stats.map(stat => (
                                    <tr key={stat._id} className="text-center">
                                        <td className="py-2">{new Date(stat.recordDate).toLocaleDateString()}</td>
                                        <td className="py-2">{stat.sets.length}</td>
                                        <td className="py-2">{stat.sets.reduce((total, set) => total + set.weight, 0)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </>
            )}
        </div>
    );
};

export default ExerciseStatsDisplay;
