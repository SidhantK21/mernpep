import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const HospitalList = () => {
  const [hospitals, setHospitals] = useState([]);
  const [city, setCity] = useState('');

  const fetchHospitals = async () => {
    try {
      const res = await axios.get(`https://mernpep.onrender.com/api/v1/hospitals?city=${city}`);
      setHospitals(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://mernpep.onrender.com/api/v1/hospitals/delete?id=${id}`);
      alert('Hospital deleted successfully!');
      fetchHospitals(); // Refresh the list
    } catch (error) {
      console.error(error);
      alert('Failed to delete hospital.');
    }
  };

  useEffect(() => {
    fetchHospitals();
  }, [city]);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-blue-600">Hospitals</h1>
      <input
        type="text"
        placeholder="Filter by city"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        className="w-full p-2 border rounded mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {hospitals.map((hospital) => (
          <div key={hospital._id} className="bg-white p-6 rounded-lg shadow-md">
            <img
              src={hospital.image}
              alt={hospital.name}
              className="w-full h-48 object-cover rounded-t-lg"
            />
            <h2 className="text-xl font-bold mt-4 text-blue-600">{hospital.name}</h2>
            <p className="text-gray-600">{hospital.city}</p>
            <p className="text-gray-600">{hospital.speciality.join(', ')}</p>
            <p className="text-gray-600">Rating: {hospital.rating}</p>
            <div className="mt-4 flex space-x-2">
              <Link
                to={`/update/${hospital._id}`} // Ensure this link is correct
                className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition duration-300"
              >
                Edit
              </Link>
              <button
                onClick={() => handleDelete(hospital._id)}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-300"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HospitalList;