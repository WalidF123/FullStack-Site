import React, { useState } from 'react';
import mealOptionsWithImages from './mealOption';

function DietPlan() {
  const [formData, setFormData] = useState({
    age: '',
    weight: '',
    height: '',
    activityLevel: '',
    dietaryPreferences: '',
    healthGoals: ''
  });

  const [availableMealOptions, setAvailableMealOptions] = useState({
    breakfast: [],
    lunch: [],
    dinner: []
  });

  const [selectedMealOptions, setSelectedMealOptions] = useState({
    breakfast: '',
    lunch: '',
    dinner: ''
  });


  const [showSummary, setShowSummary] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  const handleMealOptionChange = (meal, option) => {
    setSelectedMealOptions({ ...selectedMealOptions, [meal]: option });
    //showing sum after users chose their meals
    if (selectedMealOptions.breakfast && selectedMealOptions.lunch && selectedMealOptions.dinner) {
      setShowSummary(true);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { age, weight, height } = formData;
  
    // Check if age, weight, and height are reasonable
    if (age < 13 || age > 150) {
      alert('Please enter a valid age (13-150 years)');
      return;
    }
  
    if (weight <= 0 || weight > 300) {
      alert('Please enter a valid weight (0-300 kg)');
      return;
    }
  
    if (height <= 0 || height > 220) {
      alert('Please enter a valid height (0-220 cm)');
      return;
    }
    generateDietPlan(formData);
    setShowSummary(false);
    setSelectedMealOptions({ breakfast: '', lunch: '', dinner: '' });
  };

  const handleMealSubmit = (e) => {
    e.preventDefault();
    //only show summary after submitting
    setShowSummary(true);
  };
 
    const generateDietPlan = (formData) => {
      let updatedMealOptions = {};
      const {weight, height, dietaryPreferences, activityLevel, healthGoals } = formData;
      //conditions for diet plans
      const bmi = calculateBMI(weight, height);
      if (bmi < 25 && healthGoals === 'weightLoss'){
        alert('You are not overweight, no weight losing is needed.')
      }
      if (activityLevel === 'sedentary'){
        alert('Do more exercise to maintain a healthy life.')
      }
      //checks for which meals are suitable depending on users selection and BMI
      if (bmi > 25 && healthGoals === 'weightLoss') {
        switch (dietaryPreferences) {
          case 'vegetarian':
            updatedMealOptions = {
              breakfast: ['Kale Smoothie', 'Avocado Toast', 'Pancakes with fresh fruits'],
              lunch: ['Quinoa Salad', 'Vegetable Stir-fry', 'Grilled Portobello Mushrooms'],
              dinner: ['Vegetable Curry', 'Stuffed Bell Peppers', 'Eggplant Parmesan']
            };
            break;
          case 'none':
            updatedMealOptions = {
              breakfast: ['Bacon and egg Sandwich', 'Chickpea bruschetta', 'Pancakes with fresh fruits'],
              lunch: ['Grilled Chicken Salad', 'Steak with Roasted Vegetables', 'Salmon with Asparagus'],
              dinner: ['Pasta with Tomato Sauce', 'Beef Stir-fry', 'Fish Tacos']
            };
            break;
          case 'halal':
            updatedMealOptions = {
              breakfast: ['Kale Smoothie', 'Avocado Toast', 'Pancake with fresh fruits'],
              lunch: ['Halal Pizza', 'Chicken Shawarma Wrap', 'Falafel Bowl'],
              dinner: ['Halal Beef Burger', 'Lamb Kebabs with Rice', 'Halal Chicken Curry']
            };
            break;
          default:
            break;
        }
      }
    
      if (healthGoals === 'muscleGain') {
        switch (dietaryPreferences) {
          case 'vegetarian':
            updatedMealOptions = {
            breakfast: ['Protein Pancakes', 'Tofu Scramble', 'Greek Yogurt with Nuts and Fruit'],
            lunch: ['Quinoa Bowl with Black Beans and Avocado', 'Tempeh Stir-fry', 'Chickpea Salad'],
            dinner: ['Lentil Stew', 'Vegetable Curry with Paneer', 'Bean and Rice Burritos']
            };
            break;
          case 'none':
            updatedMealOptions = {
            breakfast: ['Bacon sandwich with vegetables', 'Omelette with Cheese and Spinach', 'Greek Yogurt with Nuts and Honey'],
            lunch: ['Grilled Chicken Breast with Sweet Potatoes', 'Beef Stir-fry with Rice', 'Salmon Fillet with Quinoa'],
            dinner: ['Steak with Baked Potatoes', 'Shrimp Pasta with Alfredo Sauce', 'Turkey Meatballs with Marinara']
            };
            break;
          case 'halal':
            updatedMealOptions = {
            breakfast: ['Protein Pancakes', 'Omelette with Cheese and Spinach', 'Greek Yogurt with Nuts and Fruit'],
            lunch: ['Grilled Chicken Breast with Quinoa', 'Beef Kebabs with Rice', 'Fish Fillet with Couscous'],
            dinner: ['Lamb Chops with Roasted Vegetables', 'Chicken Curry with Rice', 'Beef Shawarma Bowl']
            };
            break;
          default:
            break;
        }
      }
    
      if (healthGoals === 'overallHealth') {
        switch (dietaryPreferences) {
          case 'vegetarian':
            updatedMealOptions = {
            breakfast: ['Oatmeal with Berries and Nuts', 'Avocado Toast with Poached Eggs', 'Greek Yogurt with Granola and Fruit'],
            lunch: ['Quinoa Salad with Roasted Vegetables', 'Vegetable Stir-fry with Tofu', 'Chickpea and Spinach Curry'],
            dinner: ['Stuffed Bell Peppers with Brown Rice', 'Vegetable and Bean Chili', 'Eggplant Parmesan with Whole Wheat Pasta']
            };
            break;
          case 'none':
            updatedMealOptions = {
            breakfast: ['Omelette with Spinach and Tomatoes', 'Whole Grain Toast with Peanut Butter', 'Greek Yogurt with Honey and Almonds'],
            lunch: ['Grilled Chicken Salad with Mixed Greens', 'Turkey and Avocado Wrap', 'Salmon and Quinoa Bowl'],
            dinner: ['Baked Salmon with Steamed Vegetables', 'Grilled Steak with Sweet Potato Mash', 'Shrimp and Vegetable Stir-fry']
            };
            break;
          case 'halal':
            updatedMealOptions = {
            breakfast: ['Oatmeal with Berries and Nuts', 'Avocado Toast with Poached Eggs', 'Greek Yogurt with Granola and Fruit'],
            lunch: ['Grilled Chicken Salad with Mixed Greens', 'Turkey and Avocado Wrap', 'Salmon and Quinoa Bowl'],
            dinner: ['Baked Chicken with Roasted Vegetables', 'Beef Kebabs with Brown Rice', 'Fish Curry with Basmati Rice']
            };
            break;
          default:
            break;
        }
      }
      //show available meal options for conditions chosen
      setAvailableMealOptions(updatedMealOptions);
    };
    //calculate bmi for user
    const calculateBMI = (weight, height) => {
      const heightM = height/100;
      return weight / (heightM * heightM);
    };


 
     // Function to get image URL for a specific meal from the meal options page from the mealOptions.js
  const getImageUrl = (mealName) => {
    return mealOptionsWithImages[mealName] || 'default_image_url';
  };

  const displaySummary = () => {
    return (
      <div className="summary-container">
        <h2>Diet Meals Summary</h2>
        <div className="meal-summary">
          <div className="meal-summary-item">
            <h3>Breakfast</h3>
            <div className="meal-summary-content">
              <img src={getImageUrl(selectedMealOptions.breakfast)} alt={selectedMealOptions.breakfast} className="meal-summary-image" />
              <span>{selectedMealOptions.breakfast}</span>
            </div>
          </div>
          <div className="meal-summary-item">
            <h3>Lunch</h3>
            <div className="meal-summary-content">
              <img src={getImageUrl(selectedMealOptions.lunch)} alt={selectedMealOptions.lunch} className="meal-summary-image" />
              <span>{selectedMealOptions.lunch}</span>
            </div>
          </div>
          <div className="meal-summary-item">
            <h3>Dinner</h3>
            <div className="meal-summary-content">
              <img src={getImageUrl(selectedMealOptions.dinner)} alt={selectedMealOptions.dinner} className="meal-summary-image" />
              <span>{selectedMealOptions.dinner}</span>
            </div>
          </div>
        </div>
      </div>
    );
  };
    
    
    
  return (
    <div className="diet-plan-container">
      <h2 className="diet-plan-heading">Create Your Diet Plan</h2>
      <form onSubmit={handleSubmit} className="diet-plan-form">
        <div className="form-group">
          <label htmlFor="age">Age:</label>
          <input
            type="number"
            id="age"
            placeholder='Age'
            name="age"
            value={formData.age}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="weight">Weight (kg):</label>
          <input
            type="number"
            id="weight"
            name="weight"
            value={formData.weight}
            onChange={handleChange}
className = "form-control"          />
        </div>
        <div className="form-group">
          <label htmlFor="height">Height (cm):</label>
          <input
            type="number"
            id="height"
            name="height"
            value={formData.height}
            onChange={handleChange}
            className = "form-control"          />
        </div>
        <div className="form-group">
          <label htmlFor="activityLevel">Activity Level:</label>
          <select
            id="activityLevel"
            name="activityLevel"
            value={formData.activityLevel}
            onChange={handleChange}
              className = "form-control"          >
            <option value="sedentary">Sedentary</option>
            <option value="active">Active</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="dietaryPreferences">Dietary Preferences:</label>
           <select
                id="dietaryPreferences"
                name="dietaryPreferences"
                value={formData.dietaryPreferences}
                onChange={handleChange}
                className="form-control" 
                >
                <option value="">Select Dietary Preference</option>
                <option value="halal">Halal</option>
                <option value="vegetarian">Vegetarian</option>
                <option value="none">None</option>
            </select>
            </div>
        <div className="form-group">
          <label htmlFor="healthGoals">Health Goals:</label>
          <select
            id="healthGoals"
            name="healthGoals"
            value={formData.healthGoals}
            onChange={handleChange}
            className = "form-control"          
            >
                <option value="">Select Goals</option>
                <option value="weightLoss">Lose Weight</option>
                <option value="muscleGain">Gain Muscles</option>
                <option value="overallHealth">Improve Overall Health</option>
            </select>
            
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
      {/* Choose your meals section*/}
      {!showSummary && (
  <form onSubmit={handleMealSubmit} className="form-group">
    <h3>Choose Your Meals:</h3>
  
    <div className="meal-options">
      {/*BREAKFAST OPTIONS*/}
    <div className="meal-option">
  <label htmlFor="breakfast">Breakfast:</label>
  <div className="meal-options-container" style={{ display: 'flex' }}>
    {Array.isArray(availableMealOptions.breakfast) && availableMealOptions.breakfast.map((option, index) => (
      <div key={index} className="meal-option-item" style={{ marginRight: '100px' }}>
        <input
          type="radio"
          id={`breakfastOption${index}`}
          name="breakfast"
          value={option}
          checked={selectedMealOptions.breakfast === option}
          onChange={(e) => handleMealOptionChange('breakfast', e.target.value)}
        />
        <label htmlFor={`breakfastOption${index}`} className="meal-label">
          <div className="meal-image-container">
            <img src={getImageUrl(option)} alt={option} className="meal-image" />
          </div>
          <span className="meal-name">{option}</span>
        </label>
      </div>
    ))}
  </div>
</div>
{/* LUNCH OPTIONS*/}
<div className="meal-option">
  <label htmlFor="lunch">Lunch:</label>
  <div className="meal-options-container" style={{ display: 'flex' }}>
    {Array.isArray(availableMealOptions.lunch) && availableMealOptions.lunch.map((option, index) => (
      <div key={index} className="meal-option-item" style={{ marginRight: '100px' }}>
        <input
          type="radio"
          id={`lunchOption${index}`}
          name="lunch"
          value={option}
          checked={selectedMealOptions.lunch === option}
          onChange={(e) => handleMealOptionChange('lunch', e.target.value)}
        />
        <label htmlFor={`lunchOption${index}`} className="meal-label">
          <div className="meal-image-container">
            <img src={getImageUrl(option)} alt={option} className="meal-image" />
          </div>
          <span className="meal-name">{option}</span>
        </label>
      </div>
    ))}
  </div>
</div>

{/* DINNER OPTIONS */}
<div className="meal-option">
  <label htmlFor="dinner">Dinner:</label>
  <div className="meal-options-container" style={{ display: 'flex' }}>
    {Array.isArray(availableMealOptions.dinner) && availableMealOptions.dinner.map((option, index) => (
      <div key={index} className="meal-option-item" style={{ marginRight: '100px' }}>
        <input
          type="radio"
          id={`dinnerOption${index}`}
          name="dinner"
          value={option}
          checked={selectedMealOptions.dinner === option}
          onChange={(e) => handleMealOptionChange('dinner', e.target.value)}
        />
        <label htmlFor={`dinnerOption${index}`} className="meal-label">
          <div className="meal-image-container">
            <img src={getImageUrl(option)} alt={option} className="meal-image" />
          </div>
          <span className="meal-name">{option}</span>
        </label>
      </div>
    ))}
  </div>
</div>
      
  </div>
    
    <button type="submit" className="btn btn-primary">Show Summary</button>
  </form>
)}

      {showSummary && displaySummary()}
    </div>
  );
}

export default DietPlan;