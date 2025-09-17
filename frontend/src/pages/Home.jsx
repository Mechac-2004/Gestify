import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center min-h-[70vh] px-6 text-center bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl m-6 shadow-xl">
            <h1 className="text-5xl font-extrabold text-gray-900 mb-6 drop-shadow-md">
                Bienvenue sur l'application de gestion des employés ✨
            </h1>
            <p className="text-xl text-gray-700 max-w-3xl mb-8">
                Votre outil simple et efficace pour gérer les informations de votre équipe. Accédez, modifiez et consultez les données en toute simplicité.
            </p>
            <button
                className="mt-8 bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-10 py-4 rounded-full shadow-lg hover:from-blue-700 hover:to-indigo-800 transition-all duration-300 transform hover:scale-105"
                onClick={() => navigate("/employees")}
            >
                Commencer
            </button>
        </div>
    );
};

export default Home;