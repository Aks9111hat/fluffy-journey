import { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import axios from "axios";
import { useUser } from "@/contexts/userContext";
import { useRouter } from "next/navigation";


const UserDetailsForm = () => {
    const router = useRouter();
    const { user } = useUser();
    const [profilePicture, setProfilePicture] = useState<File | null>(null);

    const formik = useFormik({
        initialValues: {
            email: "",
            dateOfBirth: "",
            gender: "",
            height: "",
            weight: "",
            country: "",
            noOfMeals: "",
            userHealthGoal: "",
            dietTypePreference: "",
            exerciseFrequency: "",
            medicalHistory: "",
            profilePicture: "",
        },
        validationSchema: Yup.object({
            dateOfBirth: Yup.date().required("Please provide Date of birth"),
            gender: Yup.string().required("Please provide a gender"),
            height: Yup.number().required("Please provide Height"),
            weight: Yup.number().required("Please provide Weight"),
            country: Yup.string().required("Please provide a country"),
            noOfMeals: Yup.number().required("Please provide Number of Meals"),
            userHealthGoal: Yup.string().required("Please provide Health Goal"),
            dietTypePreference: Yup.string().required("Please provide a diet type"),
            exerciseFrequency: Yup.number().required("Please provide a exercise frequency"),
        }),

        onSubmit: async (values) => {
            try {
                const response = await axios.post('/api/users/userdetails', values);
                if (response.data.success) {
                    toast.success(response.data.message);
                    router.push(`/profile/${user!._id}`)
                } else {
                    toast.error(response.data.message);
                }
            } catch (error: any) {
                toast.error(error.message);
            }
        },
    });

    useEffect(() => {
        if (user) {
            formik.setFieldValue("email", user.email);           
        }
    }, [user]);

    useEffect(() => {       
        if (user) {       
           const getUserDetails = async ()=>{
               const reqBody = { email: user.email };
                try {
                    const response = await axios.post('/api/users/getUserDetails', reqBody);                    
                    if (response.data.success) {
                        toast.success(response.data.message);
                        const { dateOfBirth, ...userDetails } = response.data.userDetails;
                        formik.setValues({
                            ...formik.values,
                            ...userDetails,
                            dateOfBirth: new Date(dateOfBirth).toISOString().split('T')[0],
                        });
                    } else {
                        toast.error(response.data.message);
                    }
                } catch (error: any) {
                    toast.error(error.message);
                }
            }
            getUserDetails();            
        }
    }, [user]);

    return (
        <form onSubmit={formik.handleSubmit} className="space-y-4">
            <div>
                <label htmlFor="dateOfBirth">Date of Birth</label>
                <input
                    id="dateOfBirth"
                    name="dateOfBirth"
                    type="date"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.dateOfBirth}
                    className="block w-full mt-1 border-gray-300 rounded-md shadow-sm"
                />
                {formik.touched.dateOfBirth && formik.errors.dateOfBirth ? (
                    <div className="text-red-500">{formik.errors.dateOfBirth}</div>
                ) : null}
            </div>
            <div>
                <label htmlFor="gender">Gender</label>
                <select
                    id="gender"
                    name="gender"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.gender}
                    className="block w-full mt-1 border-gray-300 rounded-md shadow-sm"
                >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                </select>
                {formik.touched.gender && formik.errors.gender ? (
                    <div className="text-red-500">{formik.errors.gender}</div>
                ) : null}
            </div>
            <div>
                <label htmlFor="height">Height (cm)</label>
                <input
                    id="height"
                    name="height"
                    type="number"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.height}
                    className="block w-full mt-1 border-gray-300 rounded-md shadow-sm"
                />
                {formik.touched.height && formik.errors.height ? (
                    <div className="text-red-500">{formik.errors.height}</div>
                ) : null}
            </div>
            <div>
                <label htmlFor="weight">Weight (kg)</label>
                <input
                    id="weight"
                    name="weight"
                    type="number"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.weight}
                    className="block w-full mt-1 border-gray-300 rounded-md shadow-sm"
                />
                {formik.touched.weight && formik.errors.weight ? (
                    <div className="text-red-500">{formik.errors.weight}</div>
                ) : null}
            </div>
            <div>
                <label htmlFor="country">Country</label>
                <input
                    id="country"
                    name="country"
                    type="text"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.country}
                    className="block w-full mt-1 border-gray-300 rounded-md shadow-sm"
                />
                {formik.touched.country && formik.errors.country ? (
                    <div className="text-red-500">{formik.errors.country}</div>
                ) : null}
            </div>
            <div>
                <label htmlFor="noOfMeals">Number of Meals</label>
                <input
                    id="noOfMeals"
                    name="noOfMeals"
                    type="number"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.noOfMeals}
                    className="block w-full mt-1 border-gray-300 rounded-md shadow-sm"
                />
                {formik.touched.noOfMeals && formik.errors.noOfMeals ? (
                    <div className="text-red-500">{formik.errors.noOfMeals}</div>
                ) : null}
            </div>
            <div>
                <label htmlFor="userHealthGoal">Health Goal</label>
                <input
                    id="userHealthGoal"
                    name="userHealthGoal"
                    type="text"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.userHealthGoal}
                    className="block w-full mt-1 border-gray-300 rounded-md shadow-sm"
                />
                {formik.touched.userHealthGoal && formik.errors.userHealthGoal ? (
                    <div className="text-red-500">{formik.errors.userHealthGoal}</div>
                ) : null}
            </div>
            <div>
                <label htmlFor="dietTypePreference">Diet Type</label>
                <input
                    id="dietTypePreference"
                    name="dietTypePreference"
                    type="text"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.dietTypePreference}
                    className="block w-full mt-1 border-gray-300 rounded-md shadow-sm"
                />
                {formik.touched.dietTypePreference && formik.errors.dietTypePreference ? (
                    <div className="text-red-500">{formik.errors.dietTypePreference}</div>
                ) : null}
            </div>
            <div>
                <label htmlFor="exerciseFrequency">Exercise Frequency</label>
                <input
                    id="exerciseFrequency"
                    name="exerciseFrequency"
                    type="number"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.exerciseFrequency}
                    className="block w-full mt-1 border-gray-300 rounded-md shadow-sm"
                />
                {formik.touched.exerciseFrequency && formik.errors.exerciseFrequency ? (
                    <div className="text-red-500">{formik.errors.exerciseFrequency}</div>
                ) : null}
            </div>
            <div>
                <label htmlFor="medicalHistory">Medical History</label>
                <textarea
                    id="medicalHistory"
                    name="medicalHistory"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.medicalHistory}
                    className="block w-full mt-1 border-gray-300 rounded-md shadow-sm"
                />
                {formik.touched.medicalHistory && formik.errors.medicalHistory ? (
                    <div className="text-red-500">{formik.errors.medicalHistory}</div>
                ) : null}
            </div>
            {/* <div>
                <label htmlFor="profilePicture">Profile Picture</label>
                <input
                    id="profilePicture"
                    name="profilePicture"
                    type="file"
                    onChange={(e) => {
                        if (e.target.files) {
                            setProfilePicture(e.target.files?.[0]);
                        }
                    }}
                    className="block w-full mt-1 border-gray-300 rounded-md shadow-sm"
                />
                <button
                    type="button"
                    className="bg-white text-black rounded px-2 hover:opacity-80"
                    onClick={
                        async (e) => {
                            try {
                                let profilePicturePath = "";
                                if (profilePicture) {
                                    const formData = new FormData();
                                    formData.append("file", profilePicture);
                                    console.log(formData)
                                    console.log(profilePicture)
                                    // const uploadResponse = await axios.post('/api/users/profilephotoupload', formData);
                                    const uploadResponse = await fetch('/api/users/profilephotoupload', {
                                        method:'POST',
                                        body:formData,
                                        headers:{
                                            'Content-Type': 'multipart/form-data',
                                            'duplex':'half',
                                        }
                                    });
                                    const res = await uploadResponse.json();
                                    console.log(res)
                                    if (res.success) {
                                        formik.setFieldValue("profilePicture", res.path);
                                        toast.success("Profile picture uploaded successfully");
                                    } else {
                                        toast.error("Failed to upload profile picture");
                                    }
                                    // console.log(uploadResponse)
                                    // if (uploadResponse.data.success) {
                                    //     profilePicturePath = uploadResponse.data.path;
                                    //     toast.success(uploadResponse.data.message);
                                    // } else {
                                    //     toast.error(uploadResponse.data.message);
                                    // }
                                }
                                // console.log(profilePicturePath)
                                // formik.values.profilePicture = profilePicturePath;
                            } catch (error: any) {
                                toast.error(error.message);

                            }

                        }
                    }
                >
                    Upload
                </button>
            </div> */}
            <button
                type="submit"
                className="w-full py-2 mt-4 text-white bg-blue-600 rounded-md hover:bg-blue-700"
            >
                Save Details
            </button>
        </form>
    );
};

export default UserDetailsForm;
