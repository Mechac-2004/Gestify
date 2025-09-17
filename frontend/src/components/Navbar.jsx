import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-8 py-4 flex justify-between items-center shadow-lg dark:from-gray-900 dark:to-gray-800 dark:text-gray-200">
            <h1 className="text-2xl font-extrabold tracking-wide">
                Gestify
            </h1>
            <ul className="flex space-x-8">
                <li>
                    <Link
                        to="/"
                        className="hover:text-teal-400 transition-colors duration-300 dark:hover:text-indigo-400"
                    >
                        Accueil
                    </Link>
                </li>
                <li>
                    <Link
                        to="/employees"
                        className="hover:text-teal-400 transition-colors duration-300 dark:hover:text-indigo-400"
                    >
                        Employés
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
