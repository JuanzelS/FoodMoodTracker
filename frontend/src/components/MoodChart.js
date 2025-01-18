import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register required chart components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const MoodChart = ({ meals: initialMeals }) => {
  const [meals, setMeals] = useState(initialMeals || []);

  // Load initial meals from localStorage if available
  useEffect(() => {
    const storedMeals = localStorage.getItem('meals');
    if (storedMeals) {
      setMeals(JSON.parse(storedMeals));
    } else {
      setMeals(initialMeals || []);
    }
  }, [initialMeals]);

  // Save meals to localStorage whenever meals state changes
  useEffect(() => {
    if (meals.length > 0) {
      localStorage.setItem('meals', JSON.stringify(meals));
    }
  }, [meals]);

  const clearChart = () => {
    setMeals([]); // Clear meals state
    localStorage.setItem('chartCleared', 'true'); // Save cleared state to localStorage
  };

  const resetChart = () => {
    localStorage.removeItem('chartCleared'); // Remove cleared state from localStorage
    setMeals(initialMeals || []); // Reset meals to initial state
    localStorage.setItem('meals', JSON.stringify(initialMeals || [])); // Save reset meals to localStorage
  };

  const chartData = {
    labels: meals.map(meal => meal.name),
    datasets: [
      {
        label: 'Mood Score',
        data: meals.map(meal => meal.mood),
        backgroundColor: meals.map(meal =>
          meal.mood >= 5 ? 'rgba(75, 192, 192, 0.6)' : 'rgba(255, 99, 132, 0.6)'
        ),
        borderColor: meals.map(meal =>
          meal.mood >= 5 ? 'rgba(75, 192, 192, 1)' : 'rgba(255, 99, 132, 1)'
        ),
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Mood Chart by Meals',
      },
    },
  };

  return (
    <div
      style={{
        maxWidth: '800px',
        margin: '20px auto',
        padding: '20px',
        backgroundColor: '#f9f9f9',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      }}
    >
      <h2 style={{ textAlign: 'center', color: '#333' }}>Meal Mood Tracker</h2>
      <button
        onClick={clearChart}
        style={{
          margin: '10px 10px 20px',
          padding: '10px 20px',
          backgroundColor: '#dc3545',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        Clear Chart
      </button>
      <button
        onClick={resetChart}
        style={{
          margin: '10px 10px 20px',
          padding: '10px 20px',
          backgroundColor: '#28a745',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        Reset Chart
      </button>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default MoodChart;
