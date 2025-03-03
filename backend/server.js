import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Define Hospital Schema
const hospitalSchema = new mongoose.Schema({
    name: String,
    city: String,
    image: String,
    speciality: [String],
    rating: Number,
    details: {
        description: String,
        images: [String],
        numberOfDoctors: Number,
        numberOfDepartments: Number
    }
});

const Hospital = mongoose.model('Hospital', hospitalSchema);

// Task 1: Create Hospital
app.post('/api/v1/hospitals/create', async (req, res) => {
    try {
        const hospital = new Hospital(req.body);
        await hospital.save();
        res.status(201).json(hospital);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Task 2: Get Hospitals by City
app.get('/api/v1/hospitals', async (req, res) => {
    try {
        const { city } = req.query;
        const hospitals = await Hospital.find(city ? { city } : {});
        res.status(200).json(hospitals);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Task 3: Delete Hospital
app.delete('/api/v1/hospitals/delete', async (req, res) => {
    try {
        const { id } = req.query;
        await Hospital.findByIdAndDelete(id);
        res.status(200).json({ message: 'Hospital deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Task 4: Update Hospital
app.put('/api/v1/hospitals/update/:id', async (req, res) => {
    try {
      const { id } = req.params;
      console.log('Updating hospital with ID:', id); // Debugging
      const updatedHospital = await Hospital.findByIdAndUpdate(id, req.body, { new: true });
      console.log('Updated hospital:', updatedHospital); // Debugging
      res.status(200).json(updatedHospital);
    } catch (error) {
      console.error('Error updating hospital:', error); // Debugging
      res.status(500).json({ error: error.message });
    }
  });

// Task 5: Add Hospital Details
app.post('/api/v1/hospitals/details', async (req, res) => {
    try {
        const { id } = req.query;
        const updatedHospital = await Hospital.findByIdAndUpdate(id, { details: req.body }, { new: true });
        res.status(200).json(updatedHospital);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
