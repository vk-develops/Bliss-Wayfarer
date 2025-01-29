import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const AdminPage = () => {
    const [travelPlacesOpen, setTravelPlacesOpen] = useState(false);
    const navigate = useNavigate();

    const toggleTravelPlaces = () => {
        setTravelPlacesOpen(!travelPlacesOpen);
    };

    const handleNavigation = (path) => {
        navigate(path);
    };

    return (
        <div className="min-h-screen flex flex-col">
            <nav className="flex justify-between items-center p-4 bg-blue-600 text-white">
                <h1 className="text-xl font-bold">Travel Guide Admin</h1>
                <input
                    type="text"
                    className="w-1/2 p-2 rounded"
                    placeholder="Search..."
                />
                <button className="bg-red-500 hover:bg-red-700 px-4 py-2 rounded">
                    Logout
                </button>
            </nav>

            <div className="flex flex-grow">
                <aside className="w-56 bg-gray-800 text-white p-4">
                    <ul className="space-y-4">
                        <li
                            className="cursor-pointer p-2 rounded hover:bg-gray-700"
                            onClick={() => handleNavigation("/admin")}
                        >
                            Dashboard
                        </li>
                        <li
                            className="cursor-pointer p-2 rounded hover:bg-gray-700"
                            onClick={toggleTravelPlaces}
                        >
                            Travel Places{" "}
                            {travelPlacesOpen ? (
                                <FaChevronUp className="inline ml-2" />
                            ) : (
                                <FaChevronDown className="inline ml-2" />
                            )}
                        </li>
                        {travelPlacesOpen && (
                            <ul className="pl-6 space-y-2">
                                <li
                                    className="cursor-pointer p-2 rounded bg-gray-700 hover:bg-gray-600"
                                    onClick={() =>
                                        handleNavigation("/admin/attractions")
                                    }
                                >
                                    Attractions
                                </li>
                                <li
                                    className="cursor-pointer p-2 rounded bg-gray-700 hover:bg-gray-600"
                                    onClick={() =>
                                        handleNavigation("/admin/hotels")
                                    }
                                >
                                    Hotels
                                </li>
                                <li
                                    className="cursor-pointer p-2 rounded bg-gray-700 hover:bg-gray-600"
                                    onClick={() =>
                                        handleNavigation("/admin/restaurants")
                                    }
                                >
                                    Restaurants
                                </li>
                                <li className="cursor-pointer p-2 rounded bg-gray-700 hover:bg-gray-600">
                                    States
                                </li>
                            </ul>
                        )}
                        <li
                            className="cursor-pointer p-2 rounded hover:bg-gray-700"
                            onClick={() => handleNavigation("/users")}
                        >
                            Users
                        </li>
                    </ul>
                </aside>

                <main className="flex-grow p-6 bg-gray-100">
                    <h2 className="text-2xl font-bold text-gray-700 mb-6">
                        Welcome to the Admin Dashboard
                    </h2>
                </main>
            </div>
        </div>
    );
};

export default AdminPage;
