import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateHospital = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    city: '',
    image: '',
    speciality: '',
    rating: 0,
    details: {
      description: '',
      images: '',
      numberOfDoctors: 0,
      numberOfDepartments: 0,
    },
  });

  useEffect(() => {
    const fetchHospital = async () => {
      try {
        console.log('Fetching hospital with ID:', id); // Debugging
        const res = await axios.get(`https://mernpeph.onrender.com/api/v1/hospitals?id=${id}`);
        console.log('Fetched hospital data:', res.data); // Debugging
        setFormData(res.data);
      } catch (error) {
        console.error('Error fetching hospital:', error); // Debugging
      }
    };
    fetchHospital();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('details.')) {
      const detailField = name.split('.')[1];
      setFormData({
        ...formData,
        details: {
          ...formData.details,
          [detailField]: value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('Updating hospital with ID:', id); // Debugging
      const res = await axios.put(`https://mernpeph.onrender.com/api/v1/hospitals/update/${id}`, formData);
      console.log('Update response:', res.data); // Debugging
      alert('Hospital updated successfully!');
      navigate('/hospitals');
    } catch (error) {
      console.error('Error updating hospital:', error); // Debugging
      alert('Failed to update hospital.');
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-blue-600">Update Hospital</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
        <div className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Hospital Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="text"
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="text"
            name="image"
            placeholder="Image URL"
            value={formData.image}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="speciality"
            placeholder="Speciality (comma separated)"
            value={formData.speciality}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="number"
            name="rating"
            placeholder="Rating"
            value={formData.rating}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            name="details.description"
            placeholder="Description"
            value={formData.details.description}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="details.images"
            placeholder="Detail Images (comma separated)"
            value={formData.details.images}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="number"
            name="details.numberOfDoctors"
            placeholder="Number of Doctors"
            value={formData.details.numberOfDoctors}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="number"
            name="details.numberOfDepartments"
            placeholder="Number of Departments"
            value={formData.details.numberOfDepartments}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="mt-6 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition duration-300"
        >
          Update Hospital
        </button>
      </form>
    </div>
  );
};

export default UpdateHospital;