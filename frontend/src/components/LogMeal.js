import React, { useState } from 'react';
import axios from 'axios';

const LogMeal = ({ setMeals }) => {
  const [meal, setMeal] = useState({ name: '', time: '', mood: '' });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setMeal({ ...meal, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Send the meal data to the API (adjust URL accordingly)
      await axios.post('http://localhost:5001/api/meals', meal); // Replace with your actual API endpoint
      alert('Meal logged successfully!');

      // Update the state with the new meal
      const newMeal = { ...meal, mood: Number(meal.mood) }; // Convert mood to number
      setMeals((prevMeals) => {
        const updatedMeals = [...prevMeals, newMeal];
        localStorage.setItem('meals', JSON.stringify(updatedMeals));
        return updatedMeals;
      });
      setMeal({ name: '', time: '', mood: '' }); // Reset form fields
    } catch (error) {
      console.error('Error logging meal:', error);
      alert('Failed to log meal.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        value={meal.name}
        onChange={handleChange}
        placeholder="Meal Name"
        required
      />
      <input
        type="datetime-local"
        name="time"
        value={meal.time}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="mood"
        value={meal.mood}
        onChange={handleChange}
        placeholder="Mood (1-10)"
        required
      />
      <button type="submit">Log Meal</button>
    </form>
  );
};

export default LogMeal;
