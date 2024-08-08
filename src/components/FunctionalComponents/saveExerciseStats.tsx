import { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import Loader from '@/components/Loaders/Loader';

interface ExerciseStatsProps {
    email: any;
    exerciseName: string;
}

interface Set {
    reps: number;
    weight: number;
}

const ExerciseStats: React.FC<ExerciseStatsProps> = ({ email, exerciseName }) => {
    const [numSets, setNumSets] = useState<number>(0);
    const [sets, setSets] = useState<Set[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleNumSetsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value, 10);
        setNumSets(value);
        setSets(Array.from({ length: value }, () => ({ reps: 0, weight: 0 })));
    };

    const handleSetChange = (index: number, field: keyof Set, value: number) => {
        const updatedSets = sets.map((set, i) =>
            i === index ? { ...set, [field]: value } : set
        );
        setSets(updatedSets);
    };

    const handleSubmit = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.post('/api/users/saveExerciseStats', { email, exerciseName, sets });
            if (response.data.success) {
                toast.success('Exercise stats saved successfully!');
                setNumSets(0)
            } else {
                setError('Failed to save exercise stats');
                toast.error('Failed to save exercise stats');
                setNumSets(0)
            }
        } catch (error: any) {
            setError('Error saving exercise stats');
            toast.error(error.message);
            setNumSets(0)
        } finally {
            setLoading(false);
            setNumSets(0)
        }
    };

    return (
        <div className="flex flex-col items-center p-6 bg-gray-50 shadow-lg rounded-lg w-full max-w-lg mx-auto">
            <h2 className="text-2xl font-bold mb-4">Record Exercise Stats</h2>
            <h2 className="text-xl font-semibold mb-4">{exerciseName}</h2>
            {loading && <p className="text-blue-500"><Loader /></p>}
            {error && <p className="text-red-500">Error: {error}</p>}
            <div className="w-full mb-4">
                <label htmlFor="numSets" className="block text-sm font-medium text-gray-700">
                    Number of Sets
                </label>
                <input
                    type="number"
                    id="numSets"
                    className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    value={numSets}
                    onChange={handleNumSetsChange}
                    min={0}
                />
            </div>
            {sets.map((set, index) => (
                <div key={index} className="flex space-x-4 mb-4 w-full">
                    <div className="w-1/2">
                        <label htmlFor={`reps-${index}`} className="block text-sm font-medium text-gray-700">
                            Reps
                        </label>
                        <input
                            type="number"
                            id={`reps-${index}`}
                            className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            value={set.reps}
                            onChange={(e) => handleSetChange(index, 'reps', parseInt(e.target.value, 10))}
                            min={0}
                        />
                    </div>
                    <div className="w-1/2">
                        <label htmlFor={`weight-${index}`} className="block text-sm font-medium text-gray-700">
                            Weight
                        </label>
                        <input
                            type="number"
                            id={`weight-${index}`}
                            className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            value={set.weight}
                            onChange={(e) => handleSetChange(index, 'weight', parseInt(e.target.value, 10))}
                            min={0}
                        />
                    </div>
                </div>
            ))}
            <button
                type="button"
                className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                onClick={handleSubmit}
            >
                Save
            </button>
        </div>
    );
};

export default ExerciseStats;
