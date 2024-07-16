const Loader = () => {
    return (
        <div className="flex justify-center items-center">

            <div className="relative">
                <div className="w-16 h-16 border-t-4 border-b-4 border-blue-600 rounded-full animate-spin">
                </div>
                <div className="absolute top-1 left-0 w-full h-full flex justify-center items-center hover:top-0">
                    <div className="w-6 h-6 flex justify-center items-center bg-blue-600 rounded-full animate-bounce hover:animate-none">
                        <div className="w-5 h-5 bg-blue-800 rounded-full opacity-100 animate-pulse hover:animate-none"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Loader;


// const Loader = () => {
//     return (
//         <div className="flex justify-center items-center">
//             <div className="relative">
//                 <div className="w-16 h-16 border-4 border-t-transparent border-blue-500 rounded-full animate-spin"></div>
//                 <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center">
//                     <div className="w-12 h-12 bg-blue-500 rounded-full opacity-100 animate-pulse"></div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Loader;
