interface UserDetailsProps {
    userDetails: any;
}


const UserDetailsInfo: React.FC<UserDetailsProps> = ({ userDetails }) => {
    return (
        <div className="flex flex-col gap-4 p-6 bg-white shadow-lg rounded-lg">
            <img
                src={userDetails.profilePicture || userDetails.gender === 'female' ? '/images/profileWoman.png' : '/images/profileMan.png'}
                alt="Profile Picture"
                className="w-32 h-32 rounded-full object-cover"
            />
            <p><strong>Email:</strong> {userDetails.email}</p>
            <p><strong>Date of Birth:</strong> {userDetails.dateOfBirth ? new Date(userDetails.dateOfBirth).toISOString().split('T')[0] : ""}</p>
            <p><strong>Gender:</strong> {userDetails.gender}</p>
            <p><strong>Height:</strong> {userDetails.height}</p>
            <p><strong>Weight:</strong> {userDetails.weight}</p>
            <p><strong>BMI:</strong> {Math.round(userDetails.bmi * 100) / 100}</p>
            <p><strong>Country:</strong> {userDetails.country}</p>
            <p><strong>Number of Meals:</strong> {userDetails.noOfMeals}</p>
            <p><strong>Health Goal:</strong> {userDetails.userHealthGoal}</p>
            <p><strong>Diet Preference:</strong> {userDetails.dietTypePreference}</p>
            <p><strong>Exercise Frequency:</strong> {userDetails.exerciseFrequency}</p>
            <p><strong>Medical History:</strong> {userDetails.medicalHistory}</p>
            <p><strong>Fitness Level:</strong> {userDetails.fitnessLevel}</p>
            <p><strong>Preferred Workout Type:</strong> {userDetails.preferredWorkoutType}</p>
            <p><strong>Time Availability:</strong> {userDetails.timeAvailability}</p>
            <p><strong>Equipment Available:</strong> {userDetails.equipmentAvailable}</p>
        </div>
    );
};

export default UserDetailsInfo;