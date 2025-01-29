import React from "react";
import TravelPic from "../assets/travel.jpg";

const HomePage = () => {
    return (
        <div className="flex h-[calc(100vh-64px)] bg-gray-100">
            <div className="flex-1 p-8 flex flex-col justify-center">
                <h1 className="text-3xl font-bold text-gray-800 mb-4">
                    Welcome to the Ultimate Travel Experience!
                </h1>
                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                    Discover new destinations, plan your trips seamlessly, and
                    explore curated itineraries just for you. Our app makes
                    travel hassle-free and exciting for everyone.
                </p>
                <button className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-3 px-6 rounded">
                    Download App
                </button>
            </div>

            <div className="flex-1 flex justify-center items-center">
                <img
                    src={TravelPic}
                    alt="Travel destination"
                    className="max-w-[90%] max-h-[80%] rounded-lg shadow-lg"
                />
            </div>
        </div>
    );
};

export default HomePage;
