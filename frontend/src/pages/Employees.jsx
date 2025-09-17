import React, { useState, useEffect } from "react";
import API from "../services/api"; 
import { FaEdit, FaTrash, FaTimes, FaEye } from "react-icons/fa";

const Employees = () => {
    const [employees, setEmployees] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [viewMode, setViewMode] = useState(false); // ✅ Nouveau : mode lecture
    const [form, setForm] = useState({
        first_name: "",
        last_name: "",
        email: "",
        job_title: "",
        salary: "",
        location: "",
    });

    const fetchEmployees = async () => {
        try {
            const res = await API.get("employees/");
            setEmployees(res.data);
        } catch (err) {
            console.error("Erreur lors du chargement des employés :", err);
        }
    };

    useEffect(() => {
        fetchEmployees();
    }, []);

    const handleDelete = async (employee_id) => {
        if (window.confirm("Voulez-vous vraiment supprimer cet employé ?")) {
            await API.delete(`employees/${employee_id}/`);
            fetchEmployees();
        }
    };

    const handleEdit = (emp) => {
        setSelectedEmployee(emp);
        setForm(emp);
        setViewMode(false); // mode édition
        setShowModal(true); 
    };

    const handleAdd = () => {
        setSelectedEmployee(null);
        setForm({ first_name: "", last_name: "", email: "", job_title: "", salary: "", location: "" });
        setViewMode(false);
        setShowModal(true);
    };

    const handleView = (emp) => {
        setSelectedEmployee(emp);
        setForm(emp);
        setViewMode(true); // ✅ mode lecture
        setShowModal(true);
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (selectedEmployee) {
            await API.put(`employees/${selectedEmployee.employee_id}/`, form);
        } else {
            await API.post("employees/", form);
        }
        setShowModal(false); 
        fetchEmployees();
    };

    return (
        <div className="p-8 bg-gray-50 min-h-screen">
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-4xl font-extrabold text-gray-900">
                    Liste des employés
                </h2>
                <button
                    onClick={handleAdd}
                    className="bg-green-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-green-700 transition-all duration-300 transform hover:scale-105 flex items-center gap-2 font-semibold"
                >
                    ➕ Ajouter un employé
                </button>
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 flex justify-center items-center z-50 bg-gray-900 bg-opacity-50 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-8 relative transform scale-95 transition-transform duration-300">
                        {/* Close Button */}
                        <button
                            onClick={() => setShowModal(false)}
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                        >
                            <FaTimes size={24} />
                        </button>

                        <h3 className="text-3xl font-bold mb-6 text-gray-800">
                            {viewMode 
                                ? "Détails de l'employé" 
                                : selectedEmployee 
                                    ? "Modifier l'employé" 
                                    : "Ajouter un employé"}
                        </h3>
                        
                        {viewMode ? (
                            // ✅ Mode lecture seule
                            <div className="space-y-3 text-lg">
                                <p><strong>Nom :</strong> {form.first_name} {form.last_name}</p>
                                <p><strong>Email :</strong> {form.email}</p>
                                <p><strong>Poste :</strong> {form.job_title}</p>
                                <p><strong>Salaire :</strong> {form.salary}</p>
                                <p><strong>Localisation :</strong> {form.location}</p>
                            </div>
                        ) : (
                            // Formulaire (édition / ajout)
                            <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
                                <input
                                    type="text"
                                    name="first_name"
                                    placeholder="Prénom"
                                    value={form.first_name}
                                    onChange={handleChange}
                                    required
                                    className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                                />
                                <input
                                    type="text"
                                    name="last_name"
                                    placeholder="Nom"
                                    value={form.last_name}
                                    onChange={handleChange}
                                    required
                                    className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                                />
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    value={form.email}
                                    onChange={handleChange}
                                    required
                                    className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                                />
                                <input
                                    type="text"
                                    name="job_title"
                                    placeholder="Poste"
                                    value={form.job_title}
                                    onChange={handleChange}
                                    required
                                    className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                                />
                                <input
                                    type="number"
                                    name="salary"
                                    placeholder="Salaire"
                                    value={form.salary}
                                    onChange={handleChange}
                                    required
                                    className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                                />
                                <input
                                    type="text"
                                    name="location"
                                    placeholder="Localisation"
                                    value={form.location}
                                    onChange={handleChange}
                                    required
                                    className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                                />
                                <button
                                    type="submit"
                                    className="mt-4 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all duration-300 font-semibold"
                                >
                                    {selectedEmployee ? "Mettre à jour" : "Ajouter"}
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            )}

            {/* Employee Table */}
            <div className="overflow-hidden rounded-xl shadow-lg border border-gray-200">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-gray-800 text-white">
                        <tr>
                            <th className="px-6 py-4 font-semibold">ID</th>
                            <th className="px-6 py-4 font-semibold">Nom</th>
                            <th className="px-6 py-4 font-semibold">Email</th>
                            <th className="px-6 py-4 font-semibold">Poste</th>
                            <th className="px-6 py-4 font-semibold">Salaire</th>
                            <th className="px-6 py-4 font-semibold">Localisation</th>
                            <th className="px-6 py-4 font-semibold text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.map((emp) => (
                            <tr key={emp.employee_id} className="bg-white border-b border-gray-200 hover:bg-gray-100 transition-colors">
                                <td className="px-6 py-4">{emp.employee_id}</td>
                                <td className="px-6 py-4">{emp.first_name} {emp.last_name}</td>
                                <td className="px-6 py-4">{emp.email}</td>
                                <td className="px-6 py-4">{emp.job_title}</td>
                                <td className="px-6 py-4">{emp.salary}</td>
                                <td className="px-6 py-4">{emp.location}</td>
                                <td className="px-6 py-4 flex gap-4 justify-center">
                                    <button onClick={() => handleView(emp)} className="text-blue-500 hover:text-blue-600 transition-colors" title="Lire">
                                        <FaEye size={20} />
                                    </button>
                                    <button onClick={() => handleEdit(emp)} className="text-yellow-500 hover:text-yellow-600 transition-colors" title="Modifier">
                                        <FaEdit size={20} />
                                    </button>
                                    <button onClick={() => handleDelete(emp.employee_id)} className="text-red-500 hover:text-red-600 transition-colors" title="Supprimer">
                                        <FaTrash size={20} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Employees;
