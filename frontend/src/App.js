import React, { useState, useEffect } from 'react';
import MoodChart from './components/MoodChart'; // Import the MoodChart component
import LogMeal from './components/LogMeal'; // Import LogMeal component

const App = () => {
  const [meals, setMeals] = useState([]);

  // Load saved meals from localStorage on initial load
  useEffect(() => {
    const storedMeals = localStorage.getItem('meals');
    if (storedMeals) {
      setMeals(JSON.parse(storedMeals));
    }
  }, []);

  // Save meals to localStorage whenever meals state changes
  useEffect(() => {
    if (meals.length > 0) {
      localStorage.setItem('meals', JSON.stringify(meals));
    }
  }, [meals]);

  return (
    <div style={{ padding: '20px' }}>
      {/* Remove or update the following line */}
      <h1>Meal Mood Tracker</h1> {/* Updated the title */}
      
      <LogMeal setMeals={setMeals} /> {/* Pass setMeals to LogMeal for updating the meals state */}

      <MoodChart meals={meals} />
    </div>
  );
};

export default App;
