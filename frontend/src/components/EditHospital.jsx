import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../styles/style.css"

const EditHospital = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({});

  useEffect(() => {
    axios.get(`https://mernpeph.onrender.com/api/v1/hospitals?id=${id}`).then((res) => setFormData(res.data));
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.put(`/api/v1/hospitals/update?id=${id}`, formData);
    alert("Updated Successfully");
  };

  return (
    <div>
      <h2>Edit Hospital</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" value={formData.name} onChange={handleChange} />
        <input type="text" name="city" value={formData.city} onChange={handleChange} />
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default EditHospital;
