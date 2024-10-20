import React, { useState } from 'react';
import axios from '../utils/axiosInstance';
import { useNavigate } from 'react-router-dom';


const UserInfoForm = () => {
    const navigate = useNavigate();

  const [formData, setFormData] = useState({
    height: '',
    weight: '',
    age: '',
    gender: '',
    nutrientIntake: '',
  });

  const [errors, setErrors] = useState({}); // State for input errors

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Reset error for the specific field on change
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validateInputs = () => {
    const newErrors = {};

    if (!formData.height || isNaN(formData.height) || formData.height <= 0) {
      newErrors.height = 'Height must be a positive number.';
    }
    if (!formData.weight || isNaN(formData.weight) || formData.weight <= 0) {
      newErrors.weight = 'Weight must be a positive number.';
    }
    if (!formData.age || isNaN(formData.age) || formData.age <= 0) {
      newErrors.age = 'Age must be a positive number.';
    }
    if (!formData.gender) {
      newErrors.gender = 'Gender is required.';
    }
    if (!formData.nutrientIntake) {
      newErrors.nutrientIntake = 'Nutrient intake is required.';
    }

    setErrors(newErrors); // Update the errors state
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateInputs()) {
      alert('Please correct the errors before submitting.');
      return; // Prevent form submission if there are validation errors
    }

    try {
      await axios.post('/update-info', formData);
      alert('User information updated successfully!');
      navigate('/add-daily-data')
    } catch (error) {
      alert('Error updating information: ' + (error.response ? error.response.data.message : error.message));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Update User Info</h2>
      <input
        name="height"
        type="number"
        placeholder="Height in Inches"
        value={formData.height}
        onChange={handleChange}
        style={{ borderColor: errors.height ? 'red' : 'initial' }} // Highlight error
      />
      {errors.height && <span style={{ color: 'red' }}>{errors.height}</span>}
      <br/>

      <input
        name="weight"
        type="number"
        placeholder="Weight"
        value={formData.weight}
        onChange={handleChange}
        style={{ borderColor: errors.weight ? 'red' : 'initial' }} // Highlight error
      />
      {errors.weight && <span style={{ color: 'red' }}>{errors.weight}</span>}
      <br/>

      <input
        name="age"
        type="number"
        placeholder="Age"
        value={formData.age}
        onChange={handleChange}
        style={{ borderColor: errors.age ? 'red' : 'initial' }} // Highlight error
      />
      {errors.age && <span style={{ color: 'red' }}>{errors.age}</span>}
      <br/>

      <div>
        <h4>Gender:</h4>
        <label>
          <input
            type="radio"
            name="gender"
            value="Male"
            checked={formData.gender === 'Male'}
            onChange={handleChange}
          />
          Male
        </label>
        <label>
          <input
            type="radio"
            name="gender"
            value="Female"
            checked={formData.gender === 'Female'}
            onChange={handleChange}
          />
          Female
        </label>
      </div>
      {errors.gender && <span style={{ color: 'red' }}>{errors.gender}</span>}
      <br/>

      <input
        name="nutrientIntake"
        type="number"
        placeholder="Nutrient Intake in Calories"
        value={formData.nutrientIntake}
        onChange={handleChange}
        style={{ borderColor: errors.nutrientIntake ? 'red' : 'initial' }} // Highlight error
      />
      {errors.nutrientIntake && <span style={{ color: 'red' }}>{errors.nutrientIntake}</span>}
      <br/>
      <button type="submit">Update Info</button>
    </form>
  );
};

export default UserInfoForm;
