// this file defines the RecipeModal component which is used to display the cooking instructions for a selected food item in a modal overlay. It receives the food name, recipe steps, and a function to close the modal as props. The modal displays the food name as a title, followed by a subtitle and a list of recipe steps. If there are no recipe steps available, it shows a message indicating that no recipe is available for the item. The modal can be closed by clicking outside of it or by clicking the close button.

import React from 'react'
import './RecipeModal.css'
import { assets } from '../../assets/assets'

const RecipeModal = ({ foodName, recipeSteps, onClose }) => {
  return (
    <div className="recipe-modal-overlay" onClick={onClose}>
      <div className="recipe-modal-container" onClick={(e) => e.stopPropagation()}>
        <button className="recipe-modal-close" onClick={onClose}>×</button>
        
        <h2>{foodName}</h2>
        <p className="recipe-subtitle">Cooking Instructions</p>
        
        <div className="recipe-steps-container">
          {recipeSteps && recipeSteps.length > 0 ? (
            recipeSteps.map((step, index) => (
              <div key={index} className="recipe-step">
                <div className="step-number">{index + 1}</div>
                <p className="step-text">{step}</p>
              </div>
            ))
          ) : (
            <p className="no-recipe">No recipe available for this item.</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default RecipeModal
