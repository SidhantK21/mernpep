import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "../styles/style.css"

const HospitalDetails = () => {
  const { id } = useParams();
  const [hospital, setHospital] = useState(null);

  useEffect(() => {
    axios.get(`https://mernpep.onrender.com/api/v1/hospitals?id=${id}`).then((res) => setHospital(res.data));
  }, [id]);

  if (!hospital) return <p>Loading...</p>;

  return (
    <div>
      <h2>{hospital.name}</h2>
      <p>{hospital.city}</p>
      <img src={hospital.image} alt={hospital.name} />
      <Link to={`/edit/${hospital._id}`}>Edit</Link>
    </div>
  );
};

export default HospitalDetails;